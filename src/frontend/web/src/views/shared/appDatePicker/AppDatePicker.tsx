import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { TextInput, TextInputProps } from '../textInput';

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

export const AppDatePicker = ({ id, label, isDisabled, value = new Date(), onDateChange }: AppDatePickerProps) => {
  const CustomDatePickerInput = forwardRef<HTMLTextAreaElement, Partial<TextInputProps>>(({ value, onClick }, ref) => (
    <TextInput id={id} name={id} ref={ref} label={label} value={value} onClick={onClick} isReadOnly disabled={isDisabled} />
  ));

  return (
    <DatePicker
      disabled={isDisabled}
      selected={value}
      dateFormat={DEFAULT_DATE_FORMAT}
      onChange={onDateChange}
      excludeDateIntervals={[{ start: START_DATE, end: new Date(Date.now() - ONE_DAY_IN_MILLISECONDS) }]}
      customInput={<CustomDatePickerInput />}
    />
  );
};
