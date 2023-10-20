import { AppLoader } from 'Views/shared';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import { useUserPostPage } from './useUserPostPage';

export const UserPostPage = () => {
  const { isLoading, post } = useUserPostPage();
  if (isLoading) {
    return (
      <div style={{ padding: 32 }}>
        <AppLoader variant="primary" />
      </div>
    );
  }

  return (
    <Container
      style={{
        width: '50%',
        backgroundColor: '#8787870f',
        boxShadow: 'black 0px 0px 12px -7px',
        minHeight: 'calc(100vh - 60px)',
        padding: 24,
        paddingBottom: 8,
        marginBottom: 24,
      }}
    >
      <Row>
        <Col>
          <h2>{post?.title}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '1px solid grey',
              borderBottom: '1px solid grey',
              paddingTop: 8,
              paddingBottom: 8,
              marginTop: 8,
              marginBottom: 24,
            }}
          >
            <Badge bg="secondary">{post?.category?.title}</Badge>
            <Badge bg="light" text="dark">
              {post?.publicationDate}
            </Badge>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{post?.content}</p>
        </Col>
      </Row>
    </Container>
  );
};
