import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

@connect(state => _.pick(state, 'auth', 'config', 'app'), {})
export default class Navbar extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  }

  render() {
    const {app} = this.props
    const staticPageLinks = app.get('staticPageLinks').toJSON()
    const {footerContactInfo, facebookUrl, twitterUrl, instagramUrl} = app.get('settings').toJSON()
    const pageLinks = staticPageLinks && _.map(staticPageLinks, p => (<li key={p.slug}><Link to={`/${p.slug}`}>{p.title}</Link></li>))

    return (
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4">
              <div className="row">
                <div className="col-xs-12 social-icons">
                  <a href={facebookUrl}><i className="fa fa-facebook-square"></i></a>
                  <a href={twitterUrl}><i className="fa fa-twitter-square"></i></a>
                  <a href={instagramUrl}><i className="fa fa-instagram"></i></a>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <ul>
                {pageLinks}
              </ul>
            </div>
            <div className="col-sm-4">
              <div dangerouslySetInnerHTML={{__html: footerContactInfo}} />
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
