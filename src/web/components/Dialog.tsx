import * as React from  'react';
import Dialog from 'material-ui/Dialog';

interface IDialogProps {
    open: boolean;
    children: any;
    autoScrollBodyContent?: boolean;
}

export default (props: IDialogProps) => {
    const {children, ...restProps} = props;

    return (
        <Dialog {...restProps}>
            {props.children}
        </Dialog>
    );
}