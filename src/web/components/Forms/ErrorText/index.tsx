import * as React from 'react';
import styled from 'styled-components';
import {PINK} from 'src/common/constants/palette';

// language=SCSS prefix=dummy{ suffix=}
const ErrorText = styled.div`
  width: 100%;
  color: ${PINK};
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  text-align: right;
`;

export default ErrorText;
