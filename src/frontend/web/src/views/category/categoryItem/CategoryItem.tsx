import { CSSProperties } from 'react';
import { Card } from 'react-bootstrap';

export interface CategoryItemProps {
  id: string;
  title: string;
  onClick?: (id: string) => void;
}

export const CategoryItem = ({ id, title, onClick }: CategoryItemProps) => {
  return (
    <Card style={styles.card} onClick={() => onClick && onClick(id)}>
      <Card.Body style={styles.body}>
        <Card.Title style={styles.title}>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

interface CategoryItemStyles {
  card: CSSProperties;
  body: CSSProperties;
  title: CSSProperties;
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
    marginBottom: 0,
    textTransform: 'capitalize',
    textDecoration: 'underline',
    textAlign: 'center',
  },
};
