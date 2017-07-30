import * as React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import {
  Dispatch,
  FirebaseUser,
  ReduxState,
  UserDetails,
} from '../../../common/types'
import { BLUE, VERY_LIGHT_GRAY, WHITE } from '../../../common/constants/palette'
import { MARGIN } from '../../../common/constants/style'
import BigRedFullWidthButton from '../../components/BigRedFullWidthButton'
import Collapsible from '../../components/Collapsible'
import { getFile } from '../../upload'
import { updateUserProfilePicture } from '../../../common/store/auth/actions'
import Button from '../../components/Button'

type ProfileProps = {
  dispatch: Dispatch
  // eslint-disable-next-line react/no-unused-prop-types
  user: FirebaseUser
  userDetails: UserDetails | null
}

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

// language=SCSS prefix=dummy{ suffix=}
const Header = styled.div`
  background-color: ${WHITE};
  padding-left: ${MARGIN.base}px;
  padding-bottom: ${MARGIN.base}px;
  overflow: hidden;
  border-bottom-color: rgb(234, 234, 234);
  border-bottom-width: 1px;
  border-bottom-style: solid;
`

// language=SCSS prefix=dummy{ suffix=}
const FieldContainer = styled.div`
  min-height: 30px;
  padding-top: ${MARGIN.base}px;
  padding-bottom: ${MARGIN.base}px;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: rgb(205, 205, 205);
  padding-left: ${MARGIN.large}px;
  padding-right: ${MARGIN.large}px;
`

// language=SCSS prefix=dummy{ suffix=}
const FieldTitle = styled.div`
  color: rgb(164, 169, 174);
  font-size: 11px;
  font-weight: 600;
`

// language=SCSS prefix=dummy{ suffix=}
const FieldValue = styled.div`
  color: ${BLUE};
  font-size: 16px;
`

// language=SCSS prefix=dummy{ suffix=}
const Content = styled.div`background-color: ${VERY_LIGHT_GRAY};`

// language=SCSS prefix=dummy{ suffix=}
const ProfilePhoto = styled.img`
  width: 77px;
  height: 77px;
  border-radius: 77px;
`

const Field = props =>
  <FieldContainer style={props.style || {}}>
    <FieldTitle>
      {props.title.toUpperCase()}
    </FieldTitle>
    <FieldValue>
      {props.children}
    </FieldValue>
  </FieldContainer>

class Profile extends React.Component<ProfileProps> {
  static handleSupportPress() {}

  handleProfilePicturePress = () => {
    getFile().then((file: File) => {
      this.props.dispatch(updateUserProfilePicture({ file }))
    })
  }

  handleCapture = () => {}

  render() {
    const userDetails = this.props.userDetails || {}
    const address = userDetails.address
    const hasAddress =
      address && (address.line1 || address.line2 || address.city)

    return (
      <Collapsible trigger="My Profile">
        <Container>
          <Header>
            <Button onClick={this.handleProfilePicturePress}>
              {userDetails.profilePhotoURL
                ? <ProfilePhoto src={userDetails.profilePhotoURL} />
                : <div>Default Image</div>}
            </Button>
          </Header>
          <Content>
            <Field title="First name">
              {userDetails.firstName || '-'}
            </Field>
            <Field title="Surname">
              {userDetails.lastName || '-'}
            </Field>
            <Field title="Date of birth">
              {userDetails.dob || '-'}
            </Field>
            <Field title="Address">
              {address && hasAddress
                ? <div>
                    {address.line1
                      ? <FieldValue>
                          {`${address.line1}\n`}
                        </FieldValue>
                      : null}
                    {address.line2
                      ? <FieldValue>
                          {`${address.line2}\n`}
                        </FieldValue>
                      : null}
                    {address.city
                      ? <FieldValue>
                          {`${address.city}`}
                        </FieldValue>
                      : null}
                  </div>
                : <FieldValue>-</FieldValue>}
            </Field>
            <Field
              title="Post code"
              style={{ borderBottomColor: 'transparent' }}
            >
              {address && address.postCode ? address.postCode : '-'}
            </Field>
            <BigRedFullWidthButton
              style={{ textAlign: 'left' }}
              href="mailto:support@jog.insure"
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 11,
                }}
              >
                TO MAKE PROFILE CHANGES EMAIL:
              </div>
              <div style={{ fontSize: 14 }}>support@jog.insure</div>
            </BigRedFullWidthButton>
          </Content>
        </Container>
      </Collapsible>
    )
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    user: state.auth.user,
    userDetails: state.auth.details,
  }
}

export default connect(mapStateToProps)(Profile)
