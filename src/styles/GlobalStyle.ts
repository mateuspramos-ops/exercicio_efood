import { createGlobalStyle } from 'styled-components'

export const cores = {
  salmon: '#E66767',
  salmonClaro: '#F9C2C2',
  bege: '#FFF8F2',
  begeEscuro: '#FFEBD9',
  branco: '#FFFFFF',
  preto: '#111111',
  cinza: '#4B4B4B',
  cinzaClaro: '#CCCCCC',
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${cores.bege};
    color: ${cores.preto};
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`

export default GlobalStyle
