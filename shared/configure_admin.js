import admin from './admin'

admin({
  models: [
    {
      model_type: require('./models/group'),
      inline: ['name'],
    },
    {
      model_type: require('./models/user'),
    },
  ],
})
