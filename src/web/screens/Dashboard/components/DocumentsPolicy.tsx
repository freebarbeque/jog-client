import * as React from 'react';
import styled from 'styled-components';
import PolicySection from './PolicySection';
import DocumentsDropzone from './DocumentsDropzone';
import FileCard from './FileCard';
import RoundedButton from 'src/web/components/RoundedButton';

interface IDocumentPolicyProps {
  className?: string;
}

const ButtonStyles = {
  width: '190px',
  height: '56px',
  borderRadius: '100px',
  alignSelf: 'center'
};

const DocumentsPolicy: React.StatelessComponent<IDocumentPolicyProps> = (props) => (
  <div className={props.className}>
    <PolicySection title="Uploaded Documents">
      <ContentWrapper>
        <FilesContainer>
          <FileCard fileName="Test asdf.pdf" onDeleteClick={() => console.log('delete document')} />
        </FilesContainer>
        <DocumentsDropzone />
        <RoundedButton
          label="Upload"
          style={ButtonStyles}
          onClick={() => console.log('upload files')}
        />
      </ContentWrapper>
    </PolicySection>
  </div>
);

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
    margin: 0 33px 25px 33px;
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

export default StyledDocumentsPolicy;