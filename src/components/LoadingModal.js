/* @flow */

import React, { Component } from 'react'

import {
  Modal,
  View
} from 'react-native'

import { connect } from 'react-redux'

import Spinner from './Spinner'
import type { ReduxState } from '../types'

type LoadingModalProps = {
  text: string,
  loading: boolean,
};

class LoadingModal extends Component {
  props: LoadingModalProps

  render() {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.props.loading}
        onRequestClose={() => {}}
      >
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              borderRadius: 6,
              width: 240,
              height: 150,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Spinner text={this.props.text} />
          </View>
        </View>
      </Modal>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({ ...state.loading })

export default connect(mapStateToProps)(LoadingModal)
