/* @flow */

import React, { Component } from 'react'

import { Modal, TouchableWithoutFeedback, View } from 'react-native'

import { connect } from 'react-redux'
import FadeInView from 'react-native-fade-in-view'

import type { Dispatch, ReduxState } from 'jog/src/common/types'
import { clearError } from 'jog/src/common/store/errors/actions'
import { BLUE } from 'jog/src/common/constants/palette'
import { MARGIN } from 'jog/src/common/constants/style'
import { finishLoading } from 'jog/src/common/store/loading/actions'

import { Warning } from './images'
import Text from './Text'
import Spinner from './Spinner'

type ActionModalProps = {
  loading: {
    text: string,
    loading: boolean,
  },
  errors: {
    error: boolean,
    text: string,
  },
  dispatch: Dispatch,
}

class ActionModal extends Component {
  props: ActionModalProps

  handlePress = () => {
    if (this.props.errors.error) {
      this.props.dispatch(finishLoading())
      this.props.dispatch(clearError())
    }
  }

  render() {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.props.loading.loading || this.props.errors.error}
        onRequestClose={() => {}}
      >
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: 6,
                width: 240,
                height: 150,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {this.props.errors.error
                ? <FadeInView
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    duration={300}
                  >
                    <Warning />
                    <Text
                      style={{
                        color: BLUE,
                        marginTop: MARGIN.large,
                        textAlign: 'center',
                      }}
                    >
                      {this.props.errors.text}
                    </Text>
                  </FadeInView>
                : <FadeInView
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    duration={300}
                  >
                    <Spinner
                      text={
                        this.props.errors.error
                          ? this.props.errors.text
                          : this.props.loading.text
                      }
                    />
                  </FadeInView>}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  loading: state.loading,
  errors: state.errors,
})

export default connect(mapStateToProps)(ActionModal)
