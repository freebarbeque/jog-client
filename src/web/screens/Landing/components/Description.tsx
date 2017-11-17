import * as React from 'react';
import styled from 'styled-components';
import {BLUE} from 'src/common/constants/palette';
import {PinkShape, GreyShape, BannerShape} from 'src/web/images';

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #FFF;
  font-weight: 500;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const BigTitle = styled.div`
  font-size: 48px;
  line-height: 48px;
  margin-bottom: 33px;
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
        <PinkShape />
        <TextContainer>
            <BigTitle>
                Your Insurance <br /> Memory
            </BigTitle>
            <SmallTitle>
                Store your policies
            </SmallTitle>
            <SmallTitle>
                Minimise your premiums
            </SmallTitle>
            {props.button || null}
        </TextContainer>
        <GreyShape />
        <BannerShape />
    </div>
);

const StyledDescription = styled(Description)`
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  height: 367px;
  background-color: ${BLUE};
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