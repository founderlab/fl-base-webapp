import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

@connect(state => _.pick(state, 'auth', 'config', 'app'), {})
export default class NavBar extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  }

  render() {
    const {app} = this.props
    const static_page_links = app.get('static_page_links').toJSON()
    const {footer_contact_info, facebook_url, twitter_url, instagram_url} = app.get('settings').toJSON()
    const page_links = static_page_links && _.map(static_page_links, p => (<li key={p.slug}><Link to={`/${p.slug}`}>{p.title}</Link></li>))

    return (
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4">
              <h4>Social Media Links</h4>
              <div className="row">
                <div className="col-xs-12 socialIcons">
                  <a href={facebook_url}><i className="fa fa-facebook-square"></i></a>
                  <a href={twitter_url}><i className="fa fa-twitter-square"></i></a>
                  <a href={instagram_url}><i className="fa fa-instagram"></i></a>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <h4>Other Links</h4>
              <ul>
                {page_links}
                <li><a href="#">Report a Problem</a></li>
              </ul>
            </div>
            <div className="col-sm-4">
              <h4>Contact Us</h4>
              <div dangerouslySetInnerHTML={{__html: footer_contact_info}} />
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
