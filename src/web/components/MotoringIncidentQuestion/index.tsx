import { motoringIncidentsQuestion } from 'jog-common/business/motor'
import {
  constructIncident,
  IMotoringIncidentAnswer,
  incidentQuestions,
} from 'jog-common/business/motoringIncidents'
import { IMotoringIncident } from 'jog-common/business/types'
// import * as _ from "lodash";
import * as React from 'react'
import IncidentTable from '~/web/components/MotoringIncidentQuestion/IncidentTable'
import _QuestionSet from '~/web/components/Questions/QuestionSet'

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
          ? <IncidentTable incidents={incidents} />
          : <div>No incidents</div>}
        {!currentIncidentAnswers
          ? <button onClick={this.initNewIncident}>Create New Incident</button>
          : null}
        {currentIncidentAnswers
          ? <div className="CurrentIncident">
              <QuestionSet
                questions={incidentQuestions}
                answers={currentIncidentAnswers}
                onChange={this.onChange}
              />
              <button onClick={this.addIncident}>Add Incident</button>
            </div>
          : null}
      </div>
    )
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
