import _ from 'lodash' // eslint-disable-line
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Link} from 'react-router'
import Gravatar from 'react-gravatar'
import {S3Image} from 'fl-react-utils'
import Icon from '../../utils/components/Icon'

export default class Avatar extends React.Component {

  static propTypes = {
    source: PropTypes.object,
    profile: PropTypes.object,
    hotel: PropTypes.object,
    size: PropTypes.number.isRequired,
    linked: PropTypes.bool,
    className: PropTypes.string,
    defaultIcon: PropTypes.string,
    getLink: PropTypes.func,
    bordered: PropTypes.bool,
    small: PropTypes.bool,
    smaller: PropTypes.bool,
  }

  static defaultProps = {
    size: 150,
    getLink: source => `/agents/${source.slug}`,
    defaultIcon: 'user',
  }

  render() {
    const {className, size} = this.props
    const source = this.props.source || this.props.profile || this.props.hotel
    let image = null
    let fallback = (
      <div className="avatar-backup">
        <Icon root="/public" icon={this.props.defaultIcon} />
      </div>
    )

    if (source.avatarUrl) {
      image = (<img className="avatar-image" src={source.avatarUrl} />)
      fallback = null
    }
    else if (source.avatarImage || source.logoImage) {
      image = (<S3Image className="avatar-image" filename={source.avatarImage || source.logoImage} />)
      fallback = null
    }
    else if (source.emailMd5) {
      image = (
        <div>
          <Gravatar alt={null} md5={source.emailMd5} size={size} default="blank" />
        </div>
      )
    }

    const classes = classNames(className, {
      avatar: true,
      hotel: this.props.hotel,
      bordered: this.props.bordered,
      small: this.props.small,
      smaller: this.props.smaller,
    })

    return (
      <div className={classes}>
        {this.props.linked ? (
          <Link to={this.props.getLink(source)}>
            {image}
            {fallback}
          </Link>
        ) : (
          <div>
            {image}
            {fallback}
          </div>
        )}
      </div>
    )
  }
}
