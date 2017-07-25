// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Picker from '../Picker'
import type { PickerOption } from '../Picker'
import type { Address, BaseQuestionDescriptor } from '../../../business/types'
import type { ReduxState } from '../../../common/types'
import QuestionField from './QuestionField'

type AddressQuestionProps = {
  index?: number,
  error?: string,
  descriptor: BaseQuestionDescriptor<*>,
  value?: Address,
  addresses?: { [string]: Address },
  onChange?: (id: string, address: Address | null) => void,
  onNew?: () => void,
}

type AddressQuestionSttate = {
  value: PickerOption | null,
}

class AddressQuestion extends Component {
  props: AddressQuestionProps
  state: AddressQuestionSttate

  constructor(props: AddressQuestionProps) {
    super(props)
    const value = props.value
    this.state = {
      value: value ? value.id : null,
    }
  }

  componentWillReceiveProps(props: AddressQuestionProps) {
    const value = props.value
    this.setState({
      value: value ? value.id : null,
    })
  }

  onChange = (opt: PickerOption) => {
    console.log('onChange', opt)
    this.setState({
      value: opt,
    })
    if (opt.value === '_new' && this.props.onNew) {
      this.props.onNew()
    } else {
      const onChange = this.props.onChange
      if (onChange) {
        const addresses = this.props.addresses
        const address = _.find(_.values(addresses), a => a.id === opt)
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

    console.log('options', options)

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

export default connect((state: ReduxState) => ({
  addresses: state.markets.addresses,
}))(AddressQuestion)
