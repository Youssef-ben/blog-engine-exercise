import { forwardRef } from 'react';
import { FloatingLabel, Form, FormControlProps } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './datePicker.scss';

const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';
const ONE_DAY_IN_MILLISECONDS = 3600 * 1000 * 24;
const START_DATE = new Date(1900, 1, 1);

export interface AppDatePickerProps {
  id?: string;
  label: string;
  value?: Date;
  isDisabled?: boolean;
  name?: string;
  onDateChange: (date: Date) => void;
}

export const AppDatePicker = ({
  id,
  label,
  isDisabled,
  value = new Date(),
  onDateChange,
}: AppDatePickerProps) => {
  const CustomDatePickerInput = forwardRef<HTMLInputElement, Partial<FormControlProps>>(
    ({ value, onClick }, ref) => (
      <>
        <FloatingLabel label={label} className="mb-3">
          <Form.Control
            required
            readOnly
            ref={ref}
            id={id}
            type="text"
            name={id}
            onClick={onClick}
            disabled={isDisabled}
            defaultValue={value}
            placeholder={label}
            style={{
              minHeight: '58px',
            }}
          />
        </FloatingLabel>
      </>
    )
  );

  return (
    <DatePicker
      disabled={isDisabled}
      selected={value}
      dateFormat={DEFAULT_DATE_FORMAT}
      onChange={onDateChange}
      excludeDateIntervals={[
        { start: START_DATE, end: new Date(Date.now() - ONE_DAY_IN_MILLISECONDS) },
      ]}
      customInput={<CustomDatePickerInput />}
    />
  );
};
