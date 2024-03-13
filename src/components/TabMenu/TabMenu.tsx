import React, {
    ReactNode,
} from 'react';
import Article from '@components/Article';
import Button from '@components/Button';
import Menu from '@components/Menu';
import Section from '@components/Section';

import styles from './TabMenu.module.css';

export type TabMenuItem = {
    title: string;
    name: string;
    value: string;
}

export interface TabMenuProps {
    currentTab: string,
    setCurrentTab: (value: string) => void,
    menuItems?: TabMenuItem[] | undefined,
    className?: string | undefined;
    contentClassName?: string | undefined;
    children?: ReactNode | undefined;
}

const TabMenu = (props: TabMenuProps) => {

    const {
        currentTab,
        setCurrentTab,
        menuItems = [],
        className,
        contentClassName,
        children,
    } = props;

    return <Section
        className={className ? className : ''}
    >
        {/* TODO: Make this re-usable */}

        <Menu
            className={styles.menu}
            itemClassName={styles.menuItem}
            items={menuItems.map((i, idx) => {

                return <Button
                    key={idx}
                    type={'button'}
                    title={i.title}
                    className={`${styles.menuButton}${currentTab === i.value ? ` ${styles.currentTab}` : ''}`}
                    onClick={() => setCurrentTab(i.value)}
                >{i.name}</Button>;

            })}
        />

        <Article
            className={`${styles.article}${contentClassName ? ` ${contentClassName}` : ''}`}
        >

            {children}

        </Article>

    </Section>;
};

export default TabMenu;