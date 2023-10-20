import { createContext, useContext } from 'react';

export interface ErrorsContextType {
  message: string;
  setMessage: (message: string) => void;
}

const INITIAL_VALUES: ErrorsContextType = {
  message: '',
  setMessage: () => {
    throw new Error('Error: setMessage not defined');
  },
};

export const ErrorsContext = createContext<ErrorsContextType>(INITIAL_VALUES);
export const useErrorsContext = () => useContext(ErrorsContext);
ErrorsContext.displayName = 'ErrorsContext';
