import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { cores } from '../../styles/GlobalStyle'

type Props = {
  variant?: 'home' | 'perfil'
  itensCarrinho?: number
}

const HeaderContainer = styled.header<{ variant: string }>`
  background-color: ${({ variant }) =>
    variant === 'home' ? cores.begeEscuro : 'transparent'};
  padding: ${({ variant }) => (variant === 'home' ? '40px 120px' : '16px 120px')};
  display: flex;
  align-items: center;
  justify-content: ${({ variant }) =>
    variant === 'home' ? 'center' : 'space-between'};
  flex-direction: ${({ variant }) => (variant === 'home' ? 'column' : 'row')};
  gap: ${({ variant }) => (variant === 'home' ? '48px' : '0')};
`

const Logo = styled.img`
  height: 40px;
`

const Tagline = styled.p`
  font-size: 36px;
  font-weight: 900;
  color: ${cores.salmon};
  text-align: center;
  line-height: 1.2;
`

const NavLink = styled(Link)`
  font-size: 18px;
  font-weight: 700;
  color: ${cores.salmon};

  &:hover {
    text-decoration: underline;
  }
`

const Header = ({ variant = 'home', itensCarrinho = 0 }: Props) => {
  const logoUrl =
    'https://raw.githubusercontent.com/henriqueotogami/efood/main/src/assets/logo.svg'

  if (variant === 'home') {
    return (
      <HeaderContainer variant="home">
        <Logo
          src={logoUrl}
          alt="efood"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <Tagline>
          Viva experiências gastronômicas
          <br />
          no conforto da sua casa
        </Tagline>
      </HeaderContainer>
    )
  }

  return (
    <HeaderContainer variant="perfil">
      <NavLink to="/">Restaurantes</NavLink>
      <Logo
        src={logoUrl}
        alt="efood"
        onError={(e) => {
          ;(e.target as HTMLImageElement).style.display = 'none'
        }}
      />
      <span style={{ color: cores.salmon, fontWeight: 700, fontSize: 18 }}>
        {itensCarrinho} produto(s) no carrinho
      </span>
    </HeaderContainer>
  )
}

export default Header
