import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import { Document } from 'react-pdf/build/entry.webpack';
import { Page } from 'react-pdf';

interface IPDFPreviewProps {
    open: boolean;
    document: File;
}

const PDFPreview = (props: IPDFPreviewProps) => {
    return (
        <Dialog
            open={props.open}
            autoScrollBodyContent
            autoDetectWindowHeight={false}
            repositionOnUpdate={false}
            contentStyle={{transform: '', height: 700}}
            actionsContainerStyle={{padding: 0}}
            overlayStyle={{padding: 0}}
        >
            <Document file={props.document}>
                <Page pageNumber={1}/>
            </Document>
        </Dialog>
    )
}

export default PDFPreview;