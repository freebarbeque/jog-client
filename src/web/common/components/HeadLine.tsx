import * as React from 'react';
import styled from 'styled-components';
import {BLUE} from 'src/common/constants/palette';
import ArrowButton from 'src/web/components/ArrowButton';
import Avatar from 'src/web/components/Avatar';
import {styledComponentWithProps} from 'src/common/utils/types';

interface ICurrentPolicyProps {
    className?: string;
    handleClick?: () => void;
    imageUrl?: string;
    secondaryText?: string;
    primaryText?: string;
    inverseStyling?: boolean;
}

class HeadLine extends React.PureComponent<ICurrentPolicyProps, any> {
    render() {
        const {inverseStyling} = this.props;

        return (
            <Container onClick={this.props.handleClick}>
                <ArrowButton position="left" width={11} height={16}/>
                <Avatar src={this.props.imageUrl}/>
                <TextContainer>
                    <PrimaryText inverseStyling={inverseStyling}>
                        {this.props.primaryText}
                    </PrimaryText>
                    <SecondaryText inverseStyling={inverseStyling}>
                        {this.props.secondaryText}
                    </SecondaryText>
                </TextContainer>
            </Container>
        );
    }
}

const Container = styled.div`
    display: flex;
    align-items: center;
    align-self: stretch;
    background-color: ${BLUE};
    height: 110px;
    flex-grow: 0;
    flex-shrink: 0;
    padding: 0 45px;
    cursor: pointer;

    & ${Avatar} {
        margin: 0 17px 0 3px;
    }
`;

const text = styledComponentWithProps<any, HTMLDivElement>(styled.div);

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #FFF;
  font-weight: 400;
`;

const PrimaryText = text`
  font-size: ${props => props.inverseStyling ? '22px' : '32px'};
  color: ${props => props.inverseStyling ? '#a5aaaf' : '#FFF'};
`;

const SecondaryText = text`
  font-size: ${props => props.inverseStyling ? '30px' : '24px'};
`;

export default HeadLine;