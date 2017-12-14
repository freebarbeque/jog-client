import * as React from 'react';
import styled from 'styled-components';
import {BLUE, PINK, WHITE} from 'src/common/constants/palette';
import ArrowButton from 'src/web/components/ArrowButton';

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  color: #FFF;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const BigTitle = styled.div`
  font-size: 42px;
  line-height: 42px;
`;

const SmallTitle = styled.div`
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
    margin: 0 10px;
`;

const PlusButton = styled.div`
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background-color: ${WHITE};
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 64px;
    font-weight: 200;
    
    &:hover {
        cursor: pointer;
    }
`;

interface IDescriptionProps {
    button?: React.ReactElement<any>;
    className?: string;
    onBackArrowClick?: () => void;
}

const Description = (props: IDescriptionProps) => (
    <div className={props.className}>
        <ArrowButton onClick={props.onBackArrowClick} position="left" width={11} height={16}/>
        <ButtonContainer>
            <PlusButton>
                +
            </PlusButton>
        </ButtonContainer>
        <TextContainer>
            <BigTitle>
                New Policy
            </BigTitle>
            <SmallTitle>
                Let's get you set up
            </SmallTitle>
        </TextContainer>
    </div>
);

const StyledDescription = styled(Description)`
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: start;
  height: 160px;
  background-color: ${BLUE};
  flex-shrink: 0;
  position: relative;
  padding: 0 25px;
  
  & > .pink-shape-img {
    position: absolute;
    bottom: 0;
    left: 0;
  };
  
  & > .grey-shape-img, .banner-shape-img {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

export default StyledDescription;