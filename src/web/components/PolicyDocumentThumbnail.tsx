import * as firebase from 'firebase'
import * as $ from 'jquery'
import * as React from 'react'
import styled from 'styled-components'

import { BLUE } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'
import { IPolicyDocument } from '../../common/types'
import Button from '../components/Button'
import FileIcon from './FileIcon'

interface IProps {
  document: IPolicyDocument
  style?: any
}

// language=SCSS prefix=dummy{ suffix=}
const Container = Button.extend`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

// language=SCSS prefix=dummy{ suffix=}
const Thumbnail = styled.div`
  height: 97px;
  width: 77px;
  border-radius: 4px;
  box-shadow: 0 0 3px 2px rgba(121, 126, 154, 0.4);
  display: flex;
  margin-bottom: ${MARGIN.base}px;
  background-color: rgb(246, 246, 246);
  justify-content: center;
  align-items: center;
`

// language=SCSS prefix=dummy{ suffix=}
const Name = styled.div`
  color: ${BLUE};
  overflow: hidden;
  font-size: 11px;
  margin-left: ${MARGIN.large}px;
  margin-right: ${MARGIN.large}px;
`

// language=SCSS prefix=dummy{ suffix=}
const IconContainer = styled.div`
  height: 50%;
  width: 50%;
`

export default class PolicyDocumentThumbnail extends React.Component<IProps> {
  public render() {
    return (
      <Container style={this.props.style || {}} onClick={this.handleClick}>
        <Thumbnail>
          <IconContainer>
            <FileIcon extension={this.props.document.extension} />
          </IconContainer>
        </Thumbnail>
        <Name>
          {this.props.document.name}
        </Name>
      </Container>
    )
  }

  private getDocument() {
    const document = this.props.document

    const path = document.image
    const ref = firebase.storage().ref(path)
    return ref.getDownloadURL()
  }

  private handleClick = () => {
    this.getDocument().then(url => {
      $('<a>').attr('href', url)[0].click()
    })
  }
}
