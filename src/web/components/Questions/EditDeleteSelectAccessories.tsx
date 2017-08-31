import * as React from 'react'
import styled from 'styled-components'
import { BLUE, WHITE } from '~/common/constants/palette'

// tslint:disable-next-line:no-var-requires
const FontAwesome: any = require('react-fontawesome')

const Accessories = styled.div`
  display: flex;
  flex-direction: row;

  button {
    background-color: ${BLUE};
    border: none;
    border-radius: 100px;
    color: ${WHITE};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity .20s ease-in-out;
    height: 23px;
    width: 23px;
    margin-right: 3px;

    &:last-child {
      margin-right: 0 !important;
    }

    &:hover {
      opacity: 0.8;
    }

    .fa {
      position: relative;
      top: 1px;
    }
  }
`

interface IProps {
  onEditPress: () => void
  onDeletePress: () => void
}

export default class EditDeleteSelectAccessories extends React.Component<
  IProps
> {
  public render() {
    return (
      <Accessories>
        <button onClick={this.props.onEditPress}>
          <FontAwesome name="pencil" color={'white'} size={15} />
        </button>
        <button onClick={this.props.onDeletePress}>
          <FontAwesome name="times" color={'white'} size={15} />
        </button>
      </Accessories>
    )
  }
}
