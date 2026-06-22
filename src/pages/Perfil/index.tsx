import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PratoCard from '../../components/PratoCard'
import Modal from '../../components/Modal'
import restaurantes from '../../data/restaurantes'
import { Prato } from '../../types'
import { cores } from '../../styles/GlobalStyle'

const Banner = styled.div<{ foto: string }>`
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
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
  color: ${cores.branco};
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

const Perfil = () => {
  const { id } = useParams()
  const restaurante = restaurantes.find((r) => r.id === Number(id))
  const [pratoSelecionado, setPratoSelecionado] = useState<Prato | null>(null)
  const [carrinho, setCarrinho] = useState<Prato[]>([])

  if (!restaurante) {
    return <p>Restaurante não encontrado.</p>
  }

  const adicionarAoCarrinho = (prato: Prato) => {
    setCarrinho((prev) => [...prev, prato])
  }

  return (
    <>
      <Header variant="perfil" itensCarrinho={carrinho.length} />
      <Banner foto={restaurante.capa}>
        <NomeRestaurante>{restaurante.titulo}</NomeRestaurante>
      </Banner>
      <Main>
        <Grid>
          {restaurante.pratos.map((prato) => (
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
    </>
  )
}

export default Perfil
