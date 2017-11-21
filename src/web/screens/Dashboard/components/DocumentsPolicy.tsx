import * as React from 'react';
import styled from 'styled-components';
import PolicySection from './PolicySection';

interface IDocumentPolicyProps {
  className?: string;
}

const DocumentsPolicy: React.StatelessComponent<IDocumentPolicyProps> = (props) => (
  <div className={props.className}>
    <PolicySection title="Uploaded Documents">

    </PolicySection>
  </div>
);

const StyledDocumentsPolicy = styled(DocumentsPolicy)`
  display: flex;
  flex: 1;
  align-self: stretch;
  padding: 50px 43px 135px 43px;
`;

export default StyledDocumentsPolicy;

