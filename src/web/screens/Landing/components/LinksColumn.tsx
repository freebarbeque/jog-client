import * as React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {LIGHT_GREY} from 'src/common/constants/palette';
import {ILink} from 'src/common/constants/footerLinks';

interface ILinksColumnProps {
  links: ILink[];
  title: string;
  className?: string;
}

const LinksColumn = (props: ILinksColumnProps) => (
  <div className={props.className}>
    <Title>
      {props.title}
    </Title>
    {props.links.map((l, i) => (
      <Link key={i} to={l.to}>
        {l.title}
      </Link>
    ))}
  </div>
);

const StyledLinksColumn = styled(LinksColumn)`
  display: flex;
  flex-direction: column;
  & > a {
    margin-bottom: 10px;
    color: ${LIGHT_GREY} !important;
  }
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: #FFF;
  margin-bottom: 10px;
`;

export default StyledLinksColumn;