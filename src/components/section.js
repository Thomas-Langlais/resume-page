import React from 'react';
import '../css/section.css';
import '../css/utils.css';

// Section needs to have state in order to react when the Window is on the next section
export default class Section extends React.Component {
    render() {
        return (
            <div id={this.props.id} className="section">
                <div className="center-blk restrict-sz">
                    <div id="sec-ctnt" className="align-blk">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}