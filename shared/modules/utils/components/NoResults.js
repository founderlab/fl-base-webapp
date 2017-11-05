import React from 'react'

export default function renderNoResults() {
  return (
    <div className="icon-message">
      <p className="icon"><i className="fa fa-frown-o" /></p>
      <p>No results found! Try removing some filters</p>
    </div>
  )
}
