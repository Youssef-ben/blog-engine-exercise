import { CSSProperties } from 'react';
import { Card } from 'react-bootstrap';

import './postItem.scss';

export interface PostItemProps {
  id: string;
  title: string;
  publicationDate: string;
  onClick?: (id: string) => void;
}

export const PostItem = ({ id, title, publicationDate, onClick }: PostItemProps) => {
  return (
    <Card className="categoryItem" style={styles.card} onClick={() => onClick && onClick(id)}>
      <Card.Body style={styles.body}>
        <div>
          <Card.Title style={styles.title}>{title}</Card.Title>
          <Card.Subtitle className="text-muted" style={styles.subTitle}>
            {publicationDate}
          </Card.Subtitle>
        </div>
      </Card.Body>
    </Card>
  );
};

interface CategoryItemStyles {
  card: CSSProperties;
  body: CSSProperties;
  title: CSSProperties;
  subTitle: CSSProperties;
}

const styles: CategoryItemStyles = {
  card: {
    marginBottom: 8,
    cursor: 'pointer',
  },
  body: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 8,
  },
  title: {
    marginBottom: 8,
    textTransform: 'capitalize',
    textDecoration: 'underline',
  },
  subTitle: {
    fontSize: '0.8rem',
  },
};
