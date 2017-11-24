import * as React from  'react';
import Dialog from 'material-ui/Dialog';

interface IDialogProps {
    open: boolean;
    children: any;
}

export default (props: IDialogProps) => {
    return (
        <Dialog open={props.open}>
            {props.children}
        </Dialog>
    );
}