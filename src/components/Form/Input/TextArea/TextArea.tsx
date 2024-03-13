import React, {
    HTMLProps,
} from 'react';

const TextArea = (props: HTMLProps<HTMLTextAreaElement>) => {

    return <textarea
        {...props}
    />;
};

export default TextArea;