import _ from 'lodash' // eslint-disable-line
import maxmind from 'maxmind'

export default function geoIp(req, res) {
  let ip = req.query.ip || req.ip

  if (process.env.NODE_ENV === 'development' && ip === '127.0.0.1') {
    ip = '8.8.8.8'
  }

  try {
    const cityLookup = maxmind.open(process.env.MAXMIND_GEOIP_CITY)
    const cityInfo = cityLookup.get(ip)

    if (cityInfo) {
      const json = {
        city: {
          name: cityInfo.city.names.en,
        },
        country: {
          name: cityInfo.country.names.en,
          isoCode: cityInfo.country.iso_code,
        },
        postCode: cityInfo.postal.code,
      }

      if (req.query.extended) {
        json.location = cityInfo.location
        json.subdivisions = cityInfo.subdivisions
      }
      return res.json(json)
    }

    res.status(404).send()
  }
  catch (err) {
    console.log('[geoIp] error:', err)
    res.status(500).send('Error looking up ip')
  }
}
