import * as React from 'react';
import Header from 'src/web/components/Header';
import Description from './components/Description';
import styled from 'styled-components';
import {CREAM, WHITE} from '~/common/constants/palette';
import Footer from 'src/web/components/Footer';
import CreatePolicyForm from './components/CreatePolicyForm';
import {ICreatePolicyFormValues} from '~/common/interfaces/policies';
import {injectSaga} from '~/common/utils/saga';
import {createPolicyFlow} from '~/common/sagas/policies';
import {createPolicy} from 'src/common/actions/policies';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import DocumentsPolicy from 'src/web/screens/Dashboard/components/DocumentsPolicy';

interface ICreatePolicyScreenProps {
    className: string;
    createPolicy: ActionCreator<Action>;
    match: any;
    history?: any;
}

const Content = styled.div`
    background-color: ${CREAM};
    padding: 35px 25px;
    display: flex;
`;

const ContentContainer = styled.div`
    color: #000;
    box-shadow: 0 2px 4px #333;
    background-color: ${WHITE};
    width: 70%;
    margin: 10px auto;
`;

class CreatePolicyScreen extends React.Component<ICreatePolicyScreenProps, {}> {
    componentWillMount() {
        injectSaga(createPolicyFlow);
    }

    render() {
        return (
            <div className={this.props.className}>
                <Header/>
                <Description onBackArrowClick={() => this.props.history.push(`/app/dashboard/motor/add`)}/>
                <Content>
                    <Route
                        exact
                        path={`${this.props.match.url}/manual`}
                        render={() => (
                            <CreatePolicyForm
                                onSubmit={(values: ICreatePolicyFormValues) => this.props.createPolicy(values)}
                            />
                        )}
                    />
                    <Route
                        exact
                        path={`${this.props.match.url}/upload`}
                        component={DocumentsPolicy}
                    />
                </Content>
                <Footer/>
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    createPolicy,
}, dispatch);

export default connect(null, mapDispatchToProps)(CreatePolicyScreen);