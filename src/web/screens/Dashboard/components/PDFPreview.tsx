import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import {Document} from 'react-pdf/build/entry.webpack';
import {Page} from 'react-pdf';
import {connect} from 'react-redux';
import {IReduxState} from '~/common/interfaces/store';
import {getPreviewDocument} from 'src/common/selectors/documents';
import {IDocument, IPendingDocument} from '~/common/interfaces/documents';
import {BLUE, WHITE} from '~/common/constants/palette';
import styled from 'styled-components';

interface IPDFPreviewProps {
    open: boolean;
    document: Partial<IDocument & IPendingDocument>;
}

const Header = styled.div`
    height: 40px;
    background-color: ${BLUE};
    color: ${WHITE}!important;
    padding: 0 10px!important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px!important;
`;

class PDFPreview extends React.Component<IPDFPreviewProps, {}> {
    render() {
        return (
            <Dialog
                open={this.props.open}
                autoScrollBodyContent
                autoDetectWindowHeight={false}
                repositionOnUpdate={false}
                contentStyle={{transform: '', height: 700}}
                actionsContainerStyle={{padding: 0}}
                overlayStyle={{padding: 0}}
                title={<Header>{this.props.document && this.props.document.name}</Header>}
            >
                <div style={{height: 10}}/>
                <Document file={this.props.document && this.props.document.file} noData="No preview available">
                    <Page pageNumber={1}/>
                </Document>
            </Dialog>
        )
    }
}

const mapStateToProps = (state: IReduxState): Partial<IPDFPreviewProps> => ({
    document: getPreviewDocument(state),
})

export default connect(mapStateToProps, null)(PDFPreview);