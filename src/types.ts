export type Prato = {
  id: number
  nome: string
  descricao: string
  foto: string
  preco: number
}

export type Restaurante = {
  id: number
  titulo: string
  categoria: string
  avaliacao: number
  descricao: string
  capa: string
  foto: string
  destaque?: boolean
  pratos: Prato[]
}
