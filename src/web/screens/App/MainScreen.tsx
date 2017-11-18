import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import styled from 'styled-components';
import PolicyScreen from '../Policy/PolicyScreen';
import GetStarted from '../Landing/GetStartedScreen';

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

// tslint:disable-next-line:max-classes-per-file
export default class MainScreen extends React.Component<{}, {}> {
    public render() {
        return (
            <Container>
                <Route path="/app/get_started" exact component={GetStarted} />
                <Route path="/app/policies" exact component={PolicyScreen} />
            </Container>
        )
    }
}
