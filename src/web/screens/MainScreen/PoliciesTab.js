import React, { Component } from 'react'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
}

export default class PoliciesTab extends Component {
  componentDidMount() {}

  render() {
    return (
      <div style={{ flex: 1 }}>
        <h2 style={styles.headline}>Policies</h2>
        <p>
          This is an example tab.
        </p>
        <p>
          You can put any sort of HTML or react component in here. It even keeps
          the component state!
        </p>
      </div>
    )
  }
}
