export type Prato = {
  id: number
  nome: string
  descricao: string
  foto: string
  preco: number
  porcao?: string
}

export type Restaurante = {
  id: number
  titulo: string
  tipo: string
  avaliacao: number
  descricao: string
  capa: string
  destacado: boolean
  cardapio: Prato[]
}
