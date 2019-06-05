import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '../Card'

import './FocusableTable.scss'

class FocusableTable extends Component {

  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object)
  }

  state = {
    index: 0
  }

  render() {

    const { data } = this.props
    const { index } = this.state

    var items = data.map((project, i) => {

      let className = '';

      if (i === index) {
        className += ' focusable-item--focused'
      }

      let date;
      if (project.dateRange && project.dateRange.length == 2) {
        date = 'tbd-range'
      } else {
        date = 'tbd'
      }
      
      return (<Card className={'focusable-item' + className} noButton>
        <div className='focusable-item__title-content'>
          <div classNam='focusable-item__title'>{project.name}</div>
        </div>
        <div className='focusable-item__content'>
          <div className='focusable-item__date'>{date}</div>
          <div className='focusable-item__type'>{project.type}</div>
        </div>
      </Card>)
    });

    let project = data[index]
    let className = this.props.className ? ' ' + this.props.className : ''

    let date;
    if (project.dateRange && project.dateRange.length == 2) {
      date = 'tbd-range'
    } else {
      date = 'tbd'
    }

    return (<div className={'focusable-table' + className}>
      <div className='focusable-table__items' >
        {items}
      </div>
      <Card className='focusable-table__focused' noButton>
        <div className='focused-content '>
          <div className='focused-content__title'>{project.name}</div>
          <div className='focused-content__type'>{project.type}</div>
          <div className='focused-content__date'>{date}</div>
          <div className='focused-content__paragraphs'>
            { project.paragraphs.map(paragraph => {
              return <div className='focused-content__paragraph'>
                {paragraph}
              </div>
            })} 
          </div>
        </div>
        <div className='focused-skills'>
          { project.skills.map(skill => {
            return <div className='focused-skills__skill'>
              {skill}
            </div>
          })}
        </div>
      </Card>
    </div>)
  }
}

export default FocusableTable