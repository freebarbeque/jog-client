import * as React from 'react';

import BaseLayout from 'src/web/common/layouts/BaseLayout';
import TabbedContent from 'src/web/common/components/TabbedContent';

import MotorQuotesDetailsContent from './MotorQuotesDetailsContent/MotorQuotesDetailsContent';
import MotorQuotesHeadLine from '../MotorQuotesHeadLine';

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
            <BaseLayout
                isHeadLined
                headLineComponent={MotorQuotesHeadLine}
            >
                <TabbedContent tabsDescription={tabsDescription} />
            </BaseLayout>
        );
    }
}
