import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '../Card'
import hasOverflown from '../../utils/hasOverflown'

// FIXME: add responsiveness and skills fixes as it sucks on mobile right now
import './FocusableTable.scss'      

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

class FocusableTable extends Component {

  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object)
  }

  // removed the overflown state as it was causing rendering jank
  state = {
    index: 0
  }

  constructor(props) {
    super(props)

    window.addEventListener('load', this._handleContent)
    window.addEventListener('resize', this._handleContent)
  }

  _handleContent = () => {
    
    const { content } = this.refs
    if (hasOverflown(content)) {
      content.style.overflowY = 'scroll'
    } else {
      content.style.overflowY = 'hidden'
    }
  }

  _handleClick = (index) => () => {
    this.setState({
      index: index
    })
  }

  shouldComponentUpdate(nextProps, nextState) {

    const { index } = this.state

    if (index !== nextState.index) {
      return true
    }

    return false
  }

  // update the overflow object
  componentDidUpdate() {

    this._handleContent()
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
      if (project.dateRange && project.dateRange.length === 2) {
        let range = project.dateRange.map(str => new Date(str))
        date = `${months[range[0].getMonth()]}, ${range[0].getFullYear()} - ${months[range[1].getMonth()]}, ${range[1].getFullYear()}`
      } else {
        date = new Date(project.date)
        date = `${months[date.getMonth()]}, ${date.getFullYear()}`
      }
      
      return (<Card key={i} className={'focusable-item' + className} noButton onClick={this._handleClick(i)}>
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
    if (project.dateRange && project.dateRange.length === 2) {
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
          <div className='focused-content__paragraphs' ref='content'>
            {paragraphs} 
          </div>
        </div>
        <div className='focused-skills'>
          <div className='focused-skills__title'>Skills</div>
          <div className='focused-skills__content'>
          {/* TODO: add functionality to add the svgs */}
            {skills}
          </div>
        </div>
      </Card>
    </div>)
  }
}

export default FocusableTable