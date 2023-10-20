import { CSSProperties } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export interface SearchBarProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ placeholder, onChange }: SearchBarProps) => {
  return (
    <div style={styles.search}>
      <InputGroup className="mb-0" style={styles.searchInput}>
        <InputGroup.Text id="basic-addon1">
          <i className="fa fa-search"></i>
        </InputGroup.Text>
        <Form.Control
          autoFocus
          placeholder={placeholder}
          aria-label="search"
          aria-describedby="search box"
          onChange={onChange}
        />
      </InputGroup>
    </div>
  );
};

interface searchBarStyle {
  search: CSSProperties;
  searchInput: CSSProperties;
}

const styles: searchBarStyle = {
  search: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: '100%',
  },
};
