import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

/**
 * Função para validar o DTO
 * @param input Input a ser validado
 * @param dtoClass Classe do DTO
 * @returns Array de strings com os erros de validação
 */
export const validateDTO = async <T>(
  input: unknown,
  dtoClass: new (...args: any[]) => T,
): Promise<string[]> => {
  const dtoInstance = plainToInstance(dtoClass, input, {
    enableImplicitConversion: true,
  });
  const validationErrors = await validate(dtoInstance as object);

  if (validationErrors.length === 0) return [];

  const errorMessages = validationErrors.map((error) => {
    const constraints = error.constraints
      ? Object.values(error.constraints).join(', ')
      : 'Restrições indefinidas';
    return `Erro de validação na propriedade '${error.property}': ${constraints}`;
  });

  return errorMessages;
};

export const isWithin30MinutesNow = (date: Date) => {
  const THIRTY_MINUTES_IN_MS = 30 * 60 * 1000;
  const diffInMs = Date.now() - date.getTime();

  return diffInMs >= 0 && diffInMs <= THIRTY_MINUTES_IN_MS;
};
