import admin from 'fl-admin'

admin({
  models: [
    {
      model_type: require('./models/group'),
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
    //   model_type: require('./models/user'),
    // },
    {
      model_type: require('./models/target'),
      fields: {
        is_this_thing_on: {inline: true},
      },
    },
  ],
})
