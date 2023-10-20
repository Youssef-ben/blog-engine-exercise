import { useErrorsContext } from 'Controller/provider';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Toast } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CategoryPage } from './categoryPage';
import { PostsPage } from './postsPage';

export interface AdminPageProps {}

export const AdminPage = ({}: AdminPageProps) => {
  const { t } = useTranslation();

  const { message, setMessage } = useErrorsContext();

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!!message);
  }, [message]);

  return (
    <Container fluid>
      <Row style={{ height: 'calc(100vh - 56px)', maxHeight: 'calc(100vh - 56px)' }}>
        <Col style={{ borderRight: '1px solid #dee2e6', paddingTop: 24 }}>
          <CategoryPage />
        </Col>

        <Col style={{ paddingTop: 24 }}>
          <PostsPage />
        </Col>
      </Row>

      <Toast
        autohide
        bg="danger"
        onClose={() => {
          setShow(false);
          setMessage('');
        }}
        show={show}
        delay={3000}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{t('api.err.title')}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </Container>
  );
};
