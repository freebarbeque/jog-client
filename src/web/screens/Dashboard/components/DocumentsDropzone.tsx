import * as React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import {SECTION_HEADER_BG_COLOR, DROPZONE_COLOR} from 'src/common/constants/palette';

interface IDocumentsDropzoneProps {
  className?: string;
}

interface IDocumentsDropzoneState {
  files: any[];
}

class DocumentsDropzone extends React.Component<IDocumentsDropzoneProps, IDocumentsDropzoneState> {
  constructor() {
    super();
    this.state = {files: []}
  }

  handleDrop = (droppedFiles: any[]) => {
    this.setState({
      files: this.state.files.concat(...droppedFiles),
    });
  };

  render() {
    console.log(this.state.files);
    return (
      <div className={this.props.className}>
        <Dropzone
          accept="application/pdf"
          className="dz"
          acceptClassName="dz-acceptable"
          rejectClassName="dz-rejectable"
          activeClassName="dz-active"
          disabledClassName="dz-disabled"
          onDrop={this.handleDrop}
          disablePreview
        >
          <div>{`Drag & drop your policy or click to choose a file.`}</div>
        </Dropzone>
      </div>
    );
  }
}

const StyledDocumentsDropzone = styled(DocumentsDropzone)`
  & .dz {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    height: 175px;
    border: 2px dashed ${SECTION_HEADER_BG_COLOR};
    background-color: #FFF;
    cursor: pointer;
    color: ${DROPZONE_COLOR};
    
    &.dz-acceptable {
      border: 2px solid green;
    }
    
    &.dz-rejectable {
      border: 2px solid red;
    }
  }
`;

export default StyledDocumentsDropzone;