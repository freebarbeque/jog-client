import * as React from 'react';

import BaseLayout from 'src/web/common/layouts/BaseLayout';
import TabbedContent from 'src/web/common/utils/TabbedContent';

import MotorQuotesListContent from './MotorQuotesListContent';
import MotorQuotesHeadLine from '../MotorQuotesHeadLine';

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
            <BaseLayout
                isHeadLined
                headLineComponent={MotorQuotesHeadLine}
            >
                <TabbedContent tabsDescription={tabsDescription} />
            </BaseLayout>
        );
    }
}
