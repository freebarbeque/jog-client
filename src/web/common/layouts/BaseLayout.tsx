import * as React from 'react';
import styled from 'styled-components';

import Header from 'src/web/components/Header';
import HeadLine from 'src/web/common/components/HeadLine';
import Footer from 'src/web/components/Footer';

interface IBaseLayoutProps {
    isHeadLined?: boolean;
    headLineComponent?: any;
}

class BaseLayout extends React.PureComponent<IBaseLayoutProps, any> {
    render() {
        const { isHeadLined, headLineComponent: HeadLine } = this.props;

        return (
            <Layout>
                <Header />
                {isHeadLined && <HeadLine />}
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

export default BaseLayout;
