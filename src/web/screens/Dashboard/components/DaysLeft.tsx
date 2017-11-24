import * as React from 'react';
import styled from 'styled-components';
import {BLUE, SECTION_HEADER_BG_COLOR} from 'src/common/constants/palette';

interface IDaysLeftProps {
  className?: string;
  days?: string | number;
}

const DaysLeft: React.StatelessComponent<IDaysLeftProps> = (props) => (
  <div className={props.className}>
    <Days>
      {props.days}
    </Days>
    <Text>
      {Number(props.days) === 1 ? `Day left` : `Days left`}
    </Text>
  </div>
);

const StyledDaysLeft = styled(DaysLeft)`
  display: flex;
  align-items: flex-end;
  padding: 0 0 12px;
  color: ${BLUE};
  border-bottom: 1px solid ${SECTION_HEADER_BG_COLOR};
`;

const Days = styled.div`
  font-size: 62px;
  line-height: 50px;
  margin-right: 12px;
`;

const Text = styled.div`
  font-size: 20px;
`;

export default StyledDaysLeft;