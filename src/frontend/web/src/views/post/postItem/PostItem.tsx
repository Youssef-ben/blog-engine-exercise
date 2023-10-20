import { CSSProperties } from 'react';
import { Card } from 'react-bootstrap';

export interface PostItemProps {
  id: string;
  title: string;
  categoryTitle: string;
  publicationDate: string;
  onClick?: (id: string) => void;
}

export const PostItem = ({ id, title, categoryTitle, publicationDate, onClick }: PostItemProps) => {
  return (
    <Card
      className="add-shadow-on-hover"
      style={styles.card}
      onClick={() => onClick && onClick(id)}
    >
      <Card.Body style={styles.body}>
        <div>
          <Card.Title style={styles.title}>{title}</Card.Title>
          <Card.Subtitle className="text-muted" style={styles.subTitle}>
            {categoryTitle}
          </Card.Subtitle>
        </div>
        <div style={styles.dateWrapper}>
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
  dateWrapper: CSSProperties;
}

const styles: CategoryItemStyles = {
  card: {
    marginBottom: 8,
    cursor: 'pointer',
    paddingRight: 8,
    paddingLeft: 8,
  },
  body: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 8,
  },
  title: {
    marginBottom: 8,
    textDecoration: 'underline',
  },
  subTitle: {
    fontSize: '0.8rem',
  },
  dateWrapper: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 4,
  },
};
