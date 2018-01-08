import * as React from 'react';

import MotorQuotesListContent from './MotorQuotesListContent';

import TabbedContent from '../../../../common/utils/TabbedContent';
import MotorQuoteLayout from '../PolicyLayout';

const tabsDescription = [{
    id: 'annual',
    title: 'Annual',
    type: 'annual',
    component: MotorQuotesListContent,
}, {
    id: 'monthly',
    title: 'Monthly',
    type: 'monthly',
    component: MotorQuotesListContent,
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
