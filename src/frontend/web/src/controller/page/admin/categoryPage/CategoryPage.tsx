import { Col, Container, Row } from 'react-bootstrap';
import { AddCategoryContainer } from './addCategoryContainer';
import { EditCategoryContainer } from './editCategoryContainer';

export const CategoryPage = () => {
  return (
    <Container style={{ height: '100%' }}>
      <Row>
        <Col>
          <AddCategoryContainer />
        </Col>
      </Row>

      <Row>
        <Col>
          <EditCategoryContainer />
        </Col>
      </Row>
    </Container>
  );
};
