import { Col, Row } from 'react-bootstrap';
import { PostsList } from '../../../../../views/post';
import { PostModal } from '../../../../../views/post/postModal';
import { useEditPostContainer } from './useEditPostContainer';

export const EditPostContainer = () => {
  const { postsListProps, postModalProps } = useEditPostContainer();

  return (
    <Row>
      <Col>
        <PostsList {...postsListProps} />
        <PostModal {...postModalProps} />
      </Col>
    </Row>
  );
};
