import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import PolicySection from './PolicySection';
import DocumentsDropzone from './DocumentsDropzone';
import FileCard from './FileCard';
import RoundedButton from 'src/web/components/RoundedButton';
import {IDocument, IPendingDocument} from 'src/common/interfaces/documents';
import {
    getPolicyDocuments, getPendingDocuments, getSubmissionError,
    getIsLoading
} from 'src/common/selectors/documents';
import {addPendingDocuments, removePendingDocument} from 'src/common/actions/documents';
import {openModal} from 'src/web/actions/page';
import {PDF_PREVIEW_MODAL} from '~/web/constants/documents';
import {isModalOpen} from '~/web/selectors/page';
import {injectSaga} from '~/common/utils/saga';
import {documentsFlow} from '~/common/sagas/documents';
import {uploadPendingDocuments, removeDocument} from 'src/common/actions/documents';
import ErrorText from 'src/web/components/Forms/ErrorText';
import {BLUE} from '~/common/constants/palette';
import PDFPreview from './PDFPreview';

interface IDocumentPolicyProps {
    className?: string;
    policyDocuments?: IDocument[];
    pendingDocuments?: IPendingDocument[];
    addPendingDocuments?: any;
    removePendingDocument?: any;
    openModal: ActionCreator<Action>;
    isPreviewOpen: boolean;
    uploadPendingDocuments: ActionCreator<Action>;
    removeDocument: ActionCreator<Action>;
    error: Error|null;
    isLoading: boolean;
    motorId: string;
}

const ButtonStyles = {
    width: '190px',
    height: '56px',
    borderRadius: '100px',
    alignSelf: 'center',
    fontSize: '18px',
};

const Notification = styled.div`
    height: 48px;
    background-color: ${BLUE};
    display: flex;
    align-items: center;
    padding-left: 20px;
    
    span {
        font-weight: bold;
        margin-right: 10px;
    }
`

class DocumentsPolicy extends React.Component<IDocumentPolicyProps, {}> {

    componentWillMount() {
        injectSaga(documentsFlow, this.props.motorId);
    }

    handleRemovePendingDocument(id: string) {
        return this.props.removePendingDocument(id);
    }

    render() {

        const {
            policyDocuments,
            pendingDocuments
        } = this.props;

        return (
            <div className={this.props.className}>
                <PolicySection title="Uploaded Documents">
                    {this.props.isLoading &&
                        <Notification>
                            <span>Document processing in progress</span>Your information will be onlineshortly
                        </Notification>
                    }
                    <ContentWrapper>
                        <FilesContainer>
                            {policyDocuments && policyDocuments.map((d, i) => {
                                const url = d.attachment.url.split('/');
                                return (
                                    <FileCard
                                        key={i}
                                        fileName={url[url.length - 1]}
                                        onDeleteClick={() => this.props.removeDocument(d.id)}
                                        onPreviewClick={() => this.props.openModal(PDF_PREVIEW_MODAL)}
                                    />
                                )
                            })}
                            {pendingDocuments && pendingDocuments.map((d, i) => (
                                <FileCard
                                    key={i}
                                    fileName={d.file.name}
                                    onDeleteClick={() => this.handleRemovePendingDocument(d.pendingId)}
                                    onPreviewClick={() => this.props.openModal(PDF_PREVIEW_MODAL)}
                                />
                            ))}
                        </FilesContainer>
                        <DocumentsDropzone onDrop={this.props.addPendingDocuments}/>
                        {this.props.error ?
                            <ErrorText>
                                {this.props.error.message}
                            </ErrorText>
                            : null
                        }
                        <RoundedButton
                            label="Upload"
                            style={ButtonStyles}
                            onClick={() => this.props.uploadPendingDocuments()}
                            disabled={this.props.isLoading}
                        />
                    </ContentWrapper>
                </PolicySection>
                {this.props.pendingDocuments && this.props.pendingDocuments.length ?
                    <PDFPreview open={this.props.isPreviewOpen} document={this.props.pendingDocuments[0].file}/>
                    : null
                }
            </div>
        );
    }
}

const StyledDocumentsPolicy = styled(DocumentsPolicy)`
  display: flex;
  flex: 1 0 auto;
  align-self: stretch;
  padding: 50px 43px 135px 43px;
`;

const FilesContainer = styled.div`
  display: flex;
  align-self: stretch;
  flex-wrap: wrap;
  flex: 1 0 auto;
  margin-bottom: 15px;
  
  & > ${FileCard} {
    margin: 0 0 25px 0;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
  align-self: stretch;
  flex-direction: column;
  padding: 26px 53px 40px 53px;
  & > ${DocumentsDropzone} {
    margin-bottom: 25px;
  }
`;

const isPreviewModalOpen = isModalOpen(PDF_PREVIEW_MODAL);

const mapStateToProps = (state: any) => ({
    policyDocuments: getPolicyDocuments(state),
    pendingDocuments: getPendingDocuments(state),
    isPreviewOpen: isPreviewModalOpen(state),
    error: getSubmissionError(state),
    isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    addPendingDocuments,
    removePendingDocument,
    openModal,
    uploadPendingDocuments,
    removeDocument,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StyledDocumentsPolicy);