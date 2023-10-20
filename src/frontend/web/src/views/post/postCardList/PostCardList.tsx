import { NoDataFound } from 'Views/shared';
import { Col, Row } from 'react-bootstrap';
import { PostCard, PostCardProps } from '../postCard';

export interface PostCardListProps {
  posts: PostCardProps[];
  onClick?: (id: string) => void;
}

export const PostCardList = ({ posts, onClick }: PostCardListProps) => {
  if (posts.length === 0) {
    return <NoDataFound adminContent={false} />;
  }

  return posts.map((post) => {
    return (
      <Row key={post.id} style={styles.row}>
        <Col sm={10}>
          <PostCard {...post} onClick={onClick} />
        </Col>
      </Row>
    );
  });
};

const styles = {
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },
};
