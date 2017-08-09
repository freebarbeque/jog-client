import { Component } from 'react'

export default class ScrollToTopOnMount extends Component {
  public componentDidMount() {
    window.scrollTo(0, 0)
  }

  public render() {
    return null
  }
}
