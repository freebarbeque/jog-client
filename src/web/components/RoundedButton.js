import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'

const RoundedButton = ({ label, loading, ...props }) =>
  <FlatButton disabled={loading} {...props}>
    <div>{label}</div>
    {loading && <div>Loading...</div>}
  </FlatButton>

RoundedButton.propTypes = {
  label: PropTypes.string,
  ...FlatButton.propTypes,
}

export default RoundedButton
