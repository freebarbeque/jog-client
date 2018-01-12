import * as React from 'react';
import styled from 'styled-components';

interface IBoxContainerProps {
    title?: string;
    children: any;
    containerStyles?: any;
}

export default class BoxContainer extends React.PureComponent<IBoxContainerProps, any> {
    render() {
        const { title, children, containerStyles } = this.props;

        return (
            <Container style={containerStyles}>
                <Header>
                    <Title>{title}</Title>
                </Header>
                <Body>
                    {children}
                </Body>
            </Container>
        )
    }
}

const Header = styled.div`
    margin-bottom: 15px;
`;

const Title = styled.div`
    color: #000;
    text-align: center;
    font-size: 20px;
    font-family: 'Work Sans';
`;

const Body = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 40%;
  background-color: #FFF;
  padding: 20px 50px 35px;
  box-shadow: 0 2px 4px rgba(51, 51, 51, 0.2);
`;
