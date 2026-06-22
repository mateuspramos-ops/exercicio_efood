import styled from 'styled-components'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RestauranteCard from '../../components/RestauranteCard'
import restaurantes from '../../data/restaurantes'

const Main = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 120px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px 80px;
`

const Home = () => {
  return (
    <>
      <Header variant="home" />
      <Main>
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
