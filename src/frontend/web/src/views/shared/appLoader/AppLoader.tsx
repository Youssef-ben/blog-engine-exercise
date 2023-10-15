import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export interface AppLoaderProps {
  variant?: 'primary' | 'secondary' | 'light' | 'dark';
  small?: boolean;
}

export const AppLoader = ({ variant = 'light', small }: AppLoaderProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Spinner animation="border" variant={variant} size={small ? 'sm' : undefined} />
      <span className="visually-hidden">{t('common.loading')}</span>
    </>
  );
};
