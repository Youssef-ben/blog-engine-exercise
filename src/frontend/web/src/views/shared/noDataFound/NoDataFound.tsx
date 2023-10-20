import { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

export interface NoDataFoundProps {
  adminContent?: boolean;
}
export const NoDataFound = ({ adminContent = true }: NoDataFoundProps) => {
  const { t } = useTranslation();

  return (
    <div style={styles.noDataWrapper}>
      <span style={styles.noData}>{t('noData.title')}</span>
      {adminContent && <span style={styles.noData}>{t('noData.details')}</span>}
    </div>
  );
};

interface NoDataFoundStyle {
  noDataWrapper: CSSProperties;
  noData: CSSProperties;
}

const styles: NoDataFoundStyle = {
  noDataWrapper: {
    width: '100%',
    display: 'flex',
    padding: '3em',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  noData: {
    width: '100%',
    fontWeight: 400,
    fontSize: ' 13px',
    color: ' #73828C',
  },
};
