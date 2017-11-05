import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import RestController from 'fl-backbone-rest'
import {JSONUtils} from 'backbone-orm'
import {createAuthMiddleware} from 'fl-auth-server'
import Profile from '../../models/Profile'
import Hotel from '../../models/Hotel'
import schema from '../../../shared/models/schemas/profile'

const ADMIN_ONLY_FIELDS = ['active', 'planId', 'homepageFeatured', 'searchFeatured']

export function canAccess(options, callback) {
  const {user, req} = options
  if (user && user.admin) return callback(null, true)

  const query = JSONUtils.parseQuery(req.query)
  if (query.$include) return callback(null, false, 'No $include')
  if (query.$template === 'admin') return callback(null, false, 'This template is only for admins')

  // Allow editing for the owner of the profile
  if (user && req.method === 'PUT') {
    req.body = _.omit(req.body, ADMIN_ONLY_FIELDS)
    return Profile.exists({id: req.params.id, user_id: user.id}, callback)
  }

  // Profiles are created on the server, not by the client
  if (req.method === 'POST') return callback(null, false)

  if (req.method === 'GET') {
    // Allow access for the owner of the profile
    // if (user && query.user_id === user.id) return callback(null, true)

    return callback(null, true)
  }

  // Disallow, post, delete
  callback(null, false)
}

export default class ProfilesController extends RestController {
  constructor(options) {
    super(options.app, _.defaults({
      model_type: Profile,
      route: '/api/profiles',
      auth: [...options.auth, createAuthMiddleware({canAccess})],
      templates: {
        base: require('../templates/profiles/base'),
        detail: require('../templates/profiles/detail'),
        admin: require('../templates/profiles/admin'),
      },
      default_template: 'detail',
      whitelist: {
        update: ['id', 'hotel_id', ..._.keys(schema)],
      },
      renderOptions: req => ({user: req.user}),
    }, options))

    this.app.get('/api/places', this.citiesByCountry)
    this.app.get('/api/slug', this.slug)
    this.app.get('/api/checkslug', this.checkSlug)
  }

  update(req, res) {
    req.body.updatedDate = new Date()
    if (!req.user.admin) req.body = _.omit(req.body, 'hotel_id')
    super.update(req, res)
  }

  citiesAndCountries(req, res) {
    const queue = new Queue()
    const cities = []
    const countries = []

    queue.defer(callback => Profile.cursor({$unique: 'city', $values: 'city'}).toJSON((err, profileCities) =>
      callback(null, cities.push.apply(cities, profileCities))))
    queue.defer(callback => Profile.cursor({$unique: 'country', $values: 'country'}).toJSON((err, profileCountries) =>
      callback(null, countries.push.apply(countries, profileCountries))))

    queue.defer(callback => Hotel.cursor({$unique: 'city', $values: 'city'}).toJSON((err, orgCities) =>
      callback(null, cities.push.apply(cities, orgCities))))
    queue.defer(callback => Hotel.cursor({$unique: 'country', $values: 'country'}).toJSON((err, orgCountries) =>
      callback(null, countries.push.apply(countries, orgCountries))))

    queue.await(err => {
      if (err) return this.sendError(res, err)
      res.json({cities: _.compact(_.uniq(cities)).sort(), countries: _.compact(_.uniq(countries)).sort()})
    })
  }

  citiesByCountry(req, res) {
    Hotel.cursor({$unique: 'city', $select: ['country', 'city']}).toJSON((err, pairs) => {
      if (err) return callback(err)
      const byCountry = _(pairs)
        .groupBy(p => p.country)
        .mapValues(pairs => _.map(pairs, 'city'))
        .value()
      res.json(byCountry)
    })
  }

  slug(req, res) {
    const {firstName, lastName} = req.query
    if (!firstName || !lastName) return res.status(400).send({error: '{firstName, lastName} are required to generate a slug'})
    Profile.slug({displayName: `${firstName}-${lastName}`}, (err, slug) => {
      if (err) return this.sendError(res, err)
      res.json({slug})
    })
  }

  checkSlug(req, res) {
    const {slug} = req.query
    Profile.exists({slug}, (err, exists) => {
      if (err) return this.sendError(res, err)
      res.json({available: !exists})
    })
  }
}
