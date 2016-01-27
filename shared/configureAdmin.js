import admin from 'fl-admin'

admin({
  models: [
    {
      model_type: require('./models/User'),
      fields: {
        email: {
          list_edit: true,
        },
        admin: {
          list_edit: true,
        },
      },
    },
    {
      model_type: require('./models/Profile'),
      fields: {
        first_name: {
          list_edit: true,
        },
        last_name: {
          list_edit: true,
        },
      },
    },
    {
      model_type: require('./models/AppSettings'),
      singleton: true,
      fields: {
        footer_contact_info: {
          input: 'textarea',
        },
      },
    },
    {
      model_type: require('./models/StaticPage'),
      fields: {
        title: {
          list_edit: true,
          input: 'textarea',
        },
        content: {
          input: 'rich_text',
        },
      },
    },
  ],
})
