import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthVerification from './AuthVerification';
import AuthLanding from './AuthLanding';
import AuthLogin from './AuthLogin';
import AuthJoin from './AuthJoin';
import AuthRestore from './AuthRestore';
import AuthJoinConfirmation from './AuthJoinConfirmation';

const AuthPage = ({ match }) => (
    <Switch>
        <Route path={match.url} component={AuthLanding} exact />
        <Route path={`${match.url}/login`} component={AuthLogin} />
        <Route path={`${match.url}/join`} component={AuthJoin} exact />
        <Route path={`${match.url}/join/confirmation`} component={AuthJoinConfirmation} />
        <Route path={`${match.url}/restore`} component={AuthRestore} />
        <Route path={`${match.url}/verification`} component={AuthVerification} />
    </Switch>
);

export default AuthPage;
