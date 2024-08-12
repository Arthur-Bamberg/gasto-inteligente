// TODO: Mudar para o type da lib-eagle quando tiver com a versão com este tipo

/**
 * @type TBaseResponse
 * @template T, E
 * @description
 * Tipo de resposta padrão utilizada entre camada de serviço e controlador.
 * Este tipo pode retornar dois objetos diferentes, podendo armazenar informações de sucesso ou falha.
 * @example
 * // Exemplo de resposta com sucesso
 * {
 *   success: true,
 *   data: { id: 1, name: 'Exemplo' },
 *   statusCode: 200
 * }
 *
 * @example
 * // Exemplo de resposta com falha
 * {
 *   success: false,
 *   errors: ['Erro ao processar a solicitação'],
 *   statusCode: 400,
 *   error: { message: 'Detalhes do erro' }
 * }
 */
export type TBaseResponse<T, E = unknown> =
  | { success: true; data: T; statusCode?: number }
  | {
      success: false;
      errors: string[];
      statusCode?: number;
      data?: T;
      error?: E;
    };
