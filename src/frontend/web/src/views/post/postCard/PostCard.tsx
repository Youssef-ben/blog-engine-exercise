import { Badge, Card } from 'react-bootstrap';

export interface PostCardProps {
  id: string;
  title: string;
  content: string;
  category: string;
  publicationDate: string;
  onClick?: (id: string) => void;
}

export const PostCard = ({
  id,
  title,
  content,
  category,
  publicationDate,
  onClick,
}: PostCardProps) => (
  <Card
    className="add-shadow-on-hover"
    key={id}
    id={id}
    style={{ width: '100%', cursor: 'pointer' }}
    onClick={() => onClick && onClick(id)}
  >
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{content}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Badge bg="secondary">{category}</Badge>
        <Badge bg="light" text="dark">
          {publicationDate}
        </Badge>
      </div>
    </Card.Footer>
  </Card>
);
