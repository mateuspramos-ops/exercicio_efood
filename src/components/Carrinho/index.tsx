import styled from 'styled-components'
import { Prato } from '../../types'

export type ItemCarrinho = Prato & { quantidade: number }

type Props = {
  itens: ItemCarrinho[]
  onRemover: (id: number) => void
  onContinuar: () => void
}

const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  height: 100vh;
  background-color: #e66767;
  padding: 32px 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 50;
  overflow-y: auto;
`

const Lista = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`

const Item = styled.li`
  background-color: #ffebd9;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  position: relative;
`

const FotoItem = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  flex-shrink: 0;
`

const InfoItem = styled.div`
  flex: 1;
`

const NomeItem = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #111111;
  margin-bottom: 4px;
`

const PrecoItem = styled.p`
  font-size: 14px;
  color: #111111;
`

const BotaoRemover = styled.button`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`

const Separador = styled.hr`
  border: none;
  border-top: 1px solid #ffebd9;
  margin: 8px 0;
`

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`

const TotalLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
`

const TotalValor = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
`

const BotaoContinuar = styled.button`
  background-color: #ffebd9;
  color: #111111;
  font-size: 14px;
  font-weight: 700;
  padding: 8px;
  border: none;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0d9c0;
  }
`

const Vazio = styled.p`
  color: #ffffff;
  font-size: 14px;
  text-align: center;
  margin-top: 32px;
`

const Carrinho = ({ itens, onRemover, onContinuar }: Props) => {
  const total = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  )

  return (
    <Sidebar>
      {itens.length === 0 ? (
        <Vazio>Seu carrinho está vazio.</Vazio>
      ) : (
        <>
          <Lista>
            {itens.map((item) => (
              <Item key={item.id}>
                <FotoItem src={item.foto} alt={item.nome} />
                <InfoItem>
                  <NomeItem>{item.nome}</NomeItem>
                  <PrecoItem>
                    R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                  </PrecoItem>
                </InfoItem>
                <BotaoRemover onClick={() => onRemover(item.id)} title="Remover">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2L14 14M14 2L2 14" stroke="#E66767" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </BotaoRemover>
              </Item>
            ))}
          </Lista>
          <Separador />
          <TotalRow>
            <TotalLabel>Valor total</TotalLabel>
            <TotalValor>R$ {total.toFixed(2).replace('.', ',')}</TotalValor>
          </TotalRow>
          <BotaoContinuar onClick={onContinuar}>
            Continuar com a entrega
          </BotaoContinuar>
        </>
      )}
    </Sidebar>
  )
}

export default Carrinho
