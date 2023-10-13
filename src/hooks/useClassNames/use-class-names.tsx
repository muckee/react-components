import { ButtonProps } from '../../components';
import styles from './use-class-names.module.css';

// Dynamically concatenate classes from props
const useClassNames = (
    props: ButtonProps,
    sourceStyles: object = styles,
) => {

    // TODO: Add support for dynamic property names
    const classes = [
        'className',
        'status',
    ];

    const classNames: string[] = classes.filter((name: string) => {

        // Remove any class names which are not found in props
        if(props[name as keyof ButtonProps]) {
            return true;
        }

        return false;

    }).map((name: string) => {

        // Return the value which corresponds with the class label.

        const className = name as keyof ButtonProps;

        // If we return the value of the targeted prop directly, the class name will be hardcoded. i.e. `.{className}`.
        // We are using CSS modules, so we want to assign the value of `styles.{className}` instead.
        // We can achieve this by using bracket notation to access the desired property of `styles`.
        const propValue = props[className];

        if (className === 'status') {

            return `${sourceStyles[propValue as keyof typeof sourceStyles]}`;
        }

        if (className === 'className') {
            return `${propValue}`;
        }

        return '';
    });

    // Add `sourceStyles.disabled` to class list
    const className:keyof ButtonProps = 'disabled';
    if(props[className]) {
        classNames.push(sourceStyles[className as keyof typeof sourceStyles]);
    }

    // If no status was specified, add `sourceStyles.default` to class list
    if(!props['status']) {
        classNames.push(sourceStyles['default' as keyof typeof sourceStyles]);
    }

    // If no class names were found, don't add any classes.
    if(!classNames.length) {
        return undefined;
    }

    // Concatenate class names, separated by - and prepended with - a single whitespace character
    return classNames.join(' ');
};

export default useClassNames;