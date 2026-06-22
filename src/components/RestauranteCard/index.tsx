import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Restaurante } from '../../types'
import { cores } from '../../styles/GlobalStyle'

type Props = {
  restaurante: Restaurante
}

const Card = styled.div`
  background-color: ${cores.branco};
  border: 1px solid ${cores.cinzaClaro};
  position: relative;
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
  left: 0;
  display: flex;
  gap: 8px;
  padding: 0 16px;
`

const Tag = styled.span`
  background-color: ${cores.salmon};
  color: ${cores.branco};
  font-size: 12px;
  font-weight: 700;
  padding: 4px 6px;
`

const Corpo = styled.div`
  padding: 16px;
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
  color: ${cores.preto};
`

const Avaliacao = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: ${cores.preto};

  img {
    width: 20px;
    height: 20px;
  }
`

const Descricao = styled.p`
  font-size: 14px;
  color: ${cores.cinza};
  line-height: 1.6;
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Botao = styled(Link)`
  display: block;
  background-color: ${cores.salmon};
  color: ${cores.branco};
  font-size: 14px;
  font-weight: 700;
  padding: 4px 0;
  text-align: center;
  width: 100%;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c45252;
  }
`

const RestauranteCard = ({ restaurante }: Props) => {
  return (
    <Card>
      <Foto src={restaurante.foto} alt={restaurante.titulo} />
      <Tags>
        {restaurante.destaque && <Tag>Destaque da semana</Tag>}
        <Tag>{restaurante.categoria}</Tag>
      </Tags>
      <Corpo>
        <TituloRow>
          <Titulo>{restaurante.titulo}</Titulo>
          <Avaliacao>
            {restaurante.avaliacao}
            <span>⭐</span>
          </Avaliacao>
        </TituloRow>
        <Descricao>{restaurante.descricao}</Descricao>
        <Botao to={`/restaurante/${restaurante.id}`}>Saiba mais</Botao>
      </Corpo>
    </Card>
  )
}

export default RestauranteCard
