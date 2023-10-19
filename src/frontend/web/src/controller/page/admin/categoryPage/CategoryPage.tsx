import { Col, Container, Row } from 'react-bootstrap';
import { CategoryPageContent } from './categoryPageContent';
import { CategoryPageHeader } from './categoryPageHeader';

export const CategoryPage = () => {
  return (
    <Container style={{ height: '100%' }}>
      <Row>
        <Col>
          <CategoryPageHeader />
        </Col>
      </Row>

      <Row>
        <Col>
          <CategoryPageContent />
        </Col>
      </Row>
    </Container>
  );
};
