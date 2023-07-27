import React from 'react';

import UnorderedList from '../List/UnorderedList';
import ListItem from '../List/ListItem';

import styles from './Menu.module.css';

export interface MenuProps {
  menuRef?: React.LegacyRef<HTMLElement> | undefined;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  children?: any;
  items?: any[] | undefined;
  itemClassName?: string | undefined;
  categories?: {
    category: string;
    items: any[];
  }[];
  categoryClassName?: string | undefined;
  categoryHeadingClassName?: string | undefined;
}

const Menu = (props: MenuProps) => {

  return <menu
    ref={props.menuRef}
    className={`${styles.menu}${props.className ? ` ${props.className}` : ''}`}
    style={props.style}
  >

    {props.children && props.children}

    {props.items && props.items.map((item, idx) => {

      return <ListItem
        key={idx}
        className={`${styles.menuItem}${props.itemClassName ? ` ${props.itemClassName}` : ''}`}
      >

        {item}

      </ListItem>;
    })}

    {props.categories && props.categories.map((category, cIdx) => {

      return <ListItem key={cIdx} className={props.categoryClassName}>

        <h4 className={props.categoryHeadingClassName}>{category.category}</h4>

        <UnorderedList>

          {category.items.map((item, iIdx) => {
            return <ListItem
              key={iIdx}
              className={`${styles.menuItem}${props.itemClassName ? ` ${props.itemClassName}` : ''}`}
            >
              {item}
            </ListItem>;
          })}

        </UnorderedList>

      </ListItem>;
    })}
  </menu>;
};

export default Menu;