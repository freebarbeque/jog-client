import * as React from 'react';
import styled from 'styled-components';
import {PINK, FOOTER_BACKGROUND_COLOR} from 'src/common/constants/palette';

interface IBenefitProps {
  className?: string;
  icon?: JSX.Element;
  title: string;
  titleSolution?: string;
  description?: string;
}

class Benefit extends React.Component<IBenefitProps,{}> {
  render() {
    return (
      <div className={this.props.className}>
        <IconContainer>
          {this.props.icon}
        </IconContainer>
        <Title>
          {this.props.title.toUpperCase()}
        </Title>
        <TitleSolution>
          {this.props.titleSolution}
        </TitleSolution>
        <Description>
          {this.props.description}
        </Description>
      </div>
    );
  }
}

const StyledBenefit = styled(Benefit)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-basis: 150px;
  flex-grow: 0;
  flex-shrink: 0;
  margin-bottom: 15px;
`;

const Title = styled.div`
  color: ${PINK};
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  margin-bottom: 10px;
  text-align: center;
`;

const TitleSolution = styled.div`
  color: ${FOOTER_BACKGROUND_COLOR};
  font-size: 20px;
  font-weight: 500;
  line-height: 25px;
  margin-bottom: 12px;
  width: 158px;
  text-align: center;
`;

const Description = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  width: 240px;
  text-align: center;
  color: ${FOOTER_BACKGROUND_COLOR};
`;

export default StyledBenefit;