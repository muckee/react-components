import React, {
    ForwardedRef,
    ReactNode,
    forwardRef,
} from 'react';

export interface NavProps {
  className?: string | undefined;
  children?: ReactNode | undefined;
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

Nav.displayName = 'Nav';

export default Nav;