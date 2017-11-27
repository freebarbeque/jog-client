import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import {Document} from 'react-pdf/build/entry.webpack';
import {Page} from 'react-pdf';
import {connect} from 'react-redux';
import {IReduxState} from '~/common/interfaces/store';
import {getPreviewDocument} from 'src/common/selectors/documents';
import {IDocument, IPendingDocument} from '~/common/interfaces/documents';
import {BLUE, DARK_GRAY, WHITE} from '~/common/constants/palette';
import styled from 'styled-components';
import {Cross} from 'src/web/images';

interface IPDFPreviewProps {
    open: boolean;
    document: Partial<IDocument & IPendingDocument>;
    onClose: () => void;
}

const Header = styled.div`
    height: 40px;
    background-color: ${DARK_GRAY};
    color: ${WHITE}!important;
    padding: 0 20px!important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px!important;
`;

const Button = styled.div`
    &:hover {
        cursor: pointer;
    }
`;

class PDFPreview extends React.Component<IPDFPreviewProps, {}> {
    render() {
        const header = (
            <Header>
                <div>{this.props.document && this.props.document.name}</div>
                <Button onClick={this.props.onClose}><Cross /></Button>
            </Header>
        )

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
                title={header}
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