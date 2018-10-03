import React from 'react';
import '../css/card.css';
import '../css/utils.css';

export default class Card extends React.Component {
    //make a car dlist in order to have a better state system to hold card states
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            index: -1
        }

        //refs
        this._card = React.createRef();

        //set this to the React component
        this.openCard = this.openCard.bind(this);
        this.closeCard = this.closeCard.bind(this);

        //register the card in the list to setup its events and fancy hooplah
        this.state.index = this.props.register({
            openCard: this.openCard,
            closeCard: this.closeCard
        });
    }

    //add 2 methods for opening and closing cards
    openCard() {
        this.setState((state) => {
            return Object.assign(state, {isFocused: true});
        });
    }

    closeCard() {
        this.setState((state) => {
            return Object.assign(state, {isFocused: false});
        });
    }

    // componentDidUnmount() {
    //     //window.removeEventListener('resize', this.updateDims);
    // }

    // componentDidMount() {
    //     //window.addEventListener('resize', this.updateDims);
    // }

    // state change isExpanded, set state and change state on btn click
    render() {
        const shouldExpand = this.state.isFocused;

        return (
            <div ref={this._card} className={"card" + (shouldExpand ? " expanded" : "")}>
                
                <div id="cd-title" className="title">
                    {this.props.title}
                </div>
                <hr id="cd-brk" className="line-brk"></hr>
                <div id="cd-content" className="content">
                    {this.props.children}
                </div>
                <div id="cd-btm">
                    { !shouldExpand && (
                    <button id="cd-btn" onClick={function() { this.openCard(); this.props.updateList(this.state.index); }.bind(this)} className="meshed-btn">
                        <i className="fas fa-chevron-down"></i>
                    </button>
                    )}
                    { shouldExpand && (
                    <button id="prev" onClick={function() { this.props.prev(this.state.index);}.bind(this)}>PREV</button>
                    )}
                    { shouldExpand && (
                    <button id="next" onClick={function() { this.props.next(this.state.index);}.bind(this)}>NEXT</button>
                    )}
                </div>
            </div>
        )
    }
}