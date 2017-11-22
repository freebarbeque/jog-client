import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PolicySection from './PolicySection';
import DocumentsDropzone from './DocumentsDropzone';
import FileCard from './FileCard';
import RoundedButton from 'src/web/components/RoundedButton';
import {IDocument} from 'src/common/interfaces/documents';
import {getDocuments} from 'src/common/selectors/documents';
import {addPendingDocuments, removePendingDocument} from 'src/common/actions/documents';

interface IDocumentPolicyProps {
  className?: string;
  documents: IDocument[];
  addPendingDocuments?: any;
  removePendingDocument?: any;
}

const ButtonStyles = {
  width: '190px',
  height: '56px',
  borderRadius: '100px',
  alignSelf: 'center'
};

class DocumentsPolicy extends React.Component<IDocumentPolicyProps, {}> {

  handleRemoveDocument(documentId: string | undefined, documentIndex: number) {
    return documentId ? () => console.log('can not remove document') : this.props.removePendingDocument(documentIndex);
  }

  render() {
    return (
      <div className={this.props.className}>
        <PolicySection title="Uploaded Documents">
          <ContentWrapper>
            {this.props.documents.length && (
              <FilesContainer>
                {this.props.documents.map((d, i) => (
                  <FileCard key={i} fileName={d.name} onDeleteClick={() => this.handleRemoveDocument(d.id, i)} />
                ))}
              </FilesContainer>
            )}
            <DocumentsDropzone onDrop={this.props.addPendingDocuments} />
            <RoundedButton
              label="Upload"
              style={ButtonStyles}
              onClick={() => console.log('upload files')}
            />
          </ContentWrapper>
        </PolicySection>
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

const mapStateToProps = (state: any) => ({
  documents: getDocuments(state),
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  addPendingDocuments,
  removePendingDocument,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StyledDocumentsPolicy);