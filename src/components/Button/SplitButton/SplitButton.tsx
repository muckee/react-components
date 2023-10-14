import React, {
    Fragment,
} from 'react';
import Button, {
    ButtonProps,
} from '../';

import styles from './SplitButton.module.css';
import { useClassNames } from '../../../hooks';

export enum SplitButtonPosition {
    Left = 'left',
    Right = 'right',
    Middle = 'middle',
}

export interface SplitButtonProps extends ButtonProps {
    items?: ButtonProps[] | undefined;
    position?: SplitButtonPosition | undefined;
}

const SplitButton = (props: SplitButtonProps) => {

    const {
        items,
        position = SplitButtonPosition.Middle,
    } = props;

    const classNames = useClassNames(props);

    return <div
        className={`${styles.splitButton}${classNames ? ` ${classNames}` : ''}`}
    >

        {items?.map((item, idx) => {

            let buttonClassName = `${styles.splitButtonItem}`;

            if(
                position === SplitButtonPosition.Middle
                || (idx === 0 && position === SplitButtonPosition.Right)
                || (idx === (items.length - 1) && position === SplitButtonPosition.Left)
            ) {
                buttonClassName += ` ${styles.flex}`;
            }

            buttonClassName += item.className ? ` ${item.className}` : '';

            return <Fragment
                key={idx}
            >
                {idx !== 0 && <hr className='verticalRule' />}

                <Button
                    {...{
                        ...item,
                        className: buttonClassName,
                    }}
                />

            </Fragment>;

            return;
        })}

    </div>;
};

export default SplitButton;