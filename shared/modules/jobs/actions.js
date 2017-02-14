import _ from 'lodash' // eslint-disable-line
import request from 'superagent'
import Job from '../../models/Job'

export const TYPES = {
  JOB_LOAD: 'JOB_LOAD',
  JOB_COUNT: 'JOB_COUNT',
  JOB_SAVE: 'JOB_SAVE',
  JOB_DELETE: 'JOB_DELETE',
  JOB_LOCATION_LOAD: 'JOB_LOCATION_LOAD',
}

/*
  Jobs
*/
export function loadJobs(query, callback) {
  query.$sort = '-createdDate'
  return {
    type: TYPES.JOB_LOAD,
    request: Job.cursor(query),
    callback,
  }
}

export function loadJobsPage(page, query, callback) {
  return {
    page,
    type: TYPES.JOB_LOAD,
    request: Job.cursor(query),
    callback,
  }
}

export function countJobs(query, callback) {
  return {
    type: TYPES.JOB_COUNT,
    request: Job.cursor(_.merge({}, query, {$count: true})),
    callback,
  }
}

export function saveJob(data, callback) {
  data.updatedDate = new Date()
  const model = new Job(data)

  return {
    type: TYPES.JOB_SAVE,
    request: model.save.bind(model),
    callback,
  }
}

export function deleteJob(data, callback) {
  const model = new Job(data)
  return {
    type: TYPES.JOB_DELETE,
    request: model.destroy.bind(model),
    organisationId: data.organisation_id,
    deletedModel: data,
    callback,
  }
}

export function loadJobLocations(urlRoot, callback) {
  return {
    type: TYPES.JOB_LOCATION_LOAD,
    request: request.get(`${urlRoot}/api/places/jobs`),
    callback,
  }
}
