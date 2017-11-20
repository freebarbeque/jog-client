import * as React from 'react';
import styled from 'styled-components';
import {BLUE, PINK} from 'src/common/constants/palette';

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

interface IDescriptionProps {
    button?: React.ReactElement<any>;
    className?: string;
}

const Description = (props: IDescriptionProps) => (
    <div className={props.className}>
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
  background-color: ${PINK};
  flex-shrink: 0;
  position: relative;
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