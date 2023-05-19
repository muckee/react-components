import React from 'react';

import ListItem from '../List/ListItem';

import styles from './Menu.module.css';
import UnorderedList from '../List/UnorderedList';

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
    
    {props.categories && props.categories.map((category, cIdx) => {
      return <ListItem key={cIdx}>
        <h4>{category.category}</h4>
        <UnorderedList>
          {category.items.map((item, iIdx) => {
            return <ListItem key={iIdx}>
              {item}
            </ListItem>;
          })}
        </UnorderedList>
      </ListItem>;
    })}
  </menu>;
};

export default Menu;