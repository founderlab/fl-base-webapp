import _ from 'lodash' // eslint-disable-line
import React from 'react'
import PropTypes from 'prop-types'
import {Input} from 'fl-react-utils'

export default class SearchBox extends React.Component {

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string.isRequired,
    keyupDelay: PropTypes.number,
    itemsPerPage: PropTypes.number,
    minSearchLength: PropTypes.number,
    searchString: PropTypes.string,
  }

  static defaultProps = {
    minSearchLength: 3,
    placeholder: 'Search by name',
    keyupDelay: 1000,
  }

  constructor() {
    super()
    this.state = {searchValue: ''}
  }

  focus = () => {
    this._input.focus()
  }

  handleSearchChange = event => {
    if (this.state.searchTimeout) clearTimeout(this.state.searchTimeout)
    const searchValue = event.target.value
    if (this.state.searchValue && searchValue === this.state.searchValue) return
    if (searchValue.length > 0 && searchValue.length < this.props.minSearchLength) return

    const searchTimeout = setTimeout((value => () => this.props.onSearch(value))(searchValue), this.props.keyupDelay)

    this.setState({searchTimeout, searchValue})
  }

  render() {
    const inputProps = {
      placeholder: this.props.placeholder,
      onChange: this.handleSearchChange,
      inputRef: c => this._input = c,
      onBlur: this.props.onBlur,
    }

    return (
      <div className="search-header-box">
        <Input
          type="search"
          defaultValue={this.props.searchString}
          inputProps={inputProps}
          standalone
        />
      </div>
    )
  }
}
