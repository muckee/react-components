import React from 'react';

import ListItem from '../List/ListItem';

import styles from './Menu.module.css';

const Menu = props => {

  return <menu
    ref={props.menuRef}
    className={`${styles.menu}${props.className ? ' ' + props.className : ''}`}
    style={props.style}
  >

    {props.children && props.children}

    {props.items && props.items.map((item, idx) => {

      return <ListItem
        key={idx}
        className={`${styles.menuItem}${props.itemClassName ? ' ' + props.itemClassName : ''}`}
      >

        {item}

      </ListItem>;
    })}
  </menu>;
};

export default Menu;