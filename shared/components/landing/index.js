import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import LoginActions from '../../actions/login'
import Login from 'fl-auth-client/components/login'

@connect((state) => ({login: state.login}))
export default class Landing extends React.Component {

  render() {
    const {login, dispatch} = this.props

    return (
      <div className="holds-max-height">
        <header>
          <div className="header-content">
            <div className="header-content-inner">
              <h1>FounderLab project</h1>
              <hr />
              <p>subtext goes here</p>
              <a href="#about" className="btn btn-primary btn-xl page-scroll">Find Out More</a>
            </div>
          </div>
        </header>

        <section className="bg-primary" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 text-center">
                <h2 className="section-heading">Landing page heading</h2>
                <hr className="light" />
                <p className="text-faded">Some explanation or whatever</p>
                <a href="#" className="btn btn-default btn-xl">Call to Action</a>
              </div>
            </div>
          </div>
        </section>

      </div>
    )
  }

}
