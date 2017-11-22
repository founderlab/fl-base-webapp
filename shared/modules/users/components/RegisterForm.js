import _ from 'lodash' // eslint-disable-line
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Alert, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {reduxForm, Field, formValueSelector} from 'redux-form'
import {Link} from 'react-router'
import Collapse from 'react-collapse'
import {Input} from 'fl-react-utils'
import {validateEmailPass} from '../validation'
import TermsModal from './TermsModal'
import PrivacyModal from './PrivacyModal'
import Button from '../../utils/components/Button'

const selector = formValueSelector('register')

// Connect this form to redux to get the current value of email. Kind of bleh, but whatever
@connect(
  state => ({email: selector(state, 'email')}),
)
@reduxForm({
  form: 'register',
  validate: validateEmailPass,
})
export default class RegisterForm extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    email: PropTypes.string,
    errorMsg: PropTypes.string,
    query: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    showEmail: PropTypes.bool,
    returnTo: PropTypes.string,
    loginReturnTo: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    query: {},
    returnTo: '/',
    title: `Alrighty, let's get you started!`,
  }

  state = {
    showTermsModal: false,
    showPrivacyModal: false,
  }

  openTermsModal = () =>  this.setState({showTermsModal: true})
  openPrivacyModal = () =>  this.setState({showPrivacyModal: true})

  closeTermsModal = () => this.setState({showTermsModal: false})
  closePrivacyModal = () => this.setState({showPrivacyModal: false})

  handleShowEmail = () => this.setState({showEmail: true})

  render() {
    const {loading, errorMsg, handleSubmit, email, query, title, returnTo, loginReturnTo} = this.props
    const showEmail = !!(this.state.showEmail || this.props.showEmail || loading)
    if (email) query.email = email
    if (loginReturnTo) query.returnTo = loginReturnTo

    return (
      <div className="register text-center">
        <h2 className="header">{title}</h2>
        <form onSubmit={handleSubmit}>

          <p><a className="btn btn-lg btn-block btn-linkedin btn-linkedin-signup" href={`/auth/linkedin/redirect/?returnTo=${returnTo}`}>Sign up with LinkedIn</a></p>
          <p className="small light">We won't post anything on your behalf or hassle your contacts.</p>
          <p className="small light">
            By signing up, you agree to our <button className="btn-link" onClick={this.openTermsModal}>terms of use</button> and <button className="btn-link" onClick={this.openPrivacyModal}>privacy policy</button>.
          </p>

          <h3 className="or">or</h3>
          <p><button className="btn-link" onClick={this.handleShowEmail}>Sign up with email</button></p>

          <Collapse keepCollapsedContent isOpened={showEmail}>
            <Row>
              <Col sm={8} smOffset={2}>
                <Field
                  type="email"
                  name="email"
                  inputProps={{placeholder: 'Email'}}
                  component={Input}
                />
                <Field
                  type="password"
                  name="password"
                  inputProps={{placeholder: 'Password (6 or more characters)'}}
                  component={Input}
                />

                {errorMsg && (
                  <Alert bsStyle="info">
                    {errorMsg === 'User already exists' ? (
                      <div>
                        <strong>Hey!</strong> Looks like that email is already registered. You can <Link to={{pathname: '/login', query}}> sign in here</Link>.
                      </div>
                    ) : errorMsg}
                    <span style={{display: 'none'}}>{errorMsg}</span>
                  </Alert>
                )}

                <Button block loading={loading} bsStyle="primary" bsSize="large" type="submit">Join the community</Button>

                <p className="small light">
                  By signing up, you agree to our <button className="btn-link" onClick={this.openTermsModal}>terms of use</button> and <button className="btn-link" onClick={this.openPrivacyModal}>privacy policy</button>.
                </p>
              </Col>
            </Row>
          </Collapse>

          <br />
          <Row>
            <Col sm={8} smOffset={2}>
              <Alert bsStyle="info">Already have an account? <Link to={{pathname: '/login', query}}>Sign in here</Link>.</Alert>
            </Col>
          </Row>
        </form>

        <TermsModal show={this.state.showTermsModal} onHide={this.closeTermsModal} />
        <PrivacyModal show={this.state.showPrivacyModal} onHide={this.closePrivacyModal} />
      </div>
    )
  }
}
