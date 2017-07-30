import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import * as _ from 'lodash'
import Picker from '../Picker'
import { PickerOption } from '../Picker'
import { Address, BaseQuestionDescriptor } from '../../../business/types'
import { ReduxState } from '../../../common/types'
import QuestionField from './QuestionField'

interface Props {
  index?: number,
  error?: string,
  descriptor: BaseQuestionDescriptor<any>,
  value?: Address,
  onChange?: (id: string, address: Address | null) => void,
  onNew?: () => void,
}

interface ConnectedProps extends Props, DispatchProp<any> {
  addresses: { [id: string]: Address }
}

interface State {
  value: string | null,
}

class AddressQuestion extends React.Component<ConnectedProps, State>  {
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

  render() {
    const addresses = _.values(this.props.addresses)

    const options = [
      ..._.map(addresses, (address: Address) => {
        const label = address.name
        const value = address.id
        return {
          label,
          value,
        }
      }),
      {
        label: 'New Address',
        value: '_new',
      },
    ]

    return (
      <QuestionField
        descriptor={this.props.descriptor}
        index={this.props.index}
        error={this.props.error}
      >
        <Picker
          className="picker"
          name="insurer"
          onChange={this.onChange}
          value={this.state.value}
          placeholder="Address"
          options={options}
        />
      </QuestionField>
    )
  }
}

// TODO: const ConnectedAddressQuestion: React.ComponentClass<Props>
const ConnectedAddressQuestion: any
 = connect((state: ReduxState) => ({ addresses: state.markets.addresses}))(AddressQuestion)

export default ConnectedAddressQuestion
