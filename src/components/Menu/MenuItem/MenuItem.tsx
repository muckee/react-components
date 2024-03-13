import React, {
    Fragment,
    MouseEvent,
    ReactNode,
    useState,
} from 'react';
import {
    Status,
} from '@hooks';
import Button, {
    SplitButtonPosition,
} from '@components/Button';
import Dropdown, {
    DropdownMenuButton as TemplateDropdownMenuButton,
} from '@components/Dropdown';
import {
    ListItem,
} from '@components/List';
import RemixIcon, {
    Icon,
} from '@components/RemixIcon';

import styles from './MenuItem.module.css';

export interface ButtonLabelProps {
    label?: string | undefined;
    icon?: Icon | undefined;
    menuIsPinned?: boolean | undefined;
    isHovering?: boolean | undefined;
}

const ButtonLabel = (props: ButtonLabelProps) => {

    const {
        label,
        icon,
        menuIsPinned,
        isHovering,
    } = props;

    const textLabel = <span
        className={`${styles.buttonText}${menuIsPinned ? '' : ` ${styles.menuItemHidden}`}${isHovering ? ` ${styles.hover}` : ''}`}
    >{icon
            ? <Fragment>
                <span>&nbsp;|&nbsp;</span>{label}
            </Fragment>
            : label}
    </span>;

    return <span
        className={`${styles.iconContainer}`}
    >{icon && <RemixIcon icon={icon} />}{textLabel}</span>;
};

export interface DropdownMenuButtonProps {
    title: string;
    menuIsPinned?: boolean | undefined;
    isHovering?: boolean | undefined;
    disabled?: boolean | undefined;
    setMenuIsVisible: (visible: boolean) => void;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void | undefined;
    children: ReactNode | undefined;
}

const DropdownMenuButton = (props: DropdownMenuButtonProps) => {

    const {
        title,
        menuIsPinned,
        isHovering,
        disabled,
        setMenuIsVisible,
        onClick,
        children,
    } = props;

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {

        setMenuIsVisible(false);

        if (onClick) {
            onClick(e);
        }
    };

    return <TemplateDropdownMenuButton
        title={title}
        disabled={disabled}
        onClick={handleClick}
        className={`${menuIsPinned ? '' : ` ${styles.menuItemHidden}`}${isHovering ? ` ${styles.hover}` : ''}`.trim()}
    >
        {children}
    </TemplateDropdownMenuButton>;
};

export interface MenuButtonProps {
    title: string;
    menuIsVisible: boolean;
    setMenuIsVisible: (visible: boolean) => void;
    label?: string | undefined;
    icon?: Icon | undefined;
    status?: Status | undefined;
    buttonTogglesMenu?: boolean | undefined;
    menuIsPinned?: boolean | undefined;
    isHovering?: boolean | undefined;
    disabled?: boolean | undefined;
    dropdownItems?: MenuItemProps[] | undefined;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void | undefined;
}

const MenuButton = (props: MenuButtonProps) => {

    const {
        title,
        label,
        icon,
        status,
        menuIsPinned,
        menuIsVisible,
        isHovering,
        buttonTogglesMenu,
        disabled,
        dropdownItems,
        onClick,
        setMenuIsVisible,
    } = props;

    if (dropdownItems !== undefined) {

        return <Dropdown
            menuIsVisible={menuIsVisible}
            setMenuIsVisible={setMenuIsVisible}
            position={SplitButtonPosition.Right}
            status={status}
            buttonTogglesMenu={buttonTogglesMenu}
            buttonProps={{
                title: title,
                disabled: disabled,
                className: `${styles.menuItemButton}${menuIsPinned ? '' : ` ${styles.menuItemHidden}`}${isHovering ? ` ${styles.hover}` : ''}`,
                onClick: onClick,
            }}
            menuItems={dropdownItems.map((item, idx) => {

                return <DropdownMenuButton
                    key={idx}
                    title={item.title}
                    menuIsPinned={menuIsPinned}
                    isHovering={isHovering}
                    disabled={item.disabled}
                    setMenuIsVisible={setMenuIsVisible}
                    onClick={item.onClick}
                >
                    <ButtonLabel
                        label={item.label}
                        icon={item.icon}
                        menuIsPinned={menuIsPinned}
                        isHovering={isHovering}
                    />
                </DropdownMenuButton>;
            })}
            menuItemClassName={styles.dropdownMenuItem}
        />;
    }

    return <Button
        title={title}
        status={status}
        className={`${styles.menuItemButton}${menuIsPinned ? '' : ` ${styles.menuItemHidden}`}${isHovering ? ` ${styles.hover}` : ''}`}
        disabled={disabled}
        onClick={onClick}
    >

        <ButtonLabel
            label={label}
            icon={icon}
            menuIsPinned={menuIsPinned}
            isHovering={isHovering}
        />

    </Button>;
};

export interface MenuItemProps {
    title: string;
    icon?: Icon | undefined;
    label?: string | undefined;
    status?: Status | undefined;
    disabled?: boolean | undefined;
    liClassName?: string | undefined;
    dropdownItems?: MenuItemProps[] | undefined;
    menuIsPinned?: boolean | undefined;
    isHovering?: boolean | undefined;
    buttonTogglesMenu?: boolean | undefined;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const MenuItem = (props: MenuItemProps) => {

    const {
        title,
        icon,
        label,
        status,
        disabled = false,
        liClassName,
        menuIsPinned = true,
        isHovering = false,
        onClick,
        dropdownItems,
        buttonTogglesMenu,
    } = props;

    const [menuIsVisible, setMenuIsVisible] = useState(false);

    return <ListItem
        className={`${styles.stretchChildren}${liClassName ? ` ${liClassName}` : ''}`}
    >

        <MenuButton
            title={title}
            label={label}
            icon={icon}
            status={status}
            dropdownItems={dropdownItems}
            buttonTogglesMenu={buttonTogglesMenu}
            menuIsPinned={menuIsPinned}
            menuIsVisible={menuIsVisible}
            isHovering={isHovering}
            disabled={disabled}
            onClick={onClick}
            setMenuIsVisible={setMenuIsVisible}
        />

    </ListItem>;
};

export default MenuItem;