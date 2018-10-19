import React from 'react'
import ReactDOM from 'react-dom'
import {createOneTimeEvent} from '../utils/utils'
import '../css/cardlist.css'
import '../css/card.css'
import '../css/utils.css'

class Card extends React.Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     isFocused: false
        // };

        this.openCard = this.openCard.bind(this);
        this.closeCard = this.closeCard.bind(this);
    }

    render() {
        const shouldExpand = this.props.isFocused;

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
                            onClick={this.props.metadata.focusInto}>
                            <i className="fas fa-chevron-down"></i>
                        </button>
                        )}
                        { shouldExpand && !this.props.metadata.isFirst && (
                        <button id="prev" onClick={this.props.metadata.next}>PREV</button>
                        )}
                        { shouldExpand && !this.props.metadata.isLast && (
                        <button id="next" onClick={this.props.metadata.prev}>NEXT</button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

class CardList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            focusing: false,
            indexOfCardFocused: -1
        };

    }

    render() {
        //setup cache if doesn't exist
        (this.render.cache || (this.render.cache = {}));
        
        //get the cached overlay
        const overlay = this.render.cache.overlay ||
            (this.render.cache.overlay = document.getElementById('overlay'));
        
        const childrenMetaData = this.metaData || (this.metaData =
            this.props.children.map((child,i,arr) => {

                var meta = {
                    index: i,
                    length: arr.length,
                    get isLast() {
                        return this.index+1 === this.length
                    },
                    get isFirst() {
                        return this.index === 0
                    }
                };

                meta.focusInto = function() {
                    //setup the overlay to show and hide after
                    overlay.classList.remove('hidden');
                    createOneTimeEvent(
                        overlay, 
                        'click',
                        () => true, 
                        () => {
                            overlay.classList.add('hidden');
                            document.body.style.overflow = '';
                            // this.parent.refs[this.parent.CARD_REF+this.parent.state.indexOfCardFocused].closeCard();
                            this.component.setState(state => Object.assign(state, {focusing: false, indexOfCardFocused: -1}));
                        }
                    );

                    //force the DOM to not scroll when focused
                    document.body.style.overflow = 'hidden';
                    //try and get an animation going here...
                    this.component.setState(state => Object.assign(state, {focusing: true, indexOfCardFocused: this.meta.index}));
                }.bind({component: this, meta: meta});
                
                meta.next = function() {

                }.bind({component: this, meta: meta});
                
                meta.prev = function() {

                }.bind({component: this, meta: meta});
                

                return meta;
            }, this)
        );

        let i = 0;
        const children = React.Children.map(this.props.children, (child) => {
            const index = i++;
            const metadata = childrenMetaData[index],
                ref = this.CARD_REF + index;

            return React.cloneElement(child, {metadata: metadata, ref: ref, isFocused: this.state.indexOfCardFocused === index});
        });

        return (
            <div className={"card-list" + (this.props.className ? " " + this.props.className : "")}>
                {children}
            </div>
        );
    }
}

CardList.prototype.CARD_REF = 'card-ref';

export {CardList,Card}