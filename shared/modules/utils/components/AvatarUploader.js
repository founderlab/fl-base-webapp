import _ from 'lodash' // eslint-disable-line
import React from 'react'
import PropTypes from 'prop-types'
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'
import {Row, Col, FormGroup, ControlLabel, HelpBlock, ProgressBar} from 'react-bootstrap'
import {S3Image} from 'fl-react-utils'
import Avatar from '../components/Avatar'

const MAX_FILE_SIZE = 1024 * 1024 * 10 //10mb

export default class AvatarUploader extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    size: PropTypes.string,
    style: PropTypes.object,
    help: PropTypes.string,
    validationState: PropTypes.string,
    filename: PropTypes.string,
    profile: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
    autoSave: PropTypes.bool,
  }

  static contextTypes = {
    s3Url: PropTypes.string,
  }

  state = {editing: false}

  handleToggleEdit = () => {
    this.setState({editing: !this.state.editing})
  }

  handleFinishedUpload = info => {
    this.setState({editing: false})
    this.props.input.onChange(info.filename)
    if (!this.props.autoSave) return
    const profile = _.assign({}, this.props.profile, {avatarImage: info.filename})
    this.props.save(profile, err => {
      if (err) console.log(err)
    })
  }

  renderUploadedFile = () => (<div className="avatar"><S3Image className="avatar" filename={this.props.input.value} /></div>)

  render() {
    const {name, label, help, validationState} = this.props
    const style = this.props.style || {}

    const uploaderProps = {
      style,
      maxSize: MAX_FILE_SIZE,
      s3Url: this.context.s3Url,
      host: this.context.url,
      progressComponent: ({progress}) => (<ProgressBar to={progress} />),
    }

    const filename = this.props.input.value
    const FileComponent = this.renderUploadedFile

    return (
      <FormGroup className="profile-editor text-center" controlId={name} validationState={validationState}>
        <Row>
          <Col xs={12}>
            {label && <ControlLabel>{label}</ControlLabel>}
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <DropzoneS3Uploader onFinish={this.handleFinishedUpload} {...uploaderProps}>
              {filename ? (
                <FileComponent />
              ) : (
                <Avatar source={this.props.profile} size={80} />
              )}
            </DropzoneS3Uploader>
          </Col>
        </Row>
        <Row>
          {help && <HelpBlock>{help}</HelpBlock>}
        </Row>
      </FormGroup>
    )
  }
}
