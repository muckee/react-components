import React from 'react';
import DefaultInput from './DefaultInput';
import Select from './Select';

export interface InputProps {
  name: string;
  id?: string | undefined;
  type?: string | undefined;
  children?: any;
  hidden?: boolean | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  className?: string | undefined;
  disabled?: boolean | undefined;
  placeholder?: any;
  value?: any;
};

const Input = (props: InputProps) => {

  const {
    type,
  } = props;

  switch (type) {
    case 'select':
      return <Select {...props} />;
    default:
      return <DefaultInput {...props} />;
  };

};

export default Input;