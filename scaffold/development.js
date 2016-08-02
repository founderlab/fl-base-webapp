import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'

/* ---------------------------------------
// Example development scaffolding, replace with code to generate your own models

import Lesson from '../server/models/Lesson'
import LessonCategory from '../server/models/LessonCategory'
import LessonPart from '../server/models/LessonPart'
import LessonPartFile from '../server/models/LessonPartFile'
import LessonPartSession from '../server/models/LessonPartSession'
import LessonStatus from '../server/models/LessonStatus'
import School from '../server/models/School'

function addLessonParts(lesson, callback) {

  const queue = new Queue()

  _.forEach(['one', 'two', 'three', 'four', 'five', 'six', 'seven', '8', '9', 'ten'], (name, i) => {
    queue.defer(callback => {
      const level = i
      const lessonPart = new LessonPart({
        lesson,
        level,
        title: `part ${name} ${level}`,
        videoUrl: '//player.vimeo.com/video/17409268',
        contentHtml: `<p>lesson part ${name} ${level}</p>`,
      })
      lessonPart.save(callback)
    })
  })

  queue.await(callback)
}

function addLessons(cat, callback) {

  const lessons = []
  const queue = new Queue(1)

  _.forEach(['one', 'two', 'three'], (name, i) => {
    queue.defer(callback => {
      const level = i+1
      const lesson = new Lesson({
        level,
        category: cat,
        title: `lesson ${cat.get('name')} ${name} ${level}`,
        publishedDate: new Date(),
      })
      lesson.save(err => {
        if (err) return callback(err)
        lessons.push(lesson)
        addLessonParts(lesson, callback)
      })
    })
  })

  queue.await(err => {
    callback(err, {lessons})
  })
}

export default function scaffold(callback) {
  const queue = new Queue(1)

  queue.defer(callback => {
    require('./shared')(toScaffold, (err, _models) => callback(err, _.extend(models, _models)))
  })

  queue.defer(callback => {
    const lessonQueue = new Queue()
    _.forEach(models.lessonCategories, cat => {
      lessonQueue.defer(callback => {
        addLessons(cat, (err, {lessons}) => {
          callback(err, models.lessons = lessons)
        })
      })
    })
    lessonQueue.await(callback)
  })

  queue.await(err => callback(err, models))
}

--------------------------------------- */

const toScaffold = {
  adminUser: {
    email: 'admin@example.com',
    admin: true,
    password: '1',
    profile: {
      name: 'admin',
    },
  },
  studentUser: {
    email: 'student@example.com',
    password: '1',
    profile: {
      name: 'Chat Student',
    },
  },
  teacherUser: {
    email: 'teacher@example.com',
    password: '1',
    profile: {
      name: 'Chat Teacher',
    },
  },
}

const models = {}

export default function scaffold(callback) {
  const queue = new Queue(1)

  queue.defer(callback => {
    require('./shared')(toScaffold, (err, _models) => callback(err, _.extend(models, _models)))
  })

  queue.await(err => callback(err, models))
}
