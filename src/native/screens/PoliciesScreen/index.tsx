import * as _ from 'lodash'
import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { CREAM, PINK } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import { selectInitialisedPolicies } from '~/common/store/policies/selectors'
import {
  IFirebaseUser,
  IMotorPolicy,
  IMotorPolicyMap,
  IReduxState,
} from '~/common/types'
import BackgroundHeader from '~/native/components/BackgroundHeader'
import Spinner from '~/native/components/Spinner'

import GetStartedScreen from '../GetStartedScreen'
import AddMotorPolicyCard from './AddMotorPolicyCard'
import MotorPolicyCard from './MotorPolicyCard'

interface IPoliciesProps extends DispatchProp<any> {
  user: IFirebaseUser | null
  policies: IMotorPolicyMap
  initialised: boolean
}

class PoliciesScreen extends React.Component<IPoliciesProps> {
  public render() {
    const policies = this.props.policies
    const initialised = this.props.initialised
    const numPolicies = _.keys(policies).length

    if (initialised) {
      return (
        <View style={styles.container}>
          {numPolicies ? this.renderPolicies() : this.renderNoPolicies()}
        </View>
      )
    }

    return (
      <View
        style={[
          styles.content,
          { alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        <Spinner text="Loading your policies..." />
      </View>
    )
  }

  private renderNoPolicies() {
    return (
      <GetStartedScreen
        onGetStartedPress={() => {
          this.props.dispatch(
            NavigationActions.navigate({
              routeName: 'AddPolicy',
            }),
          )
        }}
      />
    )
  }

  private renderPolicies() {
    const policies = this.props.policies
    const numPolicies = _.keys(policies).length

    return (
      <View style={{ flex: 1 }}>
        <BackgroundHeader
          headerText={numPolicies ? 'Dashboard' : 'Motor Policies'}
          subheaderText={numPolicies ? "Let's get started" : null}
          enableBackPress={false}
        />
        <ScrollView style={styles.content}>
          {_.map(_.values(policies), (policy: IMotorPolicy, idx: number) => {
            return (
              <MotorPolicyCard
                key={idx}
                policy={policy}
                index={idx}
                onPress={() => {
                  this.props.dispatch(
                    NavigationActions.navigate({
                      routeName: 'PolicyDetails',
                      params: {
                        policyId: policy.id,
                        policyIndex: idx + 1,
                      },
                    }),
                  )
                }}
              />
            )
          })}
          <AddMotorPolicyCard
            onPress={() => {
              this.props.dispatch(
                NavigationActions.navigate({
                  routeName: 'AddPolicy',
                }),
              )
            }}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: CREAM,
    padding: MARGIN.large,
  },

  mockPoliciesButton: {
    backgroundColor: PINK,
    height: 40,
    borderRadius: 4,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const mapStateToProps = (state: IReduxState) => ({
  user: state.auth.user,
  policies: selectInitialisedPolicies(state),
  initialised: state.policies.initialised,
})

export default connect(mapStateToProps)(PoliciesScreen)
