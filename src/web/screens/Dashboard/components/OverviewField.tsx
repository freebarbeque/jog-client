import * as React from 'react';
import styled from 'styled-components';
import {
  BLUE,
  FOOTER_BACKGROUND_COLOR,
  SECTION_HEADER_BG_COLOR,
  FIELD_GRAY_COLOR,
} from 'src/common/constants/palette';

interface IOverviewFieldProps {
  className?: string;
  title?: string;
  value?: string | number;
  placeholder?: string | number;
  underline?: 'dashed' | 'solid';
  width?: string;
  gray?: boolean;
}

const OverviewField: React.StatelessComponent<IOverviewFieldProps> = (props) => (
  <div className={props.className}>
    <Title>{props.title}</Title>
    <FieldValue>{props.value !== undefined ? props.value : '-'}</FieldValue>
  </div>
);

const Title = styled.div`
  align-self: stretch;
  font-size: 14px;
  color: ${FOOTER_BACKGROUND_COLOR};
`;

const FieldValue = styled.div`
  font-size: 20px;
  margin: 8px 0 12px;
`;

const StyledOverviewField = styled(OverviewField)`
  display: flex;
  flex-direction: column;
  border-bottom:  ${props => props.underline ? props.underline === 'solid' ? '1px solid' : '2px dashed' : '1px solid'} ${SECTION_HEADER_BG_COLOR};
  flex: 1 0 ${props => props.width || '50%'};

  & ${FieldValue} {
    color: ${props => props.gray ? FIELD_GRAY_COLOR : BLUE};
  }
`;

export default StyledOverviewField;
