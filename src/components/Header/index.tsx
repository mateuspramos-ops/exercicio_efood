import styled from 'styled-components'
import { Link } from 'react-router-dom'

type Props = {
  variant?: 'home' | 'perfil'
  itensCarrinho?: number
  onAbrirCarrinho?: () => void
}

const HeaderHome = styled.header`
  background-color: #ffebd9;
  padding: 40px 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`

const HeaderPerfil = styled.header`
  background-color: transparent;
  padding: 16px 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.span`
  font-size: 24px;
  font-weight: 900;
  color: #e66767;
  letter-spacing: -1px;
`

const Tagline = styled.p`
  font-size: 36px;
  font-weight: 900;
  color: #e66767;
  text-align: center;
  line-height: 1.2;
`

const NavLink = styled(Link)`
  font-size: 18px;
  font-weight: 700;
  color: #e66767;

  &:hover {
    text-decoration: underline;
  }
`

const BotaoCarrinho = styled.button`
  font-size: 18px;
  font-weight: 700;
  color: #e66767;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Header = ({ variant = 'home', itensCarrinho = 0, onAbrirCarrinho }: Props) => {
  if (variant === 'home') {
    return (
      <HeaderHome>
        <Logo>efood 🍴</Logo>
        <Tagline>
          Viva experiências gastronômicas<br />
          no conforto da sua casa
        </Tagline>
      </HeaderHome>
    )
  }

  return (
    <HeaderPerfil>
      <NavLink to="/">Restaurantes</NavLink>
      <Logo>efood 🍴</Logo>
      <BotaoCarrinho onClick={onAbrirCarrinho}>
        {itensCarrinho} produto(s) no carrinho
      </BotaoCarrinho>
    </HeaderPerfil>
  )
}

export default Header
