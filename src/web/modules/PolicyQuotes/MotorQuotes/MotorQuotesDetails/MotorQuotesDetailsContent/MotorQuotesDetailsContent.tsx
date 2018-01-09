import * as React from 'react';

import QuoteDetails from './QuoteDetails';

import {Avatar1} from 'src/web/images';

const quote = {
    id: 4,
    logo: <Avatar1 scale={1.5} />,
    price: 621.10,
    excess: 310,
    upfront: 52,
    owner: 'Aviva',
    extras: 14
};

class MotorQuotesDetailsContent extends React.PureComponent<any, any> {
    getPathToQuotesList = () => {
        const { match: { params: { policyId, requestId, } }, type } = this.props;
        return `/app/quotes/motor/${policyId}/request/${requestId}/${type}`;
    };

    render() {
        const { type } = this.props;

        return <QuoteDetails type={type} quote={quote} backLink={this.getPathToQuotesList()}/>
    }
}

export default MotorQuotesDetailsContent as any;
