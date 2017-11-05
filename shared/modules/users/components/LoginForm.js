import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Alert, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router'
import {reduxForm, Field} from 'redux-form'
import {Input} from 'fl-react-utils'
import Button from '../../utils/components/Button'

@reduxForm({
  form: 'login',
})
export default class LoginForm extends Component {

  static propTypes = {
    email: PropTypes.string,
    loading: PropTypes.bool,
    errorMsg: PropTypes.node,
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {handleSubmit, loading, errorMsg} = this.props
    const email = this.props.email || ''

    return (
      <form onSubmit={handleSubmit} className="login">
        <Row>
          <Col xs={12}>
            <Field
              type="email"
              label="Email"
              name="email"
              inputProps={{placeholder: 'you@example.com'}}
              component={Input}
            />
            <Field
              label="Password"
              type="password"
              name="password"
              // inputProps={{placeholder: 'Password (6 or more characters)'}}
              component={Input}
            />

            {errorMsg && (
              <Alert bsStyle="warning">
                <strong>Sorry!</strong> Either that email address hasn't been registered or your password isn't correct. Try again or <Link to={`/reset-request?email=${email}`}>reset your password</Link>.
                <span style={{display: 'none'}}>{errorMsg}</span>
              </Alert>
            )}

            <Link className="reset-link" to={`/reset-request?email=${email}`}>Forgot password?</Link>

            <div className="text-center">
              <Button loading={loading} type="submit" bsStyle="primary" onClick={handleSubmit}>Sign in</Button>
            </div>

          </Col>
        </Row>

        {/*<div className="text-center">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>*/}
      </form>
    )
  }
}
