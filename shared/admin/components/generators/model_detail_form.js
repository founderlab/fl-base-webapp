import _ from 'lodash'
import React, {PropTypes} from 'react'
import {Button, Glyphicon} from 'react-bootstrap'
import {reduxForm} from 'redux-form'
import ModelFieldInput from '../model_field_input'

export class ModelDetailForm extends React.Component {

  static propTypes = {
    model: PropTypes.object,
    model_admin: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    handleDelete: PropTypes.func,
  }

  render() {
    const {model_admin, handleDelete, fields, handleSubmit} = this.props
    const inputs = []

    _.forEach(fields, (field, name) => {
      const model_field = model_admin.fields[name]
      inputs.push(<ModelFieldInput key={name} size="large" model_field={model_field} form_field={field} />)
    })

    return (
      <div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <form>
                  {inputs}
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2">
                <Button bsStyle="danger" bsSize="xsmall" onClick={handleDelete}><Glyphicon glyph="remove" /></Button>
              </div>
              <div className="col-xs-2 col-xs-offset-8">
                <Button className="pull-right" bsStyle="primary" onClick={handleSubmit}>Save</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default function createModelDetailForm(model) {
  return reduxForm(
    {
      form: 'model_detail',
    },
    () => {
      return {
        initialValues: model,
      }
    }
  )(ModelDetailForm)
}
