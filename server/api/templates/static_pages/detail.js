import _ from 'lodash' // eslint-disable-line
import schema from '../../../../shared/models/schemas/static_page'

export default {
  $select: ['id', ..._.keys(schema)],
}
