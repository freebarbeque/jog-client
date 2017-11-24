import * as React from  'react';
import Dialog from 'material-ui/Dialog';

interface IDialogProps {
    open: boolean;
    children: any;
    autoScrollBodyContent?: boolean;
    autoDetectWindowHeight?: boolean;
    repositionOnUpdate?: boolean;
    overlayStyle?: any;
    style?: any;
    contentStyle?: any;
    actionsContainerStyle?: any;
}

export default (props: IDialogProps) => {
    const {children, ...restProps} = props;

    return (
        <Dialog {...restProps}>
            {props.children}
        </Dialog>
    );
}