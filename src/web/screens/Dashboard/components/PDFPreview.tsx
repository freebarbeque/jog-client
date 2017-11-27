import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import {Document} from 'react-pdf/build/entry.webpack';
import {Page} from 'react-pdf';
import {connect} from 'react-redux';
import {IReduxState} from '~/common/interfaces/store';
import {getPreviewDocument} from 'src/common/selectors/documents';
import {IDocument, IPendingDocument} from '~/common/interfaces/documents';

interface IPDFPreviewProps {
    open: boolean;
    document: Partial<IDocument & IPendingDocument>;
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
            <Document file={props.document && props.document.file}>
                <Page pageNumber={1}/>
            </Document>
        </Dialog>
    )
}

const mapStateToProps = (state: IReduxState): Partial<IPDFPreviewProps> => ({
    document: getPreviewDocument(state),
})

export default connect(mapStateToProps, null)(PDFPreview);