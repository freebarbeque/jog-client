import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import MotorPolicyCreationManual from './MotorPolicyCreationManual';

export default class MotorPolicyCreation extends React.PureComponent<any, any> {
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.path}/manual`} component={MotorPolicyCreationManual} />
                <Route path={`${this.props.match.path}/upload`} component={() => <h1>Upload</h1>} />
            </Switch>
        )
    }
}
