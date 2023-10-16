import { CSSProperties } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CategoryItem, CategoryItemProps } from '..';
import { SimpleButton } from '../../shared';

export interface CategoriesListProps {
  categories: CategoryItemProps[];
  onAdd?: () => void;
}

export const CategoriesList = ({ categories = [], onAdd }: CategoriesListProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Container>
        <Row>
          <Col style={styles.header}>
            <h3 style={{ marginBottom: 0 }}>{t('category.list.title')}</h3>
            <SimpleButton label={t('common.add')} variant="secondary" onClick={onAdd} />
          </Col>
        </Row>
        <Row>
          <Col>
            {categories.map((category) => {
              return <CategoryItem key={category.id} {...category} />;
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

interface ListStyles {
  header: CSSProperties;
}

const styles: ListStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    justifyItems: 'center',
    marginBottom: 16,
  },
};
