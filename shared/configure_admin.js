import admin from './admin'

admin({
  models: [
    {
      model_type: require('./models/group'),
      fields: {
        name: {
          inline: true,
        },
      },
    },
    {
      model_type: require('./models/user'),
    },
  ],
})
