import { Restaurante } from '../types'

const BASE_URL = 'https://api-ebac.vercel.app/api/efood'

export const getRestaurantes = async (): Promise<Restaurante[]> => {
  const response = await fetch(`${BASE_URL}/restaurantes`)
  if (!response.ok) throw new Error('Erro ao buscar restaurantes')
  return response.json()
}

export const getRestaurante = async (id: number): Promise<Restaurante> => {
  const response = await fetch(`${BASE_URL}/restaurantes/${id}`)
  if (!response.ok) throw new Error('Erro ao buscar restaurante')
  return response.json()
}
