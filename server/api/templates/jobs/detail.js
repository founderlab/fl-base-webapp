import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import Inflection from 'inflection'
import Organisation from '../../../models/Organisation'

const template = (_jobs, options, callback) => {
  let single = false
  let jobs = _jobs
  if (!_.isArray(jobs)) {
    single = true
    jobs = [jobs]
  }

  const organisationQuery = {id: {$in: _(jobs).map('organisation_id').uniq().compact().value()}}
  let organisations = []
  const queue = new Queue()

  queue.defer(callback => Organisation.cursor(organisationQuery).toJSON((err, _organisations) => callback(err, organisations = _organisations)))

  queue.await(err => {
    if (err) return callback(err)
    _.forEach(jobs, job => {
      job.organisation = _.find(organisations, s => s.id === job.organisation_id)

      // job.paymentsString = (job.paymentTypes || []).join(' + ')
      // job.jobTypesString = (job.jobTypes || []).join(', ')
      // job.skillsString = (job.skillCategories || []).map(s => Inflection.capitalize(s)).join(', ')
      // job.sellingPointsString = (job.sellingPoints || []).join(', ')

    })
    callback(null, single ? jobs[0] : jobs)
  })
}

template.$raw = true
export default template
