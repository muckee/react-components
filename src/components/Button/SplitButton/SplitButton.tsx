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
        splitButtonProps,
    } = props;

    const [menuIsVisible, setMenuIsVisible] = useState(false);

    const className = styles.container + getClassNamesFromProps(props) + (outline ? ` ${styles.outline}` : '') + (menuIsVisible ? ` ${styles.expanded}` : '');

    return <div
        className={styles.container}
    >

        <PrimaryButton {...props} />

        <div
            className={className}
        >

            <Button
                className={styles.toggleButton}
                onClick={() => setMenuIsVisible(!menuIsVisible)}
                {...splitButtonProps}
            >

                <i
                    className={`ri-arrow-drop-${menuIsVisible ? `up` : `down` }-line`}
                />

            </Button>

            {menuIsVisible && <Menu
                className={styles.menu}
                items={menuItems ? menuItems.map((item) => {
                    return <Button className={styles.menuItem} {...item} />;
                }) : []}
            />}

        </div>

    </div>;
};

export default SplitButton;