import * as React from 'react';

import MotorQuotesDetailsContent from './MotorQuotesDetailsContent/MotorQuotesDetailsContent';

import TabbedContent from '../../../../common/utils/TabbedContent';
import MotorQuoteLayout from '../PolicyLayout';

const tabsDescription = [{
    id: 'annual',
    title: 'Annual',
    type: 'annual',
    component: MotorQuotesDetailsContent,
}, {
    id: 'monthly',
    title: 'Monthly',
    type: 'monthly',
    component: MotorQuotesDetailsContent,
}];

export default class MotorQuotesList extends React.PureComponent<any, any> {
    render() {
        return (
            <MotorQuoteLayout>
                <TabbedContent tabsDescription={tabsDescription} />
            </MotorQuoteLayout>
        );
    }
}
