import admin from 'fl-admin'

admin({
  models: [
    {
      Model: require('./models/User'),
      fields: {
        email: {
          listEdit: true,
        },
        admin: {
          listEdit: true,
        },
      },
    },
    {
      Model: require('./models/Profile'),
      fields: {
        firstName: {
          listEdit: true,
        },
        lastName: {
          listEdit: true,
        },
      },
    },
    {
      Model: require('./models/AppSettings'),
      singleton: true,
      fields: {
        footerContactInfo: {
          input: 'textarea',
        },
      },
    },
    {
      Model: require('./models/StaticPage'),
      fields: {
        title: {
          listEdit: true,
          input: 'textarea',
        },
        content: {
          input: 'rich',
        },
      },
    },
  ],
})
