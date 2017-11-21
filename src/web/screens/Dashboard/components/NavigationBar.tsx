import * as React from 'react';
import styled from 'styled-components';
import {NavLink, Redirect} from 'react-router-dom';
import {FOOTER_BACKGROUND_COLOR, DASHBOARD_INACTIVE_LINK_COLOR} from 'src/common/constants/palette';
import {locationToTitleAndLink} from 'src/common/constants/dashboard';
import {parseDashboardLocation} from 'src/common/utils/dashboard';

const Slash = (props: any) => (
  <div>
    &nbsp;/&nbsp;
  </div>
);

const NavigationBar = (props: { location: any, className?: string }) => (
  <div className={props.className}>
    {parseDashboardLocation(props.location, locationToTitleAndLink).map((l, i, arr) => (
      l ? (
        <LinkContainer key={i}>
          <NavLink
            to={l.to}
            isActive={(match, location) => i === arr.length - 1}
          >
            {l.title}
          </NavLink>
          {i !== arr.length - 1 && <Slash />}
        </LinkContainer>
      ) : <Redirect key={i} to="/app/dashboard" />
    ))}
  </div>
);

const StyledNavigationBar = styled(NavigationBar)`
  display: flex;
  align-items: center;
  align-self: stretch;
  flex-basis: 40px;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: ${FOOTER_BACKGROUND_COLOR};
  padding: 0 42px;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: ${DASHBOARD_INACTIVE_LINK_COLOR};
  
  & > a {
    color: ${DASHBOARD_INACTIVE_LINK_COLOR} !important;
    &.active, &.active:hover {
      color: white !important;
    }
  }
`;

export default StyledNavigationBar;