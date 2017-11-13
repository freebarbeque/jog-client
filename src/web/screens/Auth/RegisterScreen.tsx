import * as React from 'react'
import { Link } from 'react-router-dom'
import Title from 'src/web/components/Title';
import FlexCentredContainer from 'src/web/components/FlexCentredContainer';

import { NAVIGATION_BAR_HEIGHT } from 'src/web/constants/style';

class RegisterScreen extends React.Component<{}, {}> {
  public render() {
    return (
      <FlexCentredContainer style={{ paddingBottom: NAVIGATION_BAR_HEIGHT }}>
        <div>
          <Title>Register</Title>

        </div>
      </FlexCentredContainer>
    )
  }
}

export default RegisterScreen;
