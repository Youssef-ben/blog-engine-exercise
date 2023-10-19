import { CategoriesList } from 'Views/category';
import { AppLoader } from 'Views/shared';
import { Col, Row } from 'react-bootstrap';
import { CategoryFormContainer } from '../categoryFormContainer';
import { useCategoryPageContent } from './useCategoryPageContent';

export const CategoryPageContent = () => {
  const { isLoading, categoriesListProps, categoryFormProps } = useCategoryPageContent();

  return (
    <>
      <Row>
        <Col>
          {isLoading ? (
            <AppLoader variant="primary" />
          ) : (
            <CategoriesList {...categoriesListProps} />
          )}
        </Col>
      </Row>

      <CategoryFormContainer {...categoryFormProps} />
    </>
  );
};
