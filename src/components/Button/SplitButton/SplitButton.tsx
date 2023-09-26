import React, {
    useState,
} from 'react';
import Button, {
    ButtonProps, getClassNamesFromProps,
} from '../Button';
import Menu from '../../Menu';
import styles from './SplitButton.module.css';
import PrimaryButton from './PrimaryButton';

export interface SplitButtonProps extends ButtonProps {
    splitButtonProps?: ButtonProps | undefined,
    menuItems?: ButtonProps[] | undefined,
};

const SplitButton = (props: SplitButtonProps) => {

    const {
        outline,
        menuItems,
        disabled,
        splitButtonProps,
    } = props;

    const [menuIsVisible, setMenuIsVisible] = useState(false);

    return <div
        className={styles.container}
    >

        <PrimaryButton {...props} />

        <div
            className={styles.toggleButtonContainer + getClassNamesFromProps(props) + (outline ? ` ${styles.outline}` : '') + (menuIsVisible ? ` ${styles.expanded}` : '')}
        >

            <Button
                className={`${styles.toggleButton}${menuIsVisible ? ` ${styles.expanded}` : ''}`}
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
                return <Button
                    {...{
                        ...item,
                        className: styles.menuItem + (item.className ? ` ${item.className}` : ''), // Prepend parent style to button
                        disabled: item.disabled ? item.disabled : disabled, // If item is not disabled, pass `props.disabled` from parent
                    }}
                />;
            }) : []}
        />}

    </div>;
};

export default SplitButton;