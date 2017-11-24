import * as React from 'react';
import Dialog from 'src/web/components/Dialog';

interface IPDFPreviewProps {
    open: boolean;
}

export default (props: IPDFPreviewProps) => {
    return (
        <Dialog open={props.open}>
            111
        </Dialog>
    )
}