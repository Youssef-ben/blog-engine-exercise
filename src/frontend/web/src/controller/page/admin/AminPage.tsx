import { Col, Container, Row } from 'react-bootstrap';
import { CategoryPage } from './categoryPage';
import { PostsPage } from './postsPage';

export interface AminPageProps {}

export const AminPage = ({}: AminPageProps) => {
  return (
    <Container fluid>
      <Row style={{ height: '80vh', maxHeight: '80vh' }}>
        <Col style={{ borderRight: '1px solid #dee2e6' }}>
          <CategoryPage />
        </Col>

        <Col>
          <PostsPage />
        </Col>
      </Row>
    </Container>
  );
};
