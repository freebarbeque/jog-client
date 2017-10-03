import { addressQuestion } from 'jog-common/business/motor'
import {
  IAddress,
  IBaseQuestionDescriptor,
  ISelectQuestionDescriptor,
} from 'jog-common/business/types'

import * as _ from 'lodash'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'

import { RouteComponentProps, withRouter } from 'react-router'
import { deleteAddressAction } from '~/common/store/markets'
import EditDeleteSelectAccessories from '~/web/components/Questions/EditDeleteSelectAccessories'
import { IReduxState } from '../../../common/types'
import SelectQuestion from './SelectQuestion'

// TODO: Why is the typing not working for AddressQuestion?
const Q = SelectQuestion as any

interface IProps {
  index?: number
  error?: string
  descriptor: IBaseQuestionDescriptor<any>
  value?: IAddress
  onChange?: (id: string, address: IAddress | null) => void
  onNew?: () => void
}

interface IConnectedProps
  extends IProps,
    DispatchProp<any>,
    RouteComponentProps<{ policyId?: string }> {
  addresses: { [id: string]: IAddress }
}

interface IState {
  value?: IAddress
}

class AddressQuestion extends React.Component<IConnectedProps, IState> {
  constructor(props) {
    super(props)
    const value = props.value
    this.state = {
      value: value ? value.id : null,
    }
  }

  public componentWillReceiveProps(props) {
    const value = props.value
    this.setState({
      value: value ? value.id : null,
    })
  }

  public render() {
    const addresses = _.values(this.props.addresses).filter(
      a => (a.name ? a.name.trim() : a.name),
    )

    const descriptor: ISelectQuestionDescriptor<any> = {
      ...addressQuestion,
      type: 'select',
      options: [
        ..._.values(addresses).map((a: IAddress) => {
          const value: string = a.id
          const label = `${a.name}`

          return {
            value,
            label,
          }
        }),
      ],
    }

    return (
      <Q
        value={this.props.value}
        descriptor={descriptor}
        onChange={this.onChange}
        specialOptions={[{ label: 'Add new address', value: 'new-address' }]}
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

  private onEditPress = (addressId: string) => {
    this.props.dispatch(
      push(
        `/app/tabs/policies/${this.props.match.params
          .policyId}/quotes/motor/address/${addressId}`,
      ),
    )
  }

  private onDeletePress = (addressId: string) => {
    this.props.dispatch(deleteAddressAction(addressId))
  }

  private onChange = (_id: string, value?: IAddress) => {
    this.setState({
      value,
    })
    const onChange = this.props.onChange
    if (onChange) {
      onChange(this.props.descriptor.id, value || null)
    }
  }

  private handleSpecialOptionClick = (value: string) => {
    if (value === 'new-address') {
      this.props.dispatch(
        push(
          `/app/tabs/policies/${this.props.match.params
            .policyId}/quotes/motor/address`,
        ),
      )
    }
  }
}

const ConnectedAddressQuestion: React.ComponentClass<IProps> = connect<
  {},
  {},
  IProps
>((state: IReduxState) => ({
  addresses: state.markets.addresses,
}))(withRouter(AddressQuestion))

export default ConnectedAddressQuestion
