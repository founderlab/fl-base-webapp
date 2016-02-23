import _ from 'lodash' // eslint-disable-line
import schema from '../../../../shared/models/schemas/app_settings'
import StaticPage from '../../../models/StaticPage'

export default {
  $select: ['id', ..._.without(_.keys(schema), 'created_at')],
  static_page_links: (app_settings, options, callback) => {
    StaticPage.cursor({visible: true, show_in_footer: true}).sort('order').select('id', 'title', 'slug').toJSON(callback)
  },
}
