import {
    ButtonProps,
} from '@components/Button';
import {
    NotificationProps
} from '@components/Notification';
import { FieldsetProps } from '@components/Form';
export {
    default as Status,
} from './Status';

import defaultStyles from './use-get-classes-from-props.module.css';

export interface Class {
    property: string;
    format: (
        // TODO: Refine type of styles once pre-processors are added
        styles: object,
        property: string,
    ) => string;
}

export type ElementProps = ButtonProps | NotificationProps | FieldsetProps;

// Dynamically concatenate classes from props
////
// Find a set of values in an array, filtered by property name.
// Concatenate the found values into a string, each separated by a single whitespace character.
// Trim excess whitespace.
// The resulting string is suitable for use as the value of a React element's `className` property.
const useGetClassesFromProps = (
    props: ElementProps,
    styles: object = defaultStyles,
    classes: Class[] = [
        {
            property: 'status',
            // TODO: Refine type of styles once pre-processors are added
            format: (styles: object, property: string) => {
                return styles[property as keyof typeof styles];
            }
        },
        {
            property: 'className',
            // TODO: Refine type of styles once pre-processors are added
            format: (_: object, property: string) => {
                return property;
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

        if (props[c.property as keyof ElementProps]) {

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

            // Add the default class to the list of class names,
            // using the default style as a fallback in case user-provided styles do not contain a 'default' class
            const defaultClass = styles['default' as keyof typeof styles] || defaultStyles['default' as keyof typeof defaultStyles];

            classNames.push(defaultClass);
        }
    }

    // Conditionally add the `disabled` class to the list
    if (useDisabled) {

        // Check if the disabled flag is set to true
        const className: keyof ButtonProps = 'disabled';

        if ((props as ButtonProps)[className] !== undefined && (props as ButtonProps)[className]) {

            // Add the disabled class to the list of class names
            const disabledClass = styles[className as keyof typeof styles] || defaultStyles[className as keyof typeof defaultStyles];
            classNames.push(disabledClass);
        }
    }

    // If no class names were found, don't add any classes.
    if (!classNames.length) {
        return undefined;
    }

    // Check if user-defined className property is being used.
    if(
        classes.find(c => c.property === 'className')
        && props['className'] !== undefined
    ) {

        // Ensure that the user-defined className property is assigned last.
        // TODO: Instead of doing this, just make sure it's always appended last. Also rewrite the hook from scratch.
        const userClassName = props['className'];
        const updatedClassNames = classNames.filter(c => c !== props['className']);
        updatedClassNames.push(userClassName);

        // Return concatenated class names, separated by a single whitespace character
        return updatedClassNames.join(' ');
    }

    // Return concatenated class names, separated by a single whitespace character
    return classNames.join(' ');
};

export default useGetClassesFromProps;