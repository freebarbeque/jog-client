import * as React from 'react';
import styled from 'styled-components';
import {FOOTER_BACKGROUND_COLOR} from 'src/common/constants/palette';
import SignUpForm from './SignUpForm';
import SocialSignInButton from './SocialSignInButton';

const SignUpSection = (props: any) => (
  <div className={props.className}>
    <Title>
      Sign me up
    </Title>
    <TitleDescription>
      Create an account, start bringing your premiums down today
    </TitleDescription>
    <SignUpForm form="signUp" onSubmit={(values) => console.log(values)} />
    <Text>
      OR
    </Text>
    <SocialSignInButton title="log in with facebook" />
  </div>
);

const StyledSignUpSection = styled(SignUpSection)`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${FOOTER_BACKGROUND_COLOR};
  font-weight: 400;
  padding: 0 50px;
  & > button:last-child {
    margin-bottom: 45px;
  }
`;

const Title = styled.div`
  font-size: 36px;
  line-height: 40px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const TitleDescription = styled.div`
  font-size: 20px;
  line-height: 22px;
  margin-bottom: 30px;
`;

const Text = styled.div`
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 20px;
`;

export default StyledSignUpSection;
