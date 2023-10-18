import { Col, Container, Row } from 'react-bootstrap';
import { CategoryPage } from './categoryPage';
import { PostsPage } from './postsPage';

export interface AdminPageProps {}

export const AdminPage = ({}: AdminPageProps) => {
  return (
    <Container fluid>
      <Row style={{ height: '80vh', maxHeight: '80vh' }}>
        <Col style={{ borderRight: '1px solid #dee2e6', paddingTop: 24 }}>
          <CategoryPage />
        </Col>

        <Col style={{ paddingTop: 24 }}>
          <PostsPage />
        </Col>
      </Row>
    </Container>
  );
};
