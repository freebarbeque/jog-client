import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {withRouter} from 'react-router-dom';

import {getPolicyQuoteRequest} from 'src/common/selectors/policyQuoteRequest';
import HeadLine from 'src/web/common/components/HeadLine';

const MotorQuotesHeadLine = (props: any) => {
    const { policyQuoteRequest } = props;

    return (
        <HeadLine
            imageUrl="https://image.flaticon.com/icons/png/512/48/48982.png"
            secondaryText={policyQuoteRequest.vehicle.registration}
            primaryText="Car"
            inverseStyling
            handleClick={() => props.history.push(`/app/dashboard/motor/${props.match.params.policyId}/quote`)}
        />
    );
};

const mapStateToProps = (state: any, props: any) => ({
    policyQuoteRequest: getPolicyQuoteRequest(state, props.match.params.policyId)
});

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({
    push,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MotorQuotesHeadLine));
