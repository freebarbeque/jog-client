import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';

import {FOOTER_BACKGROUND_COLOR, WHITE, CREAM} from '~/common/constants/palette';
import {LeftArrow} from 'src/web/images';

interface IPureLayoutProps {
    children: any;
    description: {
        title: string;
        backTitle: string;
        backUrl: string;
        icon?: any;
    };
    push: (value: any) => void;
}

class PureLayout extends React.PureComponent<IPureLayoutProps, any> {
    render() {
        const { description: {title, backTitle, backUrl, icon: IconComponent} } = this.props;

        return (
            <Wrapper>
                <Header>
                    <BackWidget onClick={() => this.props.push(backUrl)}>
                        <LeftArrow />
                        <BackTitle>{backTitle}</BackTitle>
                    </BackWidget>
                    <Title>
                        {IconComponent && <TitleIcon><IconComponent /></TitleIcon>}
                        <TitleText>{title}</TitleText>
                    </Title>
                </Header>
                <Body>
                {this.props.children}
                </Body>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    align-self: stretch;
`;

const Header = styled.div`
    height: 60px;
    background-color: ${FOOTER_BACKGROUND_COLOR};
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    align-items: center;
    padding: 0 20px;
`;

const Body = styled.div`
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    align-self: stretch;
    background-color: ${CREAM};
    align-items: center;
    padding: 120px 40px;
`;

const BackWidget = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const BackTitle = styled.div`
    font-size: 18px;
`;

const TitleIcon = styled.div``;

const TitleText = styled.div`
    font-size: 24px;
`;

const Title = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    color: ${WHITE};
`;

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({
    push,
}, dispatch);

export default connect(null, mapDispatchToProps)(PureLayout) as any;
