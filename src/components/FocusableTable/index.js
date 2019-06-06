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

    let months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]

    const { data } = this.props
    const { index } = this.state

    var items = data.map((project, i) => {

      let className = '';

      if (i === index) {
        className += ' focusable-item--focused'
      }

      let date;
      if (project.dateRange && project.dateRange.length == 2) {
        let range = project.dateRange.map(str => new Date(str))
        date = `${months[range[0].getMonth()]}, ${range[0].getFullYear()} - ${months[range[1].getMonth()]}, ${range[1].getFullYear()}`
      } else {
        date = new Date(project.date)
        date = `${months[date.getMonth()]}, ${date.getFullYear()}`
      }
      
      return (<Card key={i} className={'focusable-item' + className} noButton onClick={(e) => {
        this.setState({
          index: i
        })
        console.log('changing project view...')
      }}>
        <div className='focusable-item__title-content'>
          <div className='focusable-item__title'>{project.name}</div>
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
      let range = project.dateRange.map(str => new Date(str))
      date = `${months[range[0].getMonth()]}, ${range[0].getFullYear()} - ${months[range[1].getMonth()]}, ${range[1].getFullYear()}`
    } else {
      date = new Date(project.date)
      date = `${months[date.getMonth()]}, ${date.getFullYear()}`
    }

    let skills = project.skills.map((skill, i) => <div key={i} className='focused-skill'>
      {skill}
    </div>)

    let paragraphs = project.paragraphs.map((paragraph, i) =>
      <div key={i} className='focused-content__paragraph'>
        {paragraph}
      </div>
    )

    return (<div className={'focusable-table' + className}>
      <div className='focusable-table__items' >
        {items}
      </div>
      <Card className='focusable-table__focused' noButton>
        <div className='focused-content'>
          <div className='focused-content__header'>
            <div className='focused-content__title'>{project.name}</div>
            <div className='focused-content__type'>{project.type}</div>
            <div className='focused-content__date'>{date}</div>
          </div>
          <div className='focused-content__paragraphs'>
            {paragraphs} 
          </div>
        </div>
        <div className='focused-skills'>
          <div className='focused-skills__title'>Skills</div>
          <div className='focused-skills__content'>
            {skills}
          </div>
        </div>
      </Card>
    </div>)
  }
}

export default FocusableTable