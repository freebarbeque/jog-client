import { motoringIncidentsQuestion } from 'jog-common/business/motor'
import {
  constructIncident,
  IMotoringIncidentAnswer,
  incidentQuestions,
} from 'jog-common/business/motoringIncidents'
import { IMotoringIncident } from 'jog-common/business/types'
// import * as _ from "lodash";
import * as React from 'react'
import styled from 'styled-components'

import { BLUE, LIGHT_CREAM } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import IncidentTable from '~/web/components/MotoringIncidentQuestion/IncidentTable'
import _QuestionSet from '~/web/components/Questions/QuestionSet'

const CurrentIncident = styled.div`
  background-color: ${LIGHT_CREAM};
  margin-top: ${MARGIN.base}px;
  padding: ${MARGIN.base}px;
`

const CancelButton = styled.a`
  text-decoration: underline;
  color: ${BLUE} !important;

  &:hover {
    color: ${BLUE} !important;
    text-decoration: none;
  }
`

class QuestionSet extends _QuestionSet<IMotoringIncidentAnswer> {}

interface IProps {
  error?: string
  value?: IMotoringIncident[]
  onChange?: (id: string, incidents: IMotoringIncident[]) => void
}

interface IState {
  currentIncidentAnswers: IMotoringIncidentAnswer | null
}

// tslint:disable-next-line:max-classes-per-file
export default class MotoringIncidentQuestion extends React.Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      currentIncidentAnswers: null,
    }
  }

  public render() {
    const currentIncidentAnswers = this.state.currentIncidentAnswers
    const incidents = this.props.value || []

    return (
      <div className="MotoringIncidentQuestion">
        {incidents.length
          ? <IncidentTable
              incidents={incidents}
              onRemovePress={this.handleRemovePress}
            />
          : <div>No incidents</div>}
        {!currentIncidentAnswers
          ? <button onClick={this.initNewIncident}>Create New Incident</button>
          : null}
        {currentIncidentAnswers
          ? <CurrentIncident className="CurrentIncident">
              <QuestionSet
                questions={incidentQuestions}
                answers={currentIncidentAnswers}
                onChange={this.onChange}
              />
              <button onClick={this.addIncident}>Add Incident</button>
              <CancelButton onClick={this.handleCancel}>Cancel</CancelButton>
            </CurrentIncident>
          : null}
      </div>
    )
  }

  private handleCancel = () => {
    this.setState({
      currentIncidentAnswers: null,
    })
  }

  private handleRemovePress = (idx: number) => {
    const questionId = motoringIncidentsQuestion.id
    if (this.props.value && this.props.onChange) {
      const value = [...this.props.value]
      value.splice(idx, 1)
      this.props.onChange(questionId, value)
    }
  }

  private onChange = (id: string, answer: any) => {
    const currentIncidentAnswers = {
      ...this.state.currentIncidentAnswers,
    }
    currentIncidentAnswers[id] = answer
    this.setState({
      currentIncidentAnswers,
    })
  }

  private initNewIncident = () => {
    this.setState({ currentIncidentAnswers: {} as any })
  }

  private addIncident = () => {
    const questionId = motoringIncidentsQuestion.id
    const incidents = this.props.value || []

    const incident = this.state.currentIncidentAnswers
      ? constructIncident(this.state.currentIncidentAnswers)
      : null

    if (this.props.onChange && incident) {
      this.props.onChange(questionId, [...incidents, incident])
      this.setState({ currentIncidentAnswers: null })
    }
  }
}
