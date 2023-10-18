import { Col, Container, Row } from 'react-bootstrap';
import { AddPostContainer } from './addPostContainer';
import { EditPostContainer } from './editPostContainer';

export const PostsPage = () => {
  return (
    <Container style={{ height: '100%' }}>
      <Row>
        <Col>
          <AddPostContainer />
        </Col>
      </Row>

      <Row>
        <Col>
          <EditPostContainer />
        </Col>
      </Row>
    </Container>
  );
};
