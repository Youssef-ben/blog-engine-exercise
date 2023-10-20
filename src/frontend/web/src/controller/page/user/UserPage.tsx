import { PostCardList } from 'Views/post';
import { Col, Container, Row } from 'react-bootstrap';
import { useUserPage } from './useUserPage';
import { UserPageHeader } from './userPageHeader/UserPageHeader';

export const UserPage = () => {
  const { postCardListProps, userPageHeaderProps } = useUserPage();

  return (
    <Container
      style={{
        paddingTop: '20px',
      }}
    >
      <Row>
        <Col>
          <UserPageHeader {...userPageHeaderProps} />
        </Col>
      </Row>

      <PostCardList {...postCardListProps} />
    </Container>
  );
};
