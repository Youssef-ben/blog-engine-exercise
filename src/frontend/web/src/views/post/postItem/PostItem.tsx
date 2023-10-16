import { CSSProperties } from 'react';
import { Card } from 'react-bootstrap';

export interface PostItemProps {
  id: string;
  title: string;
  publicationDate: string;
  onClick?: (id: string) => void;
}

export const PostItem = ({ id, title, publicationDate, onClick }: PostItemProps) => {
  return (
    <Card style={styles.card}>
      <Card.Body style={styles.body}>
        <div>
          <Card.Title style={styles.title} onClick={() => onClick && onClick(id)}>
            {title}
          </Card.Title>
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
