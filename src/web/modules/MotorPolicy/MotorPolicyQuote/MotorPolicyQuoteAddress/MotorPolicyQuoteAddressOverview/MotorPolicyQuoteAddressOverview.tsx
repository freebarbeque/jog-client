import * as React from 'react';

import {QuoteAddress} from 'src/web/images';
import Layout from '../Layout';

export default class MotorPolicyQuoteAddressOverview extends React.PureComponent<any, any> {
    layoutDescription = {
        title: 'Address',
        icon: QuoteAddress,
        backTitle: 'Back to overview',
        backUrl: `/app/dashboard/motor/${this.props.match.params.policyId}/quote`,
    };

    render() {
        return (
            <Layout description={this.layoutDescription}>
                <h1>Overview!!!</h1>
            </Layout>
        )
    }
}
