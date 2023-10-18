import { Col, Row } from 'react-bootstrap';
import { PostsList } from '../../../../../views/post';
import { PostModal } from '../../../../../views/post/postModal';
import { useEditPostContainer } from './useEditPostContainer';

export const EditPostContainer = () => {
  const { posts, postModal } = useEditPostContainer();

  return (
    <Row>
      <Col>
        <PostsList posts={posts} />
        <PostModal {...postModal} />
      </Col>
    </Row>
  );
};
