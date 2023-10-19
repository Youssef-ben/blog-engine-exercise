import { ForwardedRef } from 'react';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/esm/Form';

import React from 'react';
import { FormControlProps } from 'react-bootstrap';
import './textInput.scss';

export interface TextInputProps extends FormControlProps {
  ref?: ForwardedRef<HTMLTextAreaElement>;
  label: string;
  value?: string;
  isTextArea?: boolean;
  isReadOnly?: boolean;
  name?: string;
  onClick?: () => void;
}

export const TextInput = React.forwardRef<HTMLTextAreaElement, TextInputProps>((props, ref) => {
  const { label, value, isTextArea, isReadOnly = false, onClick, onChange, ...baseProps } = props;

  return (
    <FloatingLabel label={label} className="mb-3">
      <Form.Control
        {...baseProps}
        ref={ref}
        required
        type="text"
        defaultValue={value}
        readOnly={isReadOnly}
        placeholder={label}
        as={isTextArea ? 'textarea' : undefined}
        style={{
          minHeight: isTextArea ? '150px' : '58px',
        }}
        onClick={onClick}
        onChange={onChange}
      />
    </FloatingLabel>
  );
});
