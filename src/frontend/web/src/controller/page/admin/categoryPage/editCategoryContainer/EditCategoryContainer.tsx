import { Col, Row } from 'react-bootstrap';
import { CategoriesList, CategoryModal } from '../../../../../views/category';
import { useEditCategoryContainer } from './useEditCategoryContainer';

export const EditCategoryContainer = () => {
  const { categories, categoryModal } = useEditCategoryContainer();

  return (
    <Row>
      <Col>
        <CategoriesList categories={categories} />
        <CategoryModal {...categoryModal} />
      </Col>
    </Row>
  );
};
