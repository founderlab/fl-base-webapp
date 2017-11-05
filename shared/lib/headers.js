import _ from 'lodash'

const headers = {}

export function setHeaders(_headers) {
  _.extend(headers, _headers)
}

export function beforeSend(xhr) {
  _.forEach(headers, (value, header) => {
    xhr.setRequestHeader(header, value)
  })
}
