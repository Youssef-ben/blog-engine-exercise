import { AxiosError } from 'axios';
import { ErrorResponse } from '../../models/response';

export const getErrorMessage = (error: AxiosError<ErrorResponse>) => {
  let message = 'common.unknownError';

  if (error.response?.data && error.response.data.code) {
    message = error.response.data.code;
  }

  return message;
};
