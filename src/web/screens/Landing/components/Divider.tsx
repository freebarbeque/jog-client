import * as React from 'react';
import styled from 'styled-components';
import {FOOTER_BACKGROUND_COLOR} from 'src/common/constants/palette';

const Divider  = (props: any) => (
  <div className={props.className} />
);

const StyledDivider = styled(Divider)`
  align-self: stretch;
  height: 1px;
  background-color: ${FOOTER_BACKGROUND_COLOR};
  opacity: 0.4;
`;

export default StyledDivider;