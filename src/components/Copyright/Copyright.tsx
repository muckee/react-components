import React from 'react';

export interface CopyrightProps {
    organisationName?: string | undefined,
    className?: string | undefined,
}

const Copyright = (props: CopyrightProps) => {

    const {
        organisationName,
        className,
    } = props;

    let copyrightString = new Date().getFullYear().toString();

    if (organisationName) {
        copyrightString += ` ${organisationName}${organisationName.slice(-1) === '.' ? '' : '.'}`;
    } else {
        copyrightString += '.';
    }

    return <small
        className={className}
    >
        Copyright &copy; {copyrightString} All rights reserved.
    </small>;
};

export default Copyright;