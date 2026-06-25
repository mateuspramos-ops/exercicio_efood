import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Restaurante } from '../../types'

type Props = {
  restaurante: Restaurante
}

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #e66767;
  position: relative;
  display: flex;
  flex-direction: column;
`

const Foto = styled.img`
  width: 100%;
  height: 217px;
  object-fit: cover;
  display: block;
`

const Tags = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`

const Tag = styled.span`
  background-color: #e66767;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 4px;
`

const Corpo = styled.div`
  padding: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const TituloRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const Titulo = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #e66767;
`

const Avaliacao = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: #e66767;
`

const Descricao = styled.p`
  font-size: 14px;
  color: #e66767;
  line-height: 1.45;
  margin-bottom: 16px;
  flex: 1;
`

const Botao = styled(Link)`
  display: inline-block;
  background-color: #e66767;
  color: #ffebd9;
  font-size: 14px;
  font-weight: 700;
  padding: 4px 6px;
  text-align: center;
  align-self: flex-start;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`

const RestauranteCard = ({ restaurante }: Props) => {
  return (
    <Card>
      <Foto src={restaurante.capa} alt={restaurante.titulo} />
      <Tags>
        {restaurante.destacado && <Tag>Destaque da semana</Tag>}
        <Tag>{restaurante.tipo}</Tag>
      </Tags>
      <Corpo>
        <TituloRow>
          <Titulo>{restaurante.titulo}</Titulo>
          <Avaliacao>
            {restaurante.avaliacao} <span>⭐</span>
          </Avaliacao>
        </TituloRow>
        <Descricao>{restaurante.descricao}</Descricao>
        <Botao to={`/restaurante/${restaurante.id}`}>Saiba mais</Botao>
      </Corpo>
    </Card>
  )
}

export default RestauranteCard
