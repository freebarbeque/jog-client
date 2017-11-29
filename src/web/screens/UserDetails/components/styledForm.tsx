import * as React from 'react';
import styled from 'styled-components';

export default (form: React.StatelessComponent<any>) => styled(form)`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-self: stretch;
  background-color: #FFF;
  padding: 40px 50px 35px;
  box-shadow: 0 2px 4px rgba(51, 51, 51, 0.2);
`;
