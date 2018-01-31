import * as React from 'react';
import styled from 'styled-components';

class Section extends React.PureComponent<any, any> {
    render() {
        const { title, children, style } = this.props;

        return (
            <Container style={style}>
                {title && <Header>{title}</Header>}
                <Body>
                    {children}
                </Body>
            </Container>
        )
    }
}

const Container = styled.div`
    width: 100%;
    padding: 30px 50px 35px;
    box-shadow: 0 2px 4px rgba(51, 51, 51, 0.2);
    background-color: #FFF;
`;

const Header = styled.div`
    height: 42px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    background-color: #ECEDEF;
    color: #000;
`;

const Body = styled.div`
    
`;

export default Section;
