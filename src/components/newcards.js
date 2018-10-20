import React from 'react'
import {createOneTimeEvent} from '../utils/utils'
import '../css/cardlist.css'
import '../css/card.css'
import '../css/utils.css'

const Card = (props) => {

    const shouldExpand = props.isFocused;
    const next = props.next;
    const prev = props.prev;
    const shouldShowBtns = shouldExpand || next || prev;

    return (
        <div className={"card" + (shouldExpand ? " expanded" : "") + (next ? " expanded next" : "") + (prev ? " expanded prev" : "")}>
            <div className="wrapper">
                <div id="cd-title" className="title">
                    {props.title}
                </div>
                <hr id="cd-brk" className="line-brk"></hr>
                <div id="cd-content" className="content">
                    {props.children}
                </div>
                <div id="cd-btm">
                    { !shouldShowBtns && (
                    <button id="cd-btn" className="meshed-btn no-bkg"
                        onClick={props.metadata.focusInto}>
                        <i className="fas fa-chevron-down"></i>
                    </button>
                    )}
                    { shouldShowBtns && !props.metadata.isFirst && (
                    <button id="prev" className="meshed-btn no-bkg" 
                            onClick={props.metadata.prev}>
                        PREV
                    </button>
                    )}
                    { shouldShowBtns && !props.metadata.isLast && (
                    <button id="next" className="meshed-btn" 
                            onClick={props.metadata.next}>
                        NEXT
                    </button>
                    )}
                </div>
            </div>
        </div>
    );
}


class CardList extends React.Component {

    state = {
        focusing: false,
        indexOfCardFocused: -10000
    };

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
                            this.component.setState(state => Object.assign(state, {focusing: false, indexOfCardFocused: -10000}));
                        }
                    );

                    //force the DOM to not scroll when focused
                    document.body.style.overflow = 'hidden';
                    //try and get an animation going here...
                    this.component.setState(state => Object.assign(state, {focusing: true, indexOfCardFocused: this.meta.index}));
                    
                }.bind({component: this, meta: meta});
                
                meta.next = function() {

                    this.component.setState(state => 
                        Object.assign(state, {
                            indexOfCardFocused: this.meta.index + 1
                        })
                    );

                }.bind({component: this, meta: meta});
                
                meta.prev = function() {

                    this.component.setState(state => 
                        Object.assign(state, {
                            indexOfCardFocused: this.meta.index - 1
                        })
                    );
                }.bind({component: this, meta: meta});
                

                return meta;
            }, this)
        );

        let i = 0;

        return (
            <div className={"card-list" + (this.props.className ? " " + this.props.className : "")}>
                {React.Children.map(this.props.children, (child) => {
                    const index = i++;
                    const metadata = childrenMetaData[index];
                    const ref = this.CARD_REF + index;
                    const currentCard = this.state.indexOfCardFocused === index;
        
                    return React.cloneElement(child, {
                        metadata: metadata,
                        ref: ref,
                        isFocused: currentCard,
                        next: this.state.indexOfCardFocused === index - 1,
                        prev: this.state.indexOfCardFocused === index + 1
                    });
                })}
            </div>
        );
    }
}

CardList.prototype.CARD_REF = 'card-ref';

export {CardList,Card}