import { CSSProperties } from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export interface AppLoaderProps {
  variant?: 'primary' | 'secondary' | 'light' | 'dark';
  small?: boolean;
}

export const AppLoader = ({ variant = 'light', small }: AppLoaderProps) => {
  const { t } = useTranslation();

  return (
    <div style={styles.spinnerWrapper}>
      <Spinner animation="border" variant={variant} size={small ? 'sm' : undefined} />
      <span className="visually-hidden">{t('common.loading')}</span>
    </div>
  );
};

interface NoDataFoundStyle {
  spinnerWrapper: CSSProperties;
}

const styles: NoDataFoundStyle = {
  spinnerWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
};
