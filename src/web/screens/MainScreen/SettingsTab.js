import React, { Component } from 'react'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
}

export default class SettingsTab extends Component {
  render() {
    return (
      <div style={{ flex: 1 }}>
        <h2 style={styles.headline}>Tab Two</h2>
        <p>
          This is another example tab.
        </p>
      </div>
    )
  }
}
