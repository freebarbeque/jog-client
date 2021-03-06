import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import styled from 'styled-components'

import { BLUE } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'
import { clearError } from '../../common/store/errors/actions'
import { finishLoading } from '../../common/store/loading/actions'
import { IReduxState } from '../../common/types'
import Button from './Button'
import { Warning } from './images/index'
import Spinner from './Spinner'

interface IProps extends DispatchProp<any> {
  loading: {
    text: string
    loading: boolean
  }
  errors: {
    error: boolean
    text: string
  }
}

// language=SCSS prefix=dummy{ suffix=}
const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2000;
`

// language=SCSS prefix=dummy{ suffix=}
const Content = Button.extend`
  &.loading {
    cursor: default;
    &:hover {
      opacity: 1;
    }
  }
`

class ActionModal extends React.Component<IProps> {
  public render() {
    const visible = this.props.loading.loading || this.props.errors.error

    return (
      <ModalWrapper
        className="ModalWrapper"
        style={{
          display: visible ? 'flex' : 'none',
        }}
      >
        <div className="Modal">
          <Content
            className={this.props.errors.error ? 'error' : 'loading'}
            onClick={this.handleClick}
          >
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  borderRadius: 6,
                  width: 240,
                  height: 150,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {this.props.errors.error
                  ? <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Warning />
                      <div
                        style={{
                          color: BLUE,
                          marginTop: MARGIN.large,
                          textAlign: 'center',
                        }}
                      >
                        {this.props.errors.text}
                      </div>
                    </div>
                  : <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Spinner
                        text={
                          this.props.errors.error
                            ? this.props.errors.text
                            : this.props.loading.text
                        }
                      />
                    </div>}
              </div>
            </div>
          </Content>
        </div>
      </ModalWrapper>
    )
  }

  private handleClick = () => {
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
