import { useState } from 'react';
import { ErrorsContext } from './ErrorsContext';

export interface ErrorsProviderProps {
  children: JSX.Element;
}

export const ErrorsProvider = ({ children }: ErrorsProviderProps) => {
  const [message, setMessage] = useState<string>('');

  return (
    <ErrorsContext.Provider
      value={{
        message,
        setMessage: (message: string) => {
          setMessage(message);
        },
      }}
    >
      {children}
    </ErrorsContext.Provider>
  );
};
