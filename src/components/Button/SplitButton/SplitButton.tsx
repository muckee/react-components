import React, {
    Fragment,
} from 'react';
// import PrimaryButton from './PrimaryButton';
// import SecondaryButton from './SecondaryButton';
import Button, {
    ButtonProps,
} from '../';
import { useClassNames } from '../../../hooks';

import themeStyles from '../../../theme.module.css';
import styles from './SplitButton.module.css';

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

            // console.log(position === SplitButtonPosition.Middle);

            // console.log(((idx === items.length -1) && (position === SplitButtonPosition.Left)));

            // console.log(((idx == 0) && (position === SplitButtonPosition.Right)));

            if(
                position === SplitButtonPosition.Middle
                || (idx === 0 && position === SplitButtonPosition.Right)
                || (idx === (items.length - 1) && position === SplitButtonPosition.Left)
            ) {
                buttonClassName += ` ${styles.flex}`;
            }

            // switch (true) {
            // case (position === SplitButtonPosition.Middle):
            //     console.log('hit middle');
            //     buttonClassName += ` ${styles.flex}`;
            //     break;
            // case ((idx === items.length -1) && (position === SplitButtonPosition.Left)):
            //     console.log('hit left');
            //     buttonClassName += ` ${styles.flex}`;
            //     break;
            // case ((idx === 0) && (position === SplitButtonPosition.Right)):
            // default:
            //     console.log('hit right');
            //     buttonClassName += ` ${styles.flex}`;
            //     console.log(buttonClassName);
            // }

            buttonClassName += item.className ? ` ${item.className}` : '';

            return <Fragment
                key={idx}
            >
                {idx !== 0 && <hr className={themeStyles.verticalRule} />}

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

// export interface SplitButtonProps {
//     className?: string | undefined;
//     position?: 'left' | 'right' | undefined;
//     primaryButtonProps?: ButtonProps | undefined;
//     secondaryButtonProps?: ButtonProps | undefined;
//     status?: ButtonStatus | undefined;
// }

// const SplitButton = (props: SplitButtonProps) => {

//     const {
//         position = 'right',
//         primaryButtonProps,
//         secondaryButtonProps,
//     } = props;

//     const classNames = useClassNames(props);

//     return <div
//         className={`${styles.splitButton}${position === 'left' ? ` ${styles.reverse}` : ''}${classNames ? ` ${classNames}` : ''}`}
//     >

//         <PrimaryButton
//             {...primaryButtonProps}
//         />

//         <hr className={themeStyles.verticalRule} />

//         <SecondaryButton
//             {...secondaryButtonProps}
//         />

//     </div>;
// };

export default SplitButton;