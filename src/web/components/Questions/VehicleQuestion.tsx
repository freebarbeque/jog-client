import * as _ from 'lodash'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import styled from 'styled-components'

import { vehicleQuestion } from 'jog-common/business/motor'
import { ICar, ISelectQuestionDescriptor } from 'jog-common/business/types'
import { push } from 'react-router-redux'

import { BLUE, WHITE } from '~/common/constants/palette'

import { IFirebaseUser, IReduxState } from '../../../common/types'
import SelectQuestion from './SelectQuestion'

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

// tslint:disable-next-line:no-var-requires
const FontAwesome: any = require('react-fontawesome')

interface IProps extends DispatchProp<any>, RouteComponentProps<{}> {
  cars: { [id: string]: ICar }
  user: IFirebaseUser
  value: string
  onChange: (id: string) => void
  error?: string
  index?: number
}

interface IState {
  value: string | null
}

class VehicleQuestion extends React.Component<IProps, IState> {
  public render() {
    const descriptor: ISelectQuestionDescriptor<any> = {
      ...vehicleQuestion,
      type: 'select',
      options: [
        ..._.values(this.props.cars).map((car: ICar) => {
          return {
            value: car.id,
            label: `${car.make} ${car.model}`,
          }
        }),
      ],
    }

    const value = this.props.value

    return (
      <SelectQuestion
        value={value}
        descriptor={descriptor}
        onChange={this.props.onChange}
        specialOptions={[{ label: 'Add new vehicle', value: 'new-car' }]}
        onSpecialOptionClick={this.handleSpecialOptionClick}
        error={this.props.error}
        index={this.props.index}
        renderAccessory={(o: { label: string; value: string }) => {
          return (
            <Accessories>
              <button onClick={() => this.onEditPress(o.value)}>
                <FontAwesome name="pencil" color={'white'} size={15} />
              </button>
              <button onClick={() => this.onDeletePress(o.value)}>
                <FontAwesome name="times" color={'white'} size={15} />
              </button>
            </Accessories>
          )
        }}
      />
    )
  }

  private onEditPress = (vehicleId: string) => {
    this.props.dispatch(push(`/app/tabs/markets/motor/vehicle/${vehicleId}`))
  }

  private onDeletePress = (vehicleId: string) => {
    // TODO
  }

  private handleSpecialOptionClick = (value: string) => {
    if (value === 'new-car') {
      this.props.dispatch(push('/app/tabs/markets/motor/vehicle'))
    }
  }
}

export default connect((state: IReduxState) => ({
  cars: state.markets.cars,
  user: state.auth.user,
}))(withRouter(VehicleQuestion))
