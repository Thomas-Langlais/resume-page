import React from 'react'
import ReactDOM from 'react-dom'
import '../css/cardlist.css'
import '../css/card.css'
import '../css/utils.css'

class Card extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isFocused: false
        };

        this.openCard = this.openCard.bind(this);
        this.closeCard = this.closeCard.bind(this);
    }

    render() {
        const shouldExpand = this.state.isFocused;

        return (
            <div className={"card" + (shouldExpand ? " expanded" : "")}>
                <div className="wrapper">
                    <div id="cd-title" className="title">
                        {this.props.title}
                    </div>
                    <hr id="cd-brk" className="line-brk"></hr>
                    <div id="cd-content" className="content">
                        {this.props.children}
                    </div>
                    <div id="cd-btm">
                        { !shouldExpand && (
                        <button id="cd-btn" className="meshed-btn"
                            onClick={this.openCard}>
                            <i className="fas fa-chevron-down"></i>
                        </button>
                        )}
                        { shouldExpand && !this.props.metadata.isFirst && (
                        <button id="prev">PREV</button>
                        )}
                        { shouldExpand && !this.props.metadata.isLast && (
                        <button id="next">NEXT</button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    openCard() {
        this.setState(state => Object.assign(state, {isFocused: true}));
        this.props.metadata.focusInto();
    }

    closeCard() {
        this.setState(state => Object.assign(state, {isFocused: false}));
    }
}

class CardList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            focusing: false,
            indexOfCardFocused: -1
        };

        this.closeCard = this.closeCard.bind(this);
    }

    render() {
        
        const childrenMetaData = this.metaData || (this.metaData =
            this.props.children.map((child,i,arr) => {
                return {
                    index: i,
                    length: arr.length,
                    ref: this.CARD_REF + i,
                    parent: this,
                    get isLast() {
                        return this.index+1 < this.length
                    },
                    get isFirst() {
                        return this.index === 0
                    },
                    focusInto: function() {

                        document.getElementById('navbar').style.visibility = 'hidden';
                        document.body.style.overflow = 'hidden';
                        this.parent.setState(state => Object.assign(state, {focusing: true, indexOfCardFocused: this.index}));
                    },
                    next: function() {

                    },
                    prev: function() {

                    }
                };
            })
        );

        let i = 0;
        const children = React.Children.map(this.props.children, (child) => {
            const index = i++;
            const metadata = childrenMetaData[index],
                ref = this.CARD_REF + index;

            return React.cloneElement(child, {metadata: metadata, ref: ref});
        });

        return (
            <div>
                <div id="cd-overlay" className={!this.state.focusing ? "hidden" : ""} onClick={this.closeCard}></div>
                <div className={"card-list" + (this.props.className ? " " + this.props.className : "")}>
                    {children}
                </div>
            </div>
        );
    }

    closeCard() {
        
        document.getElementById('navbar').style.visibility = '';
        document.body.style.overflow = '';
        this.refs[this.CARD_REF+this.state.indexOfCardFocused].closeCard();
        this.setState(state => Object.assign(state, {focusing: false, indexOfCardFocused: -1}));
    }
}

CardList.prototype.CARD_REF = 'card-ref';

export {CardList,Card}