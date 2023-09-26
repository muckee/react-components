import React, {
    useState,
} from 'react';
import Button, {
    ButtonProps, getClassNamesFromProps,
} from '../Button';
import Menu from '../../Menu';
import styles from './SplitButton.module.css';
import PrimaryButton from './PrimaryButton';
import ToggleButton from './ToggleButton';

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
        className={`${styles.container}${menuIsVisible ? ` ${styles.expanded}` : ''}`}
    >

        <PrimaryButton
            {...props}
            menuIsVisible={menuIsVisible}
        />

        {!menuIsVisible && <hr className={`${styles.verticalRule}${disabled ? ` ${styles.disabled}` : ''}`} />}

        <ToggleButton
            {...props}
            menuIsVisible={menuIsVisible}
            setMenuIsVisible={setMenuIsVisible} // TODO: Use ForwardRefs
        />

        {menuIsVisible && <Menu
            className={`${styles.menu}${disabled ?  ` ${styles.disabled}` : ''}`}
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