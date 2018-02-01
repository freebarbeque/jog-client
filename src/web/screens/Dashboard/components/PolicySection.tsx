import * as React from 'react';
import styled from 'styled-components';
import {SECTION_HEADER_BG_COLOR, SECTION_HEADER_COLOR} from 'src/common/constants/palette';
import {styledComponentWithProps} from 'src/common/utils/types';
import {EditIcon, DialogCross} from 'src/web/images';

interface ISectionProps {
  className?: string;
  title?: string;
  withEditButton?: boolean;
  onEditButtonClick?: any;
  withCloseButton?: boolean;
  onCloseButtonClick?: any;
}

interface IEditButtonProps {
  onClick?: any;
}

const Section: React.StatelessComponent<ISectionProps> = (props) => (
  <div className={props.className}>
    <SectionHeader>
      {props.title}
      {props.withEditButton && (
        <Button onClick={props.onEditButtonClick}>
          <EditIcon />
        </Button>
      )}
      {props.withCloseButton && (
        <Button onClick={props.onCloseButtonClick}>
          <DialogCross />
        </Button>
      )}
    </SectionHeader>
    <SectionContent>
      {props.children}
    </SectionContent>
  </div>
);

const StyledSection = styled(Section)`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  box-shadow: 0 2px 4px rgba(51, 51, 51, 0.2);
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
  padding: 0 10px 0 20px;
  flex: 0 0 48px;
  background-color: ${SECTION_HEADER_BG_COLOR};
  color: ${SECTION_HEADER_COLOR};
`;

const SectionContent = styled.div`
  background-color: #FFF;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  padding: 40px;
`;

const button = styledComponentWithProps<IEditButtonProps, HTMLButtonElement>(styled.button);

const Button = button`
  cursor: pointer;
  border: none;
  outline: none;
  background-color: transparent;
`;

export default StyledSection;
