import React from 'react'
import ReactDOM from 'react-dom'

import {animateCard} from '../utils/animations'
import {createOneTimeEvent} from '../utils/utils'
import '../css/cardlist.css'
import '../css/card.css'
import '../css/utils.css'


class Card extends React.Component {

    render() {
        
        const { isFocused, next, prev, shallow, staticCard } = this.props;
        const shouldShowBtns = isFocused || next || prev;

        return (
            <div className={"card" + ((shouldShowBtns && !staticCard) || isFocused ? " expanded" : '') + (shouldShowBtns && !staticCard && next ? " next" : '') + (shouldShowBtns && !staticCard && prev ? " prev" : '')}
                style={shallow ? {visibility: 'hidden'} : {}}>
                { !shallow &&
                <div className="wrapper">
                    <div id="cd-title" className="title">
                        {this.props.title}
                    </div>
                    <hr id="cd-brk" className="line-brk"></hr>
                    <div id="cd-content" className="content">
                        {this.props.children}
                    </div>
                    <div id="cd-btm">
                        { staticCard && (
                        <button id="cd-btn" className="meshed-btn no-bkg" onClick={this.props.metadata.focusInto}>
                            <i className="fas fa-chevron-down"></i>
                        </button>
                        )}
                        { !staticCard && shouldShowBtns && !this.props.metadata.isFirst && (
                        <button id="prev" className="meshed-btn no-bkg" 
                                onClick={this.props.metadata.prev}>
                            PREV
                        </button>
                        )}
                        { !staticCard && shouldShowBtns && !this.props.metadata.isLast && (
                        <button id="next" className="meshed-btn" 
                                onClick={this.props.metadata.next}>
                            NEXT
                        </button>
                        )}
                    </div>
                </div>
                }
            </div>
        );
    }
}

class CardList extends React.Component {

    state = {
        //animating: false,
        animateIn: false,
        animateOut: false,
        focusing: false,
        indexOfCardFocused: -10000
    }

    render() {
        
        const { indexOfCardFocused,animateIn,animateOut,focusing } = this.state;

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
                    
                    //force the DOM to not scroll when focused
                    document.body.style.overflow = 'hidden';
                    this.component.setState({animateIn: true, indexOfCardFocused: this.meta.index});

                }.bind({component: this, meta: meta});
                
                meta.next = function() {

                    this.component.setState({indexOfCardFocused: this.meta.index + 1});

                }.bind({component: this, meta: meta});
                
                meta.prev = function() {

                    this.component.setState({indexOfCardFocused: this.meta.index - 1});
                }.bind({component: this, meta: meta});
                

                return meta;
            }, this)
        );

        let i = 0, uId = 0;
        const staticChildren = [], 
            modalChildren = [];

        React.Children.forEach(this.props.children, (child) => {
            
            const index = i++;
            const metadata = childrenMetaData[index];
            const ref = this.CARD_REF + index;
            const isFocused = this.state.indexOfCardFocused === index;
            
            if (isFocused) {
                staticChildren.push(<Card ref={this.HOLLOW} shallow key={uId++}/>)
            }

            staticChildren.push(React.cloneElement(child, {
                key: uId,
                staticCard: true,
                metadata, ref, isFocused,
                next: this.state.indexOfCardFocused === index - 1,
                prev: this.state.indexOfCardFocused === index + 1
            }));

            if (indexOfCardFocused >= 0 && focusing && !(animateIn && animateOut)) {
                modalChildren.push(React.cloneElement(child, {
                    key: uId,
                    staticCard: false,
                    metadata, isFocused,
                    next: this.state.indexOfCardFocused === index - 1,
                    prev: this.state.indexOfCardFocused === index + 1
                }));
            }

            uId++;
        });

        return (
            <div className={"card-list" + (this.props.className ? " " + this.props.className : "")}>
                <div id="static">{staticChildren}</div>
                {indexOfCardFocused >= 0 && focusing && !(animateIn && animateOut) &&
                <div id="modal">{modalChildren}</div>
                }
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        //get the cached overlay
        const overlay = this.componentDidUpdate.overlay ||
            (this.componentDidUpdate.overlay = document.getElementById('overlay'));

        //if animating in
        if (this.state.animateIn && !prevState.animateIn) {

            const { indexOfCardFocused } = this.state;
            //get the two cards
            const hollowCard = ReactDOM.findDOMNode(this.refs[this.HOLLOW]),
                actualCard = ReactDOM.findDOMNode(this.refs[this.CARD_REF+indexOfCardFocused]);
            
            const rect = hollowCard.getBoundingClientRect(),
                style = hollowCard.currentStyle || window.getComputedStyle(hollowCard)

            overlay.classList.remove('hidden');
            animateCard.in(actualCard, rect, style, () => {
                //reset and add modal div
                this.setState({animateIn: false, focusing: true});

                //setup the overlay to show and hide after
                createOneTimeEvent(
                    overlay, 
                    'click',
                    () => true, 
                    () => {
                        //begin the exit animation
                        this.setState({animateOut: true, focusing: false});
                    }
                );
                
                //force the DOM to not scroll when focused
                document.body.style.overflow = 'hidden';
            });
        }
        //if animating out
        if (this.state.animateOut && !prevState.animateOut) {
            
            const { indexOfCardFocused } = this.state;
            //get the two cards
            const hollowCard = ReactDOM.findDOMNode(this.refs[this.HOLLOW]),
                actualCard = ReactDOM.findDOMNode(this.refs[this.CARD_REF+indexOfCardFocused]);
            
            const rect = hollowCard.getBoundingClientRect(),
                style = hollowCard.currentStyle || window.getComputedStyle(hollowCard)

            animateCard.out(actualCard, rect, style, () => {

                this.setState({animateOut: false, indexOfCardFocused: -10000})
                overlay.classList.add('hidden');
                document.body.style.overflow = '';
            })
        }
    }
}

CardList.prototype.CARD_REF = 'card-ref';
CardList.prototype.HOLLOW = 'hollow-ref';

export { CardList, Card }