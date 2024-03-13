import React, {
    useEffect,
    useState,
} from 'react';
import Spinner from '@components/Spinner';

export interface MicroFrontendProps {
    host: string;
    name: string;
    history: string;
    className?: string | undefined;
}

const MicroFrontend = (props: MicroFrontendProps) => {

    const {
        host,
        name,
        history,
        className,
    } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const renderMicroFrontend = () => (window as { [key: string]: any })[ // eslint-disable-line @typescript-eslint/no-explicit-any
        `render${name.replace(/\s/, '')}`
    ](
        `${name}-container`,
        history,
    );

    useEffect(() => {

        setErrorMsg('');
        setIsLoading(true);

        const scriptId = `micro-frontend-script-${name}`;

        if (document.getElementById(scriptId)) {

            renderMicroFrontend();

            setIsLoading(false);

            return;
        }

        // TODO: Add loading spinner whilst fetching and handle with `.finally()`

        fetch(`${host}asset-manifest.json`)
            .then((res) => res.json())
            .then((manifest) => {

                const script = document.createElement('script');

                script.id = scriptId;

                script.crossOrigin = '';

                script.src = `${host}${manifest.files['main.js']}`;

                script.onload = () => {
                    renderMicroFrontend();
                };

                document.head.appendChild(script);

                // fetch(`${host}/${manifest.files['main.css']}`)
                //     .then(styles => styles.text())
                //     .then(styles => {

                //         const style = document.createElement('style');
                //         style.type = 'text/css';

                //         if (style.styleSheet) {
                //             style.styleSheet.cssText = styles;
                //         } else {
                //             style.appendChild(document.createTextNode(styles));
                //         }

                //         style.id = scriptId.replace('script', 'style');

                //         document.head.appendChild(style);
                //     });

            }).catch(() => {

                setErrorMsg('The service could not be loaded! Please contact the system administrator for support.');

            }).finally(() => {
                setIsLoading(false);
            });

        return () => {
            (window as { [key: string]: any })[`unmount${name}`] && (window as { [key: string]: any })[`unmount${name}`](`${name}-container`); // eslint-disable-line @typescript-eslint/no-explicit-any
        };

    }, [name, host]);

    return <div
        id={`${name}-container`}
        className={className}
    >
        {errorMsg && <p className={'error'}>{errorMsg}</p>}
        {isLoading && <Spinner
            isLoading={true}
            loadingMessage={`Loading ${name}`}
        />}
    </div>;

    // return errorMsg ? <p className={'error'}>{errorMsg}</p> : isLoading ? <Spinner
    //     isLoading={true}
    //     loadingMessage={`Loading ${name}`}
    // /> : <div
    //     id={`${name}-container`}
    //     className={className}
    // />;
};

export default MicroFrontend;