import * as React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {FOOTER_BACKGROUND_COLOR, DASHBOARD_INACTIVE_LINK_COLOR} from 'src/common/constants/palette';
import {locationToTitleAndLink} from 'src/common/constants/dashboard';

const parseDashboardLocation = (location: string) => {
  const splittedLocation = location.slice(1).split('/');
  return splittedLocation.map(location => locationToTitleAndLink[location]);
};

const Slash = (props: any) => (
  <div>
    &nbsp;/&nbsp;
  </div>
);

const NavigationBar = (props: {location: any, className?: string}) => (
  <div className={props.className}>
    {parseDashboardLocation(props.location).map((l, i, arr) => (
      <LinkContainer key={i}>
        <NavLink
          to={l.to}
          isActive={(match, location) => i === arr.length - 1}
        >
          {l.title}
        </NavLink>
        {i !== arr.length - 1 && <Slash />}
      </LinkContainer>
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