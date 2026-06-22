import styled from 'styled-components'
import { Prato } from '../../types'
import { cores } from '../../styles/GlobalStyle'

type Props = {
  prato: Prato | null
  onFechar: () => void
  onAdicionar: (prato: Prato) => void
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.73);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`

const ModalContainer = styled.div`
  background-color: ${cores.salmon};
  display: flex;
  max-width: 1024px;
  width: 90%;
  position: relative;
`

const Foto = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
  flex-shrink: 0;
`

const Corpo = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`

const Nome = styled.h2`
  font-size: 18px;
  font-weight: 900;
  color: ${cores.branco};
`

const Descricao = styled.p`
  font-size: 14px;
  color: ${cores.branco};
  line-height: 1.6;
  flex: 1;
`

const Botao = styled.button`
  background-color: ${cores.begeEscuro};
  color: ${cores.preto};
  font-size: 14px;
  font-weight: 700;
  padding: 4px 24px;
  border: none;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0d9c0;
  }
`

const BotaoFechar = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: ${cores.branco};
  font-size: 20px;
  cursor: pointer;
  line-height: 1;
`

const Modal = ({ prato, onFechar, onAdicionar }: Props) => {
  if (!prato) return null

  return (
    <Overlay onClick={onFechar}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Foto src={prato.foto} alt={prato.nome} />
        <Corpo>
          <Nome>{prato.nome}</Nome>
          <Descricao>{prato.descricao}</Descricao>
          <Botao
            onClick={() => {
              onAdicionar(prato)
              onFechar()
            }}
          >
            Adicionar ao carrinho - R${' '}
            {prato.preco.toFixed(2).replace('.', ',')}
          </Botao>
        </Corpo>
        <BotaoFechar onClick={onFechar}>✕</BotaoFechar>
      </ModalContainer>
    </Overlay>
  )
}

export default Modal
