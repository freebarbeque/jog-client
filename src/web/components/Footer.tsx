import * as React from 'react';
import styled from 'styled-components';
import LinksColumn from '../screens/Landing/components/LinksColumn';
import IconButton from '../screens/Landing/components/IconButton';
import {FOOTER_BACKGROUND_COLOR} from 'src/common/constants/palette';
import {companyLinks, legalLinks} from 'src/common/constants/footerLinks';
import {TwitterIcon, FacebookIcon, LinkedinIcon} from 'src/web/images';

const Footer = (props: any) => (
  <div className={props.className}>
    <LinksContainer>
      <LinksColumn
        title="Our Company"
        links={companyLinks}
      />
      <LinksColumn
        title="Legal"
        links={legalLinks}
      />
    </LinksContainer>
    <SocialSection>
      <SectionTitle>
        Follow us
      </SectionTitle>
      <ButtonsContainer>
        <StyledIconButton
          icon={<FacebookIcon />}
          onClick={() => {console.log('facebookIcon clicked')}}
        />
        <StyledIconButton
          icon={<TwitterIcon />}
          onClick={() => {console.log('twitterIcon clicked')}}
        />
        <StyledIconButton
          icon={<LinkedinIcon />}
          onClick={() => {console.log('linkedinIcon clicked')}}
        />
      </ButtonsContainer>
    </SocialSection>
  </div>
);

const StyledFooter = styled(Footer)`
  background-color: ${FOOTER_BACKGROUND_COLOR};
  display: flex;
  justify-content: space-between;
  align-self: stretch;
  flex-basis: 190px;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 25px 45px 0 45px;
`;

const LinksContainer = styled.div`
  display: flex;
  align-self: stretch;
  & > div:first-child {
    margin-right: 70px;
  }
`;

const StyledIconButton = styled(IconButton)`
  border: none;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  background-color: transparent;
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  cursor: pointer;
  outline: none;
`;

const ButtonsContainer = styled.div`
  display: flex;
  & > button {
    margin-right: 15px;
    &:last-child {
      margin-right: 0;
    };
  };
`;

const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 5px;
`;

export default StyledFooter;