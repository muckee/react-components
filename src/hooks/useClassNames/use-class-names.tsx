import { ButtonProps } from '../../components';
import defaultStyles from './use-class-names.module.css';

export interface Class {
    property: string;
    format: (
        styles: object,
        property: string,
    ) => string;
}

// Find a set of values in an array, filtered by property name.
// Concatenate the found values into a string, each separated by a single whitespace character.
// Trim excess whitespace
// The resulting string is suitable for use as the value of an HTML element's `class` property.

// Dynamically concatenate classes from props
const useClassNames = (
    props: ButtonProps,
    styles: object = defaultStyles,
    classes: Class[] = [
        {
            property: 'className',
            format: (_, property) => {
                return property;
            }
        },
        {
            property: 'status',
            format: (styles, property) => {
                return defaultStyles[property as keyof typeof defaultStyles];
            }
        },
    ],
    useDefault: string[] = [
        'status',
    ],
    useDisabled: boolean = true,
) => {

    // Derive an array of class names from the `props` parameter
    const classNames: string[] = classes.filter((c) => {

        // Check if the specified property exists

        if (props[c.property as keyof ButtonProps]) {
            return true;
        }

        return false;

    }).map((c) => {

        // Find the corresponding class name for each existing property and then format it

        const property = props[c.property as keyof typeof props] as string;

        // const className: string = props[property];

        return c.format(styles, property) || '';

        // Finally, remove any empty strings from the list of classes
    }).filter((c) => c.trim().length);

    // If `useDefault` is set to true, add the default class to the classes list
    // This is useful for ensuring that rules are honoured in cases where webpack renders stylesheets in the incorrect order
    if (useDefault.length) {

        // Find any specified properties which could not be satisfied to a class
        const unassignedProperties = useDefault.filter(propertyName => !props[propertyName as keyof typeof props]);

        // Check if all specified properties were unsatisfied
        if (unassignedProperties.length === useDefault.length) {

            // Add the default class to the list of class names
            const defaultClass = styles['default' as keyof typeof styles] || defaultStyles['default' as keyof typeof defaultStyles];
            classNames.push(defaultClass);
        }
    }

    // Conditionally add the `disabled` class to the list
    if (useDisabled) {

        // Check if the disabled flag is set to true
        const className: keyof ButtonProps = 'disabled';
        if (props[className]) {

            // Add the disabled class to the list of class names
            const disabledClass = styles[className as keyof typeof styles] || defaultStyles[className as keyof typeof defaultStyles];
            classNames.push(disabledClass);
        }
    }

    // If no class names were found, don't add any classes.
    if (!classNames.length) {
        return undefined;
    }

    // Concatenate class names, separated by a single whitespace character
    return classNames.join(' ');
};

export default useClassNames;