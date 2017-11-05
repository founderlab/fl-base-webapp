import _ from 'lodash' // eslint-disable-line
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Grid, Row, Col, Panel} from 'react-bootstrap'
import Collapse from 'react-collapse'
import ReactMarkdown from 'react-markdown'
import classNames from 'classnames'
import Loader from '../../utils/components/Loader'

export default class Faq extends Component {

  static propTypes = {
    faqItems: PropTypes.array,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
  }

  state = {
    openFaqItems: {},
  }

  handleSelectFaqFn = faqItem => () => this.setState({openFaqItems: _.extend(this.state.openFaqItems, {[faqItem.id]: !this.state.openFaqItems[faqItem.id]})})

  renderFaqItem = (faqItem, i) => {
    const isOpened = this.state.openFaqItems[faqItem.id]

    return (
      <div key={faqItem.id} className={classNames('faq-item', {active: isOpened})}>
        <a className="faq-question" onClick={this.handleSelectFaqFn(faqItem)}>
          <i className="fa fa-question-circle-o" /> {faqItem.question} <i className={`fa fa-caret-down`} />
        </a>
        <Collapse keepCollapsedContent isOpened={isOpened}>
          <div className="faq-answer">
            <ReactMarkdown escapeHtml source={faqItem.answerMd} />
          </div>
        </Collapse>
      </div>
    )
  }

  render() {
    const {faqItems, loading, loaded} = this.props

    return (
      <div className="faq">

        <header className="clouds">
          <Grid>
            <Row>
              <Col xs={12}>
                <h1 className="text-center">Frequently asked questions</h1>
              </Col>
            </Row>
          </Grid>
        </header>

        <div className="bg-tint">
          <Grid>
            <Row>
              <Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
                <Panel className="inset-form faq">
                  {(loading || !loaded) ? (
                    <Loader />
                  ) : (
                    faqItems.map(this.renderFaqItem)
                  )}
                </Panel>
              </Col>
            </Row>
          </Grid>
        </div>

        <Grid className="section disclaimer">
          <Row>
            <Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
              <h5>
                <i className="fa fa-exclamation"/> Disclaimer
              </h5>
              <p className="text-light">
                Neither Frameworkstein Pty Ltd nor its employees or directors are registered as legal practitioners. Frameworkstein does not provide immigration advice or assistance, nor legal advice or legal services directly to its customers. Frameworkstein is a platform for connecting customers with registered migration agents/lawyers only.
              </p>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
