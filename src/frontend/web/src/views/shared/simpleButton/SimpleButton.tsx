import { CSSProperties } from 'react';
import { Button } from 'react-bootstrap';
import { AppLoader } from '../appLoader';

export interface SimpleButtonProps {
  label: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
}

export const SimpleButton = ({ label, isLoading, isDisabled, variant = 'primary', onClick }: SimpleButtonProps) => {
  return (
    <Button size="sm" variant={variant} style={styles.button} disabled={isDisabled || isLoading} onClick={isLoading ? undefined : onClick}>
      <span className="h5" style={styles.label}>
        {isLoading ? <AppLoader small /> : label}
      </span>
    </Button>
  );
};

interface ButtonStyles {
  button: CSSProperties;
  label: CSSProperties;
}

const styles: ButtonStyles = {
  button: {
    minWidth: '150px',
    minHeight: '32px',
  },
  label: {
    marginBottom: 2,
  },
};
