import styled from 'styled-components'
import { Prato } from '../../types'

type Props = {
  prato: Prato
  onAdicionar: (prato: Prato) => void
}

// Card com FUNDO salmão e texto branco (conforme Figma)
const Card = styled.div`
  background-color: #e66767;
  display: flex;
  flex-direction: column;
  padding: 8px;
`

const Foto = styled.img`
  width: 100%;
  height: 168px;
  object-fit: cover;
  display: block;
`

const Corpo = styled.div`
  padding: 8px 0 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Nome = styled.h3`
  font-size: 16px;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 8px;
`

const Descricao = styled.p`
  font-size: 14px;
  color: #ffffff;
  line-height: 1.45;
  margin-bottom: 8px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

// Botão com FUNDO bege e texto salmão (invertido em relação ao card)
const Botao = styled.button`
  background-color: #ffebd9;
  color: #e66767;
  font-size: 14px;
  font-weight: 700;
  padding: 4px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
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
