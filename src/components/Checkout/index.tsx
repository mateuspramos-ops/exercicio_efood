import { useState } from 'react'
import styled from 'styled-components'
import { ItemCarrinho } from '../Carrinho'

type Props = {
  itens: ItemCarrinho[]
  onFechar: () => void
}

type Etapa = 'entrega' | 'pagamento' | 'confirmacao'

type DadosEntrega = {
  receiver: string
  description: string
  city: string
  zipCode: string
  number: string
  complement: string
}

type DadosPagamento = {
  name: string
  number: string
  code: string
  expiresMonth: string
  expiresYear: string
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

const Titulo = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
`

const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  border: none;
  outline: none;
  background-color: #ffebd9;
  color: #111111;
  font-family: inherit;
`

const Row = styled.div`
  display: flex;
  gap: 8px;
`

const Botao = styled.button`
  background-color: #ffebd9;
  color: #111111;
  font-size: 14px;
  font-weight: 700;
  padding: 8px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-top: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0d9c0;
  }
`

const BotaoSecundario = styled(Botao)`
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
  margin-top: 4px;

  &:hover {
    background-color: rgba(255,255,255,0.1);
  }
`

const TextoConfirmacao = styled.p`
  font-size: 14px;
  color: #ffffff;
  line-height: 1.6;
  margin-bottom: 16px;
`

const Checkout = ({ itens, onFechar }: Props) => {
  const [etapa, setEtapa] = useState<Etapa>('entrega')
  const [carregando, setCarregando] = useState(false)
  const [respostaApi, setRespostaApi] = useState<any>(null)

  const [entrega, setEntrega] = useState<DadosEntrega>({
    receiver: '',
    description: '',
    city: '',
    zipCode: '',
    number: '',
    complement: '',
  })

  const [pagamento, setPagamento] = useState<DadosPagamento>({
    name: '',
    number: '',
    code: '',
    expiresMonth: '',
    expiresYear: '',
  })

  const handleCheckout = async () => {
    setCarregando(true)
    try {
      const body = {
        products: itens.map((item) => ({ id: item.id, price: item.preco })),
        delivery: {
          receiver: entrega.receiver,
          address: {
            description: entrega.description,
            city: entrega.city,
            zipCode: entrega.zipCode,
            number: Number(entrega.number),
            complement: entrega.complement,
          },
        },
        payment: {
          card: {
            name: pagamento.name,
            number: pagamento.number,
            code: Number(pagamento.code),
            expires: {
              month: Number(pagamento.expiresMonth),
              year: Number(pagamento.expiresYear),
            },
          },
        },
      }

      const response = await fetch('https://api-ebac.vercel.app/api/efood/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      setRespostaApi(data)
      setEtapa('confirmacao')
    } catch (err) {
      alert('Erro ao finalizar pedido. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  if (etapa === 'entrega') {
    return (
      <Sidebar>
        <Titulo>Entrega</Titulo>
        <FormGroup>
          <Label>Quem irá receber</Label>
          <Input
            value={entrega.receiver}
            onChange={(e) => setEntrega({ ...entrega, receiver: e.target.value })}
            placeholder="João Paulo de Souza"
          />
        </FormGroup>
        <FormGroup>
          <Label>Endereço</Label>
          <Input
            value={entrega.description}
            onChange={(e) => setEntrega({ ...entrega, description: e.target.value })}
            placeholder="Rua das Flores, 123"
          />
        </FormGroup>
        <FormGroup>
          <Label>Cidade</Label>
          <Input
            value={entrega.city}
            onChange={(e) => setEntrega({ ...entrega, city: e.target.value })}
            placeholder="São Paulo"
          />
        </FormGroup>
        <Row>
          <FormGroup style={{ flex: 1 }}>
            <Label>CEP</Label>
            <Input
              value={entrega.zipCode}
              onChange={(e) => setEntrega({ ...entrega, zipCode: e.target.value })}
              placeholder="00000-000"
            />
          </FormGroup>
          <FormGroup style={{ flex: 1 }}>
            <Label>Número</Label>
            <Input
              value={entrega.number}
              onChange={(e) => setEntrega({ ...entrega, number: e.target.value })}
              placeholder="123"
            />
          </FormGroup>
        </Row>
        <FormGroup>
          <Label>Complemento (opcional)</Label>
          <Input
            value={entrega.complement}
            onChange={(e) => setEntrega({ ...entrega, complement: e.target.value })}
            placeholder="Apto 12"
          />
        </FormGroup>
        <Botao onClick={() => setEtapa('pagamento')}>
          Continuar com o pagamento
        </Botao>
        <BotaoSecundario onClick={onFechar}>
          Voltar para o carrinho
        </BotaoSecundario>
      </Sidebar>
    )
  }

  if (etapa === 'pagamento') {
    return (
      <Sidebar>
        <Titulo>Pagamento - Valor a pagar: R$ {itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0).toFixed(2).replace('.', ',')}</Titulo>
        <FormGroup>
          <Label>Nome no cartão</Label>
          <Input
            value={pagamento.name}
            onChange={(e) => setPagamento({ ...pagamento, name: e.target.value })}
            placeholder="João P de Souza"
          />
        </FormGroup>
        <Row>
          <FormGroup style={{ flex: 2 }}>
            <Label>Número do cartão</Label>
            <Input
              value={pagamento.number}
              onChange={(e) => setPagamento({ ...pagamento, number: e.target.value })}
              placeholder="0000 0000 0000 0000"
            />
          </FormGroup>
          <FormGroup style={{ flex: 1 }}>
            <Label>CVV</Label>
            <Input
              value={pagamento.code}
              onChange={(e) => setPagamento({ ...pagamento, code: e.target.value })}
              placeholder="000"
            />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup style={{ flex: 1 }}>
            <Label>Mês de vencimento</Label>
            <Input
              value={pagamento.expiresMonth}
              onChange={(e) => setPagamento({ ...pagamento, expiresMonth: e.target.value })}
              placeholder="01"
            />
          </FormGroup>
          <FormGroup style={{ flex: 1 }}>
            <Label>Ano de vencimento</Label>
            <Input
              value={pagamento.expiresYear}
              onChange={(e) => setPagamento({ ...pagamento, expiresYear: e.target.value })}
              placeholder="2025"
            />
          </FormGroup>
        </Row>
        <Botao onClick={handleCheckout} disabled={carregando}>
          {carregando ? 'Finalizando...' : 'Finalizar pagamento'}
        </Botao>
        <BotaoSecundario onClick={() => setEtapa('entrega')}>
          Voltar para a edição de endereço
        </BotaoSecundario>
      </Sidebar>
    )
  }

  return (
    <Sidebar>
      <Titulo>Pedido realizado - {respostaApi?.orderId || '#'}</Titulo>
      <TextoConfirmacao>
        Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.
      </TextoConfirmacao>
      <TextoConfirmacao>
        Gostaríamos de ressaltar que nossos entregadores não possuem a capacidade de fazer troco. Portanto, pedimos que tenha o valor exato ou o equivalente disponível para o pagamento.
      </TextoConfirmacao>
      <TextoConfirmacao>
        Agradecemos por escolher a efood hoje e esperamos que desfrute de uma deliciosa e satisfatória experiência gastronômica. Bom apetite!
      </TextoConfirmacao>
      <Botao onClick={onFechar}>Concluir</Botao>
    </Sidebar>
  )
}

export default Checkout
