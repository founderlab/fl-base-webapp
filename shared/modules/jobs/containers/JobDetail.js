import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import NotFound from '../../utils/components/NotFound'
import {load} from '../actions'
import JobDetail from '../components/JobDetail'

@connect(state => ({
  auth: state.auth,
  jobs: state.jobs,
  jobId: state.router.params.jobId,
}))
export default class JobDetailContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    jobs: PropTypes.object.isRequired,
    jobId: PropTypes.string.isRequired,
    saveProfile: PropTypes.func.isRequired,
    scrollToPanel: PropTypes.string,
  }

  static fetchData({store, action}, callback) {
    const {router, jobs} = store.getState()
    const jobId = ((action && action.payload && action.payload.params) || router.params).jobId

    const queue = new Queue(1)

    if (!jobs.get('models').get(jobId)) {
      queue.defer(callback => store.dispatch(load({id: jobId, $one: true}, callback)))
    }

    queue.await(callback)
  }

  state = {}

  // componentWillReceiveProps(props) {
  //   console.log('componentWillReceiveProps')
  //   const {scrollToPanel} = props
  componentDidMount = () => {
    console.log('componentDidMount', this)
    const {scrollToPanel} = this.props
    console.log('scrollToPanel', scrollToPanel)
    if (!scrollToPanel || scrollToPanel === this._scrollToPanel) return
    const scrollEle = document.getElementById(scrollToPanel)
    console.log('scrollEle', scrollEle)
    if (scrollEle) {
      scrollEle.scrollIntoView()
      this._scrollToPanel = scrollToPanel
    }
  }

  render() {
    const {jobs, jobId} = this.props
    const errors = jobs.get('errors').toJSON()
    const jobIm = jobs.get('models').get(jobId)

    if (!jobIm) return (<NotFound />)

    const job = jobIm.toJSON()
    const editable = userCanEditJob({...this.props, ...this.context})

    return (
      <div>
        <Helmet title={job.name} />
        <JobDetail
          job={job}
          errors={errors}
          editable={editable}
        />
      </div>
    )
  }
}
