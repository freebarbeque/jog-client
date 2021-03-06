import * as _ from 'lodash'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'

import { policyHolderQuestion } from 'jog-common/business/motor'
import { IPerson, ISelectQuestionDescriptor } from 'jog-common/business/types'
import { push } from 'react-router-redux'
import { deleteDriverAction } from '~/common/store/markets'
import EditDeleteSelectAccessories from '~/web/components/Questions/EditDeleteSelectAccessories'
import { IFirebaseUser, IReduxState } from '../../../common/types'
import SelectQuestion from './SelectQuestion'

interface IProps {
  drivers: { [id: string]: IPerson }
  user: IFirebaseUser
  value: string
  onChange: (id: string) => void
  onBlur?: () => void
  onFocus?: () => void
  error?: string
  index?: number
  policyId?: string
}

interface IConnectedProps extends IProps, DispatchProp<any> {}

class MainDriverQuestion extends React.Component<IConnectedProps, {}> {
  constructor(props: IConnectedProps) {
    super(props)
    const value = props.value
    this.state = {
      value,
    }
  }

  public render() {
    const descriptor: ISelectQuestionDescriptor<any> = {
      ...policyHolderQuestion,
      type: 'select',
      options: [
        ..._.values(this.props.drivers).map((d: IPerson) => {
          const value: string = d.id
          const label = `${d.firstName} ${d.lastName}`
          return {
            value,
            label,
          }
        }),
        {
          value: 'you',
          label: 'You',
        },
      ],
    }

    return (
      <SelectQuestion
        value={this.props.value}
        descriptor={descriptor}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        onFocus={this.props.onFocus}
        specialOptions={[{ label: 'Add new driver', value: 'new-driver' }]}
        onSpecialOptionClick={this.handleSpecialOptionClick}
        error={this.props.error}
        index={this.props.index}
        renderAccessory={(o: { label: string; value: string }) => {
          return (
            <EditDeleteSelectAccessories
              onDeletePress={() => this.onDeletePress(o.value)}
              onEditPress={() => this.onEditPress(o.value)}
            />
          )
        }}
      />
    )
  }

  private onEditPress = (driverId: string) => {
    this.props.dispatch(
      push(
        `/app/tabs/policies/${this.props
          .policyId}/quotes/motor/driver/${driverId}`,
      ),
    )
  }

  private onDeletePress = (driverId: string) => {
    this.props.dispatch(deleteDriverAction(driverId))
  }

  private handleSpecialOptionClick = (value: string) => {
    if (value === 'new-driver') {
      this.props.dispatch(
        push(`/app/tabs/policies/${this.props.policyId}/quotes/motor/driver`),
      )
    }
  }
}

const ConnectedMainDriverQuestion: React.ComponentClass<IProps> = connect<
  {},
  {},
  IProps
>((state: IReduxState) => ({
  drivers: state.markets.drivers,
  user: state.auth.user,
}))(MainDriverQuestion)

export default ConnectedMainDriverQuestion
