import { CategoriesList } from 'Views/category';
import { AppLoader, SearchBar } from 'Views/shared';
import { Col, Row } from 'react-bootstrap';
import { CategoryFormContainer } from '../categoryFormContainer';
import { useCategoryPageContent } from './useCategoryPageContent';

export const CategoryPageContent = () => {
  const { isLoading, categoriesListProps, categoryFormProps, searchProps } =
    useCategoryPageContent();

  return (
    <>
      <Row>
        <div
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            width: '70%',
            marginTop: '10px',
            marginBottom: '30px',
          }}
        >
          <SearchBar {...searchProps} />
        </div>
      </Row>
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
