import { PostsList } from 'Views/post';
import { AppLoader } from 'Views/shared';
import { SearchBar } from 'Views/shared/searchBar';
import { Col, Row } from 'react-bootstrap';
import { PostFormContainer } from '../postFormContainer';
import { usePostPageContent } from './usePostPageContent';

export const PostPageContent = () => {
  const { isLoading, postsListProps, postFormProps, searchProps } = usePostPageContent();

  return (
    <>
      <Row>
        <SearchBar {...searchProps} />
      </Row>
      <Row>
        <Col>{isLoading ? <AppLoader variant="primary" /> : <PostsList {...postsListProps} />}</Col>
      </Row>

      <PostFormContainer {...postFormProps} />
    </>
  );
};
