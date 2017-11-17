import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import styled from 'styled-components';
import PolicyScreen from '../Policy/PolicyScreen';
import GetStarted from './GetStarted';
import {injectSaga} from "~/common/utils/saga";
import {appFlow} from 'src/common/sagas/app';

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

// tslint:disable-next-line:max-classes-per-file
export default class MainScreen extends React.Component<{}, {}> {
    private componentWillMount() {
        injectSaga(appFlow);
    }

    public render() {
        return (
            <Container>
                <Route path="/app/get_started" exact component={GetStarted} />
                <Route path="/app/policies" exact component={PolicyScreen} />
            </Container>
        )
    }
}
