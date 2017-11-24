import * as React from 'react';
import styled from 'styled-components';
import {PINK} from 'src/common/constants/palette';
import {styledComponentWithProps} from 'src/common/utils/types';
import {Cross} from 'src/web/images';

interface INotificationProps {
  className?: string;
  notificationText?: string;
  onCloseButtonClick?: any;
}

interface IButtonProps {
  onClick?: any;
}

const Notification: React.StatelessComponent<INotificationProps> = (props) => (
  <div className={props.className}>
    <Title>
      {props.notificationText}
    </Title>
    <CloseButton onClick={props.onCloseButtonClick}>
      <Cross />
    </CloseButton>
  </div>
);

const StyledNotification = styled(Notification)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 42px;
  width: calc(100% - (42px * 2));
  background-color: ${PINK};
  z-index: 1;
  height: 48px;
  border-radius: 4px;
  padding: 0 10px 0 20px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 16px;
  color: #FFF;
  font-weight: 400;
  line-height: 18px;
`;

const button = styledComponentWithProps<IButtonProps, HTMLButtonElement>(styled.button);

const CloseButton = button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

export default StyledNotification;