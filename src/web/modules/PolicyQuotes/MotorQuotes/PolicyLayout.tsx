import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {withRouter} from 'react-router-dom';

import Header from 'src/web/components/Header';
import CurrentPolicy from 'src/web/screens/Dashboard/components/CurrentPolicy';
import Footer from 'src/web/components/Footer';

const PolicyLayout = (props: any) => {
    return (
        <div className={props.className}>
            <Header/>
            <CurrentPolicy
                insurerAvatar="https://image.flaticon.com/icons/png/512/48/48982.png"
                insurerName="Default insurer"
                policyName="Motor Policy 1"
                onBackArrowClick={() => props.history.push(`/app/dashboard/motor/${props.match.params.motorId}/quote`)}
            />
            <Content>
                {props.children}
            </Content>
            <Footer/>
        </div>
    );
};

const Content = styled.div`
    flex-grow: 1;
`;

const StyledPolicyLayout = styled(PolicyLayout)`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-self: stretch;
    background-color: #F5F2E9;
    overflow-y: scroll;
`;

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({
    push,
}, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(StyledPolicyLayout));