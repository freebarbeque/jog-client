import * as React from 'react'

import { Modal, TouchableWithoutFeedback, View } from 'react-native'

import FadeInView from 'react-native-fade-in-view'
import { connect } from 'react-redux'

import { BLUE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import { clearError } from '~/common/store/errors/actions'
import { finishLoading } from '~/common/store/loading/actions'
import { Dispatch, IReduxState } from '~/common/types'

import { Warning } from './images'
import Spinner from './Spinner'
import Text from './Text'

interface IActionModalProps {
  loading: {
    text: string
    loading: boolean
  }
  errors: {
    error: boolean
    text: string
  }
  dispatch: Dispatch
}

class ActionModal extends React.Component<IActionModalProps> {
  public render() {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.props.loading.loading || this.props.errors.error}
        onRequestClose={() => {
          /* TODO */
        }}
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

  private handlePress = () => {
    if (this.props.errors.error) {
      this.props.dispatch(finishLoading())
      this.props.dispatch(clearError())
    }
  }
}

const mapStateToProps = (state: IReduxState) => ({
  loading: state.loading,
  errors: state.errors,
})

export default connect(mapStateToProps)(ActionModal)
