import React, { ForwardedRef, forwardRef } from 'react';

export interface NavProps {
  className?: string | undefined;
  children?: any;
}

const Nav = forwardRef((
  props: NavProps,
  ref: ForwardedRef<HTMLElement>
) => {
  return <nav
    ref={ref}
    className={`${props.className ? props.className : ''}`}
  >
    {props.children}
  </nav>;
});

export default Nav;