import * as React from 'react';
import styled from 'styled-components';

import Header from 'src/web/components/Header';
import Footer from 'src/web/components/Footer';

import NewPolicyHead from './NewPolicyHead';

class MainLayout extends React.PureComponent<any, any> {
    static NewPolicyHead = NewPolicyHead;
    static CurrentPolicyHead = null;

    render() {
        const { headComponent: HeadComponent, ...rest } = this.props;

        return (
            <Layout>
                <Header />
                {HeadComponent && <HeadComponent {...rest} />}
                <Content>
                    {this.props.children}
                </Content>
                <Footer />
            </Layout>
        );
    }
}

const Content = styled.div`
    flex-grow: 1;
`;

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-self: stretch;
    background-color: #F5F2E9;
    overflow-y: scroll;
`;

export default MainLayout;
