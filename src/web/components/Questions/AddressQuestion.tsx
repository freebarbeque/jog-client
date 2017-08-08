import * as _ from 'lodash'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'
import { addressQuestion } from '../../../business/motor'
import {
  Address,
  BaseQuestionDescriptor,
  SelectQuestionDescriptor,
} from '../../../business/types'
import { ReduxState } from '../../../common/types'
import { PickerOption } from '../Picker'
import Picker from '../Picker'
import QuestionField from './QuestionField'
import SelectQuestion from './SelectQuestion'

interface IProps {
  index?: number
  error?: string
  descriptor: BaseQuestionDescriptor<any>
  value?: Address
  onChange?: (id: string, address: Address | null) => void
  onNew?: () => void
}

interface ConnectedProps extends IProps, DispatchProp<any> {
  addresses: { [id: string]: Address }
}

interface State {
  value: string | null
}

class AddressQuestion extends React.Component<ConnectedProps, State> {
  constructor(props) {
    super(props)
    const value = props.value
    this.state = {
      value: value ? value.id : null,
    }
  }

  componentWillReceiveProps(props) {
    const value = props.value
    this.setState({
      value: value ? value.id : null,
    })
  }

  onChange = (opt: PickerOption) => {
    this.setState({
      value: opt.value,
    })
    if (opt.value === '_new' && this.props.onNew) {
      this.props.onNew()
    } else {
      const onChange = this.props.onChange
      if (onChange) {
        const addresses = this.props.addresses
        const address = _.find(_.values(addresses), a => a.id === opt.value)
        onChange(this.props.descriptor.id, address || null)
      }
    }
  }

  handleSpecialOptionClick = (value: string) => {
    if (value === 'new-address') {
      this.props.dispatch(push('/app/tabs/markets/motor/address'))
    }
  }

  render() {
    const addresses = _.values(this.props.addresses).filter(
      a => (a.name ? a.name.trim() : a.name),
    )

    const descriptor: SelectQuestionDescriptor<any> = {
      ...addressQuestion,
      type: 'select',
      options: [
        ..._.values(addresses).map((a: Address) => {
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
      <SelectQuestion
        value={this.props.value}
        descriptor={descriptor}
        onChange={this.props.onChange}
        specialOptions={[{ label: 'Add new address', value: 'new-address' }]}
        onSpecialOptionClick={this.handleSpecialOptionClick}
      />
    )
  }
}

const ConnectedAddressQuestion: React.ComponentClass<IProps> = connect<
  {},
  {},
  IProps
>((state: ReduxState) => ({
  addresses: state.markets.addresses,
}))(AddressQuestion)

export default ConnectedAddressQuestion
