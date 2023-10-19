import { AppLoader } from 'Views/shared';
import { Col, Row } from 'react-bootstrap';
import { PostsList } from '../../../../../views/post';
import { PostFormContainer } from '../postFormContainer/PostFormContainer';
import { usePostPageContent } from './usePostPageContent';

export const PostPageContent = () => {
  const { isLoading, postsListProps, postFormProps } = usePostPageContent();

  return (
    <>
      <Row>
        <Col>{isLoading ? <AppLoader variant="primary" /> : <PostsList {...postsListProps} />}</Col>
      </Row>

      <PostFormContainer {...postFormProps} />
    </>
  );
};
