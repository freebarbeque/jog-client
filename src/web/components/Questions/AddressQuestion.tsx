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
import { IReduxState } from '../../../common/types'
import { IPickerOption } from '../Picker'
import Picker from '../Picker'
import QuestionField from './QuestionField'
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

interface IConnectedProps extends IProps, DispatchProp<any> {
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
        onChange={this.props.onChange}
        specialOptions={[{ label: 'Add new address', value: 'new-address' }]}
        onSpecialOptionClick={this.handleSpecialOptionClick}
        error={this.props.error}
        index={this.props.index}
      />
    )
  }

  private onChange = (id: string, value?: IAddress) => {
    this.setState({
      value,
    })
    const onChange = this.props.onChange
    if (onChange) {
      const addresses = this.props.addresses
      onChange(this.props.descriptor.id, value || null)
    }
  }

  private handleSpecialOptionClick = (value: string) => {
    if (value === 'new-address') {
      this.props.dispatch(push('/app/tabs/markets/motor/address'))
    }
  }
}

const ConnectedAddressQuestion: React.ComponentClass<IProps> = connect<
  {},
  {},
  IProps
>((state: IReduxState) => ({
  addresses: state.markets.addresses,
}))(AddressQuestion)

export default ConnectedAddressQuestion
