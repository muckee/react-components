import React, { forwardRef } from 'react';

const Nav = forwardRef((props, ref) => <nav
  ref={ref}
  className={`${props.className ? props.className : ''}`}
>
  {props.children}
</nav>);

export default Nav;