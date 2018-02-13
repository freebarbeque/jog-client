import styled from 'styled-components';
import {styledComponentWithProps} from 'src/common/utils/types';

import PolicySection from './PolicySection';
import OverviewField from './OverviewField';
import DaysLeft from './DaysLeft';

const divWithOnClick = styledComponentWithProps<{onClick?: any}, HTMLDivElement>(styled.div);
const div = styledComponentWithProps<{height?: number}, HTMLDivElement>(styled.div);

export const Content = div`
  display: flex;
  flex-wrap: wrap;
  align-self: stretch;
  flex: 1 0 ${props => `${props.height}px` || `auto`};
  align-content: space-between;
  padding: 10px;
  box-sizing: border-box;

  & > ${OverviewField}, ${DaysLeft} {
    flex: 0 0 calc(50% - 20px);
    margin: 0 20px 10px 0;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-self: stretch;
  justify-content: center;
  flex: 1 0;
  padding: 50px 40px;
`;

export const LeftSectionsContainer = styled.div`
  display: flex;
  flex: 0 1 calc(75% - 20px);
  flex-direction: column;
  align-self: stretch;
  margin-right: 20px;
  & > ${PolicySection}:first-child {
    margin-bottom: 35px;
  }
`;

export const RightSectionsContainer = styled.div`
  display: flex;
  flex-basis: 25%;
  min-width: 300px;
  flex-direction: column;
  align-self: flex-start;
  & > ${PolicySection}:first-child {
    margin-bottom: 35px;
  }
`;

export const ButtonModalWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    & > div:first-child {
        margin-right: 15px;
        background-color: transparent;
        border: 3px solid #50e3c2;
        height: 34px;
    }
`;

export const ButtonModal = divWithOnClick`
    height: 40px;
    background-color: #50e3c2;
    box-shadow: 0 4px 4px #ddd;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #131733;
    display: flex;
    flex: 1;
    cursor: pointer;
`;

export const TextModal = styled.div`
    color: #131733;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    height: 60%;
    font-size: 18px;
`;
