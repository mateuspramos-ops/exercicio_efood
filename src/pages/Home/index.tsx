import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RestauranteCard from '../../components/RestauranteCard'
import { getRestaurantes } from '../../services/api'
import { Restaurante } from '../../types'

const Main = styled.main`
  max-width: 1024px;
  margin: 0 auto;
  padding: 56px 24px 120px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px 32px;
`

const Mensagem = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  padding: 48px 0;
`

const Home = () => {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)

  useEffect(() => {
    getRestaurantes()
      .then(setRestaurantes)
      .catch(() => setErro(true))
      .finally(() => setCarregando(false))
  }, [])

  return (
    <>
      <Header variant="home" />
      <Main>
        {carregando && <Mensagem>Carregando restaurantes...</Mensagem>}
        {erro && <Mensagem>Erro ao carregar restaurantes.</Mensagem>}
        <Grid>
          {restaurantes.map((r) => (
            <RestauranteCard key={r.id} restaurante={r} />
          ))}
        </Grid>
      </Main>
      <Footer />
    </>
  )
}

export default Home
