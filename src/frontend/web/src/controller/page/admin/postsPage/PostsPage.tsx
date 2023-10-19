import { Col, Container, Row } from 'react-bootstrap';
import { PostPageContent } from './postPageContent';
import { PostPageHeader } from './postPageHeader';

export const PostsPage = () => {
  return (
    <Container style={{ height: '100%' }}>
      <Row>
        <Col>
          <PostPageHeader />
        </Col>
      </Row>

      <Row>
        <Col>
          <PostPageContent />
        </Col>
      </Row>
    </Container>
  );
};
