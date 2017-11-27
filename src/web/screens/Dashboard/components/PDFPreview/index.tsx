import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import {Document} from 'react-pdf/build/entry.webpack';
import {Page} from 'react-pdf';
import {IDocument, IPendingDocument} from '~/common/interfaces/documents';
import PDFHeader from './PDFHeader';
import {connect} from 'react-redux';
import {getPreviewDocument} from '~/common/selectors/documents';
import {IReduxState} from '~/common/interfaces/store';

interface IPDFPreviewProps {
    open: boolean;
    document: Partial<IDocument & IPendingDocument>;
    onClose: () => void;
}

interface IPDFPreviewState {
    numPages: number[];
}

class PDFPreview extends React.Component<IPDFPreviewProps, IPDFPreviewState> {
    constructor() {
        super();
        this.state = {numPages: []}
    }

    handleDocDownload = ({numPages}) => {
        const pages: number[] = [];
        for (let i = 1; i <= numPages; i++) {
            pages.push(i);
        }
        this.setState({numPages: pages})
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                autoScrollBodyContent
                autoDetectWindowHeight={false}
                repositionOnUpdate={false}
                contentStyle={{transform: '', height: 700}}
                style={{minHeight: 700}}
                actionsContainerStyle={{padding: 0}}
                overlayStyle={{padding: 0}}
                title={<PDFHeader name={this.props.document && this.props.document.name} onClose={this.props.onClose}/>}
            >
                <Document
                    file={this.props.document && this.props.document.file}
                    noData="No preview available"
                    onLoadSuccess={this.handleDocDownload}
                >
                    {this.state.numPages.map(p => <Page key={p} pageNumber={p}/>)}
                </Document>
            </Dialog>
        )
    }
}

const mapStateToProps = (state: IReduxState): Partial<IPDFPreviewProps> => ({
    document: getPreviewDocument(state),
})

export default connect(mapStateToProps, null)(PDFPreview);