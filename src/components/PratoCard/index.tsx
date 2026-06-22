import styled from 'styled-components'
import { Prato } from '../../types'

type Props = {
  prato: Prato
  onAdicionar: (prato: Prato) => void
}

const Card = styled.div`
  background-color: #ffebd9;
  display: flex;
  flex-direction: column;
`

const Foto = styled.img`
  width: 100%;
  height: 168px;
  object-fit: cover;
  display: block;
`

const Corpo = styled.div`
  padding: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Nome = styled.h3`
  font-size: 16px;
  font-weight: 900;
  color: #111111;
  margin-bottom: 8px;
`

const Descricao = styled.p`
  font-size: 12px;
  color: #4b4b4b;
  line-height: 1.6;
  margin-bottom: 16px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Botao = styled.button`
  background-color: #e66767;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  padding: 4px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c45252;
  }
`

const PratoCard = ({ prato, onAdicionar }: Props) => {
  return (
    <Card>
      <Foto src={prato.foto} alt={prato.nome} />
      <Corpo>
        <Nome>{prato.nome}</Nome>
        <Descricao>{prato.descricao}</Descricao>
        <Botao onClick={() => onAdicionar(prato)}>Adicionar ao carrinho</Botao>
      </Corpo>
    </Card>
  )
}

export default PratoCard
