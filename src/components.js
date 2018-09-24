import React from 'react';

class Section extends React.Component {
    render() {
        if (!this.props.idProp) {
            return (
                <div className="section">
                    <h3 className="title">{this.props.title}</h3>
                </div>
            )
        }
        return (
            <div id={this.props.idProp} className="section">
                <h3 className="title">{this.props.title}</h3>
            </div>
        )
    }
}


export default Section