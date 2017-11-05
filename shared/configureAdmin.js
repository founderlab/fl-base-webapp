import configureAdmin from 'fl-admin'
import MarkdownInput from './modules/utils/components/MarkdownInput'

configureAdmin({
  models: [
    {
      Model: require('./models/AppSettings'),
      singleton: true,
      fields: {
        footerCopyright: {
          input: 'textarea',
        },
      },
    },
    {
      Model: require('./models/StaticPage'),
      fields: {
        title: {
          listEdit: true,
        },
      },
    },
    {
      Model: require('./models/FaqItem'),
      display: model => model.question,
      fields: {
        answerMd: {
          InputComponent: MarkdownInput,
        },
      },
    },

    {
      Model: require('./models/User'),
      display: model => {
        let name = model.email
        if (model.profile) name += ` (${model.profile.displayName})`
        return name
      },
      query: {$template: 'admin'},
      fields: {
        admin: {
          listDisplay: true,
        },
        emailConfirmationToken: {
          readOnly: true,
          hidden: true,
        },
        resetToken: {
          readOnly: true,
          hidden: true,
        },
        resetTokenCreatedDate: {
          readOnly: true,
          hidden: true,
        },
        emailConfirmedDate: {
          readOnly: true,
        },
        lastActiveDate: {
          readOnly: true,
        },
      },
    },
    {
      Model: require('./models/Profile'),
      display: model => {
        let name = model.displayName
        if (model.user) name += ` (${model.user.email})`
        return name
      },
      query: {$template: 'admin'},
      fields: {
        active: {
          listDisplay: true,
        },
        emailMd5: {
          readOnly: true,
          hidden: true,
        },
        user: {
          readOnly: true,
        },
      },
    },

    {
      Model: require('./models/Hotel'),
      fields: {
      },
    },

  ],
})
