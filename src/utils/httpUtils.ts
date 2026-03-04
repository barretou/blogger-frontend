import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

/**
 * Instância principal do Axios utilizada para comunicação com a API.
 *
 * Configurações padrão:
 * - baseURL definida via variável de ambiente (VITE_API_BASE_URL)
 * - Timeout de 10 segundos
 * - Header padrão Content-Type: application/json
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

/**
 * Interceptor de requisição.
 *
 * Pode ser utilizado futuramente para:
 * - Injetar token JWT no header Authorization
 * - Adicionar headers globais
 * - Log de requisições
 *
 * Exemplo de uso:
 * localStorage.getItem('token')
 */
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token')

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }

//   return config
// })

/**
 * Interceptor de resposta.
 *
 * Responsável por:
 * - Tratar erros globais da API
 * - Logar mensagens de erro
 * - Padronizar tratamento de falhas
 *
 * Pode ser expandido para:
 * - Redirecionamento em caso de 401 (não autorizado)
 * - Exibir Toast global (ex: PrimeVue)
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição da API:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

/**
 * Função genérica para realizar requisições HTTP reutilizáveis.
 *
 * @template T Tipo esperado do retorno da API.
 * @param config Configuração da requisição (AxiosRequestConfig).
 * @returns Promise contendo os dados da resposta tipados como T.
 *
 * @example
 * const users = await apiRequest<User[]>({
 *   method: 'GET',
 *   url: '/users'
 * })
 */
export async function apiRequest<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> = await apiClient(config)
  return response.data
}

export default apiClient