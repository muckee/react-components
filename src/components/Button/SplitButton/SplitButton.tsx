import React, {
    cloneElement,
    useState,
} from 'react';
import Button, { ButtonProps } from '../Button';
import Menu from '../../Menu';
import styles from './SplitButton.module.css';

export interface SplitButtonProps extends ButtonProps {
    splitButtonProps?: ButtonProps | undefined,
    menuItems?: ButtonProps[] | undefined,
};

const SplitButton = (props: SplitButtonProps) => {

    const {
        children,
        menuItems,
        splitButtonProps,
    } = props;

    // Separate Button props from SplitButton props
    const buttonProps = {
        title: props.title,
        type: props.type,
        className: props.className,
        status: props.status,
        onClick: props.onClick,
        onMouseDown: props.onMouseDown,
        onMouseUp: props.onMouseUp,
        onMouseOut: props.onMouseOut,
        disabled: props.disabled,
    };

    const [menuIsVisible, setMenuIsVisible] = useState(false);

    return <div
        className={styles.splitButtonContainer}
    >

        <Button
            {...buttonProps}
            className={`${styles.button}${buttonProps.className ? ` ${buttonProps.className}` : ''}`}
        >
            {children}
        </Button>

        <div
            className={styles.menuContainer}
        >

            <Button
                onClick={() => setMenuIsVisible(!menuIsVisible)}
                {...splitButtonProps}
            >

                <i
                    className={`ri-arrow-drop-${menuIsVisible ? `up` : `down` }-line`}
                />

            </Button>

        </div>

        {menuIsVisible && <Menu
            className={styles.menu}
            items={menuItems ? menuItems.map((item) => {
                return <Button className={styles.menuItem} {...item} />;
            }) : []}
        />}

    </div>;
};

export default SplitButton;