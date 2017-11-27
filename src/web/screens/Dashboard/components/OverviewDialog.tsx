import * as React from 'react';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';

interface IOverviewDialogProps {
  className?: string;
  open: boolean;
  onRequestClose: any;
}

const OverviewDialog: React.StatelessComponent<IOverviewDialogProps> = (props) => (
  <Dialog
    className={props.className}
    open={props.open}
    overlayClassName="overview-dialog-overlay"
    paperClassName="overview-dialog-paper"
    onRequestClose={props.onRequestClose}
  >
    {props.children}
  </Dialog>
);

const StyledOverviewDialog = styled(OverviewDialog)`
  & .overview-dialog-overlay {
    background-color: rgba(102, 107, 127, 0.7) !important;
  }
  
  & .overview-dialog-paper {
    box-shadow: 0 2px 4px rgba(51, 51, 51, 0.2) !important;
  }
`;

export default StyledOverviewDialog;