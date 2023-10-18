import { Col, Row } from 'react-bootstrap';
import { CategoriesList, CategoryModal } from '../../../../../views/category';
import { AppLoader } from '../../../../../views/shared';
import { useEditCategoryContainer } from './useEditCategoryContainer';

export const EditCategoryContainer = () => {
  const { categoriesListProps, categoryModal } = useEditCategoryContainer();

  return (
    <Row>
      <Col>
        {categoryModal.isLoading ? <AppLoader variant="primary" /> : <CategoriesList {...categoriesListProps} />}
        <CategoryModal {...categoryModal} />
      </Col>
    </Row>
  );
};
