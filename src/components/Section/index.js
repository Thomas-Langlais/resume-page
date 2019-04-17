import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Section.scss';

class Section extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired
  }

  render() {

    const { id, children } = this.props;

    return (
      <section id={id} className="Section">
        {children}
      </section>
    );
  }
}

export default Section;