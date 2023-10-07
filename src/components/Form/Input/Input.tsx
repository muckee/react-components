import React, {
    ChangeEventHandler,
    ReactNode,
} from 'react';
import DefaultInput from './DefaultInput';
import Select from './Select';

export interface InputProps {
  name: string;
  id?: string | undefined;
  type?: string | undefined;
  children?: ReactNode | undefined;
  hidden?: boolean | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  className?: string | undefined;
  disabled?: boolean | undefined;
  placeholder?: string | undefined;
  value?: string | undefined;
}

const Input = (props: InputProps) => {

    const {
        type,
    } = props;

    switch (type) {
    case 'select':
        delete Object.assign(props, { // Mutate `onChange` to `onSelectChange`
            ['onSelectChange']: props['onChange']
        })['onChange'];
        return <Select {...props} />;
    default:
        return <DefaultInput {...props} />;
    }

};

export default Input;