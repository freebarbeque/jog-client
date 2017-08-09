import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { goBack } from 'react-router-redux'
import styled from 'styled-components'
import { MARGIN } from '../../common/constants/style'
import { max, min } from '../media'
import { Arrow, Chevron } from './images/index'

// tslint:disable-next-line:no-var-requires
const background = require('./background2.png')

interface IBackgroundHeaderProps {
  headerText: string
  subheaderText?: string | null
  onPress?: () => void
  enableBackPress?: boolean
  backText?: string
  style?: any
}

interface IConnectedBackgroundHeaderProps
  extends IBackgroundHeaderProps,
    DispatchProp<any> {}

const desktopHeight = '182.293px'
const mobileHeight = '100px'

// language=SCSS prefix=dummy{ suffix=}
const Wrapper = styled.div.attrs({
  className: 'BackgroundHeader__Wrapper',
})`
  position: relative;
  cursor: pointer;
  height: ${mobileHeight};
  ${min.smallTablet`
    height: ${desktopHeight} !important;
  `}

  &:hover {
    opacity: 0.7;
  }
`

// language=SCSS prefix=dummy{ suffix=}
const BackgroundImageOverlay = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 0;
  left: 0;

  height: ${mobileHeight};
  ${min.smallTablet`
    height: ${desktopHeight} !important;
  `};
`

// language=SCSS prefix=dummy{ suffix=}
const BackgroundImage = styled.div.attrs({
  className: 'BackgroundHeader__BackgroundImage',
})`
  width: 100%;
  justify-content: center;
  background: url(${background});
  background-size: cover;

  height: ${mobileHeight};
  ${min.smallTablet`
    height: ${desktopHeight} !important;
  `}
`

// language=SCSS prefix=dummy{ suffix=}
const Button = styled.div`
  width: 100%;
  height: ${mobileHeight};
  ${min.smallTablet`
    height: ${desktopHeight} !important;
  `};
`

// language=SCSS prefix=dummy{ suffix=}
const Header = styled.div`
  font-size: 20px;

  ${min.smallTablet`
    font-size: 48px;
  `};
`

// language=SCSS prefix=dummy{ suffix=}
const Content = styled.div.attrs({ className: 'BackgroundHeader__Content' })`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;

  height: ${mobileHeight};
  ${min.smallTablet`
    height: ${desktopHeight} !important;
  `}
`

// language=SCSS prefix=dummy{ suffix=}
const RotatedChevron = styled(Chevron)`
  margin-right: ${MARGIN.base}px;
  transform: rotate(180deg);
  stroke: white;
  
  * {
    stroke: white;
  }
  
  ${min.smallTablet`
    display: none;
  `}
`

// language=SCSS prefix=dummy{ suffix=}
const BackArrow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${max.smallTablet`
    display: none;
  `};
`

class BackgroundHeader extends React.Component<
  IConnectedBackgroundHeaderProps
> {
  public static defaultProps = {
    enableBackPress: true,
  }

  public render() {
    if (this.props.enableBackPress) {
      return (
        <Button
          className="BackgroundHeader"
          onClick={this.props.onPress || this.defaultBack}
        >
          {this.renderInner()}
        </Button>
      )
    }
    return (
      <div className="BackgroundHeader">
        {this.renderInner()}
      </div>
    )
  }

  private defaultBack = () => {
    this.props.dispatch(goBack())
  }

  private renderInner() {
    return (
      <Wrapper>
        <BackgroundImage />
        <BackgroundImageOverlay />
        <Content>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: MARGIN.large,
            }}
          >
            {this.props.enableBackPress &&
              <RotatedChevron color="white" scale={1.2} />}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <BackArrow>
                <Arrow style={{ marginRight: MARGIN.base }} />
                <div style={{ color: 'white', fontSize: 20 }}>
                  {this.props.backText}
                </div>
              </BackArrow>
              <Header>
                {this.props.headerText}
              </Header>
              {this.props.subheaderText &&
                <div>
                  {this.props.subheaderText}
                </div>}
            </div>
          </div>
        </Content>
      </Wrapper>
    )
  }
}

const ConnectedBackgroundHeader: React.ComponentClass<
  IBackgroundHeaderProps
> = connect()(BackgroundHeader)
export default ConnectedBackgroundHeader
