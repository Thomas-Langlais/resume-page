import React from 'react';
import '../css/card.css';
import '../css/utils.css';

export default class Card extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            location: {
                top: 0,
                left: 0
            }
        }

        this.expandCard = this.expandCard.bind(this);
    }

    componentDidMount() {
        
    }

    expandCard() {
        this.setState(state => (Object.assign(state, {isFocused: !state.isFocused})));
    }

    // state change isExpanded, set state and change state on btn click
    render() {
        const shouldExpand = this.state.isFocused;
        return (
            <div ref={(el) => this._self = el}className={"card" + (shouldExpand ? " expanded" : "")}>
                <div id="cd-title" className="title">
                    {this.props.title}
                </div>
                <hr id="cd-brk" className="line-brk"></hr>
                <div id="cd-content" className="content">
                    {this.props.children}
                </div>
                <button id="cd-btn" onClick={this.expandCard} className="meshed-btn">
                    <i className="fas fa-chevron-down"></i>
                </button>
            </div>
        )
    }
}