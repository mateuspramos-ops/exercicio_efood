import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PratoCard from '../../components/PratoCard'
import Modal from '../../components/Modal'
import Carrinho, { ItemCarrinho } from '../../components/Carrinho'
import Checkout from '../../components/Checkout'
import { getRestaurante } from '../../services/api'
import { Prato, Restaurante } from '../../types'

const Banner = styled.div<{ foto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${({ foto }) => foto});
  background-size: cover;
  background-position: center;
  height: 280px;
  display: flex;
  align-items: flex-end;
  padding: 32px 120px;
`

const NomeRestaurante = styled.h1`
  font-size: 32px;
  font-weight: 900;
  color: #ffffff;
`

const Main = styled.main`
  max-width: 1280px;
  margin: 56px auto;
  padding: 0 120px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Mensagem = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  padding: 48px 0;
`

type Sidebar = 'fechado' | 'carrinho' | 'checkout'

const Perfil = () => {
  const { id } = useParams()
  const [restaurante, setRestaurante] = useState<Restaurante | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [pratoSelecionado, setPratoSelecionado] = useState<Prato | null>(null)
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([])
  const [sidebar, setSidebar] = useState<Sidebar>('fechado')

  useEffect(() => {
    if (id) {
      getRestaurante(Number(id))
        .then(setRestaurante)
        .finally(() => setCarregando(false))
    }
  }, [id])

  const adicionarAoCarrinho = (prato: Prato) => {
    setCarrinho((prev) => {
      const existente = prev.find((i) => i.id === prato.id)
      if (existente) {
        return prev.map((i) =>
          i.id === prato.id ? { ...i, quantidade: i.quantidade + 1 } : i
        )
      }
      return [...prev, { ...prato, quantidade: 1 }]
    })
    setSidebar('carrinho')
  }

  const removerDoCarrinho = (id: number) => {
    setCarrinho((prev) => prev.filter((i) => i.id !== id))
  }

  const totalItens = carrinho.reduce((acc, i) => acc + i.quantidade, 0)

  if (carregando) return <Mensagem>Carregando...</Mensagem>
  if (!restaurante) return <Mensagem>Restaurante não encontrado.</Mensagem>

  return (
    <>
      <Header
        variant="perfil"
        itensCarrinho={totalItens}
        onAbrirCarrinho={() => setSidebar(sidebar === 'carrinho' ? 'fechado' : 'carrinho')}
      />
      <Banner foto={restaurante.capa}>
        <NomeRestaurante>{restaurante.titulo}</NomeRestaurante>
      </Banner>
      <Main>
        <Grid>
          {restaurante.cardapio.map((prato) => (
            <PratoCard
              key={prato.id}
              prato={prato}
              onAdicionar={() => setPratoSelecionado(prato)}
            />
          ))}
        </Grid>
      </Main>
      <Footer />
      <Modal
        prato={pratoSelecionado}
        onFechar={() => setPratoSelecionado(null)}
        onAdicionar={adicionarAoCarrinho}
      />
      {sidebar === 'carrinho' && (
        <Carrinho
          itens={carrinho}
          onRemover={removerDoCarrinho}
          onContinuar={() => setSidebar('checkout')}
        />
      )}
      {sidebar === 'checkout' && (
        <Checkout
          itens={carrinho}
          onFechar={() => {
            setSidebar('fechado')
            setCarrinho([])
          }}
        />
      )}
    </>
  )
}

export default Perfil
