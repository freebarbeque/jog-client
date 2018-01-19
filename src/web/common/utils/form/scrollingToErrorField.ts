import { scroller } from 'react-scroll';

export const handleScrollToErrorField = (overrideOptions: any = {}) => {
    return errors => {
        const defaultScrollOptions = {
            smooth: true,
            offset: -100,
            duration: 500,
        };

        const scrollOptions = Object.assign({}, defaultScrollOptions, overrideOptions);

        const orderedErrorList = Object.keys(errors).sort((currentField: string, nextField: string): any => {
            const currentFieldNode = document.getElementsByName(currentField)[0];
            const nextFieldNode = document.getElementsByName(nextField)[0];

            return currentFieldNode && nextFieldNode && currentFieldNode.compareDocumentPosition(nextFieldNode) === 2;
        });

        const firstErrorField = orderedErrorList[0];

        console.log('HEY: ', firstErrorField && document.querySelectorAll(`[name=${firstErrorField}]`).length);

        if (firstErrorField && document.querySelectorAll(`[name=${firstErrorField}]`).length) {
            scroller.scrollTo(firstErrorField, scrollOptions);
        }
    }
};