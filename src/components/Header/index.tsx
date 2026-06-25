import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

type Props = {
  variant?: 'home' | 'perfil'
  itensCarrinho?: number
  onAbrirCarrinho?: () => void
}

const HeaderHome = styled.header`
  background-color: #ffebd9;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`

const HeaderPerfil = styled.header`
  background-color: #ffebd9;
  padding: 24px 0;
`

const ConteudoPerfil = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Tagline = styled.h2`
  font-size: 36px;
  font-weight: 900;
  color: #e66767;
  text-align: center;
  line-height: 1.2;
  max-width: 540px;
`

const NavLink = styled(Link)`
  font-size: 18px;
  font-weight: 900;
  color: #e66767;

  &:hover {
    text-decoration: underline;
  }
`

const Texto = styled.span`
  font-size: 18px;
  font-weight: 900;
  color: #e66767;
`

const Header = ({ variant = 'home', itensCarrinho = 0, onAbrirCarrinho }: Props) => {
  if (variant === 'home') {
    return (
      <HeaderHome>
        <Logo />
        <Tagline>
          Viva experiências gastronômicas<br />
          no conforto da sua casa
        </Tagline>
      </HeaderHome>
    )
  }

  return (
    <HeaderPerfil>
      <ConteudoPerfil>
        <NavLink to="/">Restaurantes</NavLink>
        <Logo tamanho="pequeno" />
        <Texto
          as="button"
          onClick={onAbrirCarrinho}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {itensCarrinho} produto(s) no carrinho
        </Texto>
      </ConteudoPerfil>
    </HeaderPerfil>
  )
}

export default Header
