import { ValidationError } from '@nestjs/common';

export const formatValidationErrors = (
  errors: ValidationError[],
): ValidationError[] => {
  return errors.reduce((acc, error) => {
    if (error.children && error.children.length > 0) {
      return [...acc, ...formatValidationErrors(error.children)];
    }
    return [...acc, error];
  }, []);
};
