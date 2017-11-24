import * as React from 'react';
import styled from 'styled-components';
import {
  BLUE,
  FOOTER_BACKGROUND_COLOR,
  SECTION_HEADER_BG_COLOR,
} from 'src/common/constants/palette';

interface IOverviewFieldProps {
  className?: string;
  title?: string;
  value?: string | number;
  placeholder?: string | number;
  underline?: 'dashed' | 'solid';
  width?: string;
}

const OverviewField: React.StatelessComponent<IOverviewFieldProps> = (props) => (
  <div className={props.className}>
    <Title>{props.title}</Title>
    <FieldValue>{props.value || '-'}</FieldValue>
  </div>
);

const Title = styled.div`
  align-self: stretch;
  font-size: 14px;
  color: ${FOOTER_BACKGROUND_COLOR};
`;

const FieldValue = styled.div`
  font-size: 20px;
  margin: 12px 0;
`;

const StyledOverviewField = styled(OverviewField)`
  display: flex;
  flex-direction: column;
  border-bottom: 1px ${props => props.underline || 'solid'} ${SECTION_HEADER_BG_COLOR};
  flex: 1 0 ${props => props.width || '50%'};
  
  & ${FieldValue} {
    color: ${BLUE};
  }
`;

export default StyledOverviewField;