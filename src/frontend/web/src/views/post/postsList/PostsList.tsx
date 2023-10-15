import { CSSProperties } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { PostItem, PostItemProps } from '..';
import { SimpleButton } from '../../shared';

export interface PostsListProps {
  posts: PostItemProps[];
  onAdd?: () => void;
}

export const PostsList = ({ posts = [], onAdd }: PostsListProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Container>
        <Row>
          <Col style={styles.header}>
            <h3 style={{ marginBottom: 0 }}>{t('post.list.title')}</h3>
            <SimpleButton label={t('common.add')} variant="secondary" onClick={onAdd} />
          </Col>
        </Row>
        <Row>
          <Col>
            {posts.map((post) => {
              return <PostItem key={post.id} {...post} />;
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

interface ListStyles {
  header: CSSProperties;
}

const styles: ListStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    justifyItems: 'center',
    marginBottom: 16,
  },
};
