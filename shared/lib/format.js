import moment from 'moment'

export function formatDate(date) {
  if (!date) return ''
  return moment(date).format('LL')
}

export function formatDatetime(datetime) {
  if (!datetime) return ''
  return moment(datetime).format('Do MMMM, h:mm a')
}

export function formatDateDuration(date) {
  if (!date) return ''
  return moment.duration(moment().diff(date)).humanize()
}

export function formatDateRange(date1, date2) {
  if (!date1) return ''
  let str = formatDatetime(date1)
  const d1 = moment(date1)

  if (date2) {
    const d2 = moment(date2)

    if (d1.isSame(d2, 'day')) {
      str += ' - ' + d2.format('h:mm a')
    }
    else {
      str += ' - ' + formatDatetime(date2)
    }
  }

  return str
}

export function formatDateFrom(date) {
  if (!date) return ''
  return moment(date).from(moment())
}

export function formatLocation(loc, defaultLocation='') {
  let locationStr = ''
  if (loc.city) locationStr = `${loc.city}`
  if (loc.city && loc.country) locationStr = `${locationStr}, `
  if (loc.country) locationStr = `${locationStr}${loc.country}`
  if (!locationStr && defaultLocation) locationStr = defaultLocation
  return locationStr
}
