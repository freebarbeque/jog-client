import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'
import styled from 'styled-components'

import { BLUE, PINK, WHITE } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'
import { CarOutline, Cross, Logo } from './images/index'

interface IProps {
  title?: string
  onPrevPress?: () => void
  onNextPress?: () => void
  onSkipPress?: () => void
  children?: any
  showPrevButton?: boolean
  showNextButton?: boolean
  showSkipButton?: boolean
  disableNextButton?: boolean
  nextLabel?: string
}

interface IConnectedAddPolicyScreenContainerProps
  extends DispatchProp<any>,
    IProps {}

interface IAddPolicyScreenContainerState {
  keyboardHeight: number
}

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  padding: ${MARGIN.large}px;
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${BLUE};
  height: 100%;
`
// language=SCSS prefix=dummy{ suffix=}
const Footer = styled.div`
  text-align: center;
  margin-top: ${MARGIN.large}px;
  margin-bottom: ${MARGIN.xxl}px;
`
// language=SCSS prefix=dummy{ suffix=}
const EntryText = styled.div`
  font-size: 11px;
  color: ${PINK};
  text-align: center;
`
// language=SCSS prefix=dummy{ suffix=}
const Title = styled.div`
  font-size: 24px;
  text-align: center;
  margin-top: ${MARGIN.small}px;
`

// language=SCSS prefix=dummy{ suffix=}
const ButtonRow = styled.div`flex-direction: row;`

// language=SCSS prefix=dummy{ suffix=}
const ButtonContainer = styled.div`
  flex: 1;
  margin: ${MARGIN.base}px;
  border-radius: 20px;
  justify-content: center;
  height: 60px;
`

// language=SCSS prefix=dummy{ suffix=}
const Button = styled.div`
  height: 40px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${MARGIN.base}px;
  border-radius: 20px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;

  &[disabled] {
    cursor: default;
  }

  &:hover {
    opacity: 0.7;
  }
`

export const NavigationButton = (props: any) => {
  const { variation, disabled, title, ...rest } = props

  const extraStyle =
    variation === 'pink'
      ? {
          backgroundColor: PINK,
          color: WHITE,
          textAlign: 'center',
        }
      : {
          backgroundColor: WHITE,
          color: 'rgb(109,109,109)',
        }

  // The button is wrapped in a container because there is a strange bug where opacity is ignored
  // after the initial render of TouchableOpacity

  return (
    <ButtonContainer style={{ opacity: disabled ? 0.5 : 1 }}>
      <Button style={extraStyle} disabled={disabled} {...rest}>
        {title}
      </Button>
    </ButtonContainer>
  )
}

class AddPolicyScreenContainer extends React.Component<
  IConnectedAddPolicyScreenContainerProps,
  IAddPolicyScreenContainerState
> {
  public static defaultProps = {
    showPrevButton: true,
    showNextButton: true,
    showSkipButton: false,
    disableNextButton: false,
  }

  constructor(props: IConnectedAddPolicyScreenContainerProps) {
    super(props)
    this.state = {
      keyboardHeight: 0,
    }
  }

  public render() {
    const title = this.props.title
    return (
      <Container className="manual-add-policy-screen-container">
        <AppBar
          className="NavBar"
          title={<Logo style={{ marginTop: 21 }} />}
          iconElementLeft={<div />}
          iconElementRight={
            <FlatButton
              style={{
                textAlign: 'right',
                paddingRight: MARGIN.base,
                width: 20,
              }}
              onClick={() => {
                this.props.dispatch(push('/app/tabs/policies/addPolicy'))
              }}
            >
              <Cross />
            </FlatButton>
          }
        />
        <div
          style={{
            marginBottom: MARGIN.base,
          }}
        >
          {title &&
            <div>
              <EntryText>POLICY ENTRY</EntryText>
              <Title>
                {title}
              </Title>
            </div>}
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            marginTop: MARGIN.large,
          }}
        >
          {this.props.children}
        </div>
        <ButtonRow>
          {this.props.showPrevButton
            ? <NavigationButton
                variation="gray"
                title="Prev"
                onPress={this.onPrevPress}
              />
            : null}
          {this.props.showSkipButton
            ? <NavigationButton
                variation="gray"
                title="Skip this step"
                onPress={this.onSkipPress}
              />
            : null}
          {this.props.showNextButton
            ? <NavigationButton
                title={this.props.nextLabel || 'Next'}
                onClick={this.onNextPress}
                disabled={this.props.disableNextButton}
              />
            : null}
        </ButtonRow>
        <Footer>
          <CarOutline />
        </Footer>
      </Container>
    )
  }

  private onPrevPress = () => {
    if (this.props.onPrevPress) this.props.onPrevPress()
  }

  private onNextPress = () => {
    if (this.props.onNextPress) this.props.onNextPress()
  }

  private onSkipPress = () => {
    if (this.props.onSkipPress) this.props.onSkipPress()
  }
}

const ConnectedAddPolicyScreenContainer: React.ComponentClass<
  IProps
> = connect()(AddPolicyScreenContainer)

export default ConnectedAddPolicyScreenContainer
