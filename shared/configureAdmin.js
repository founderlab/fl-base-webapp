import admin from 'fl-admin'

admin({
  models: [
    {
      model_type: require('./models/Group'),
      fields: {
        name: {
          inline: true,
        },
        target: {
          inline: true,
        },
      },
    },
    // {
    //   model_type: require('./models/User'),
    // },
    {
      model_type: require('./models/Target'),
      fields: {
        is_this_thing_on: {inline: true},
      },
    },
  ],
})
