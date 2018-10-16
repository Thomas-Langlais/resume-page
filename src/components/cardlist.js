import React from 'react';
import '../css/cardlist.css';
import '../css/utils.css'

export default class CardList extends React.Component {

    constructor(props) {
        super(props);

        //set the state of the 
        this.state = {
            items: [],
            focusing: false,
            currentIndex: -1
        }

        //get the overlay
        this.overlay = document.getElementById('overlay');
        
        //boilerplate
        this.register = this.register.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.toggleFocus = this.toggleFocus.bind(this);
        this.updateList = this.updateList.bind(this)
        this.closeOverlay = this.closeOverlay.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.focusing) {
            this.overlay.classList.remove('hidden');
        } else {
            this.overlay.classList.add('hidden');
        }
        return !nextState.focusing;
    }

    render() {
        const cardChildren = 
            React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, {
                    register: this.register,
                    updateList: this.updateList,
                    next: this.next,
                    prev: this.prev
                });
            });

        //fix the overlay bug... as it doesn't work not because of position css attribute
        return (
            <div className={"card-list" + (this.props.className ? " " + this.props.className : "")}>
                {cardChildren}
            </div>
        )
    }

    toggleFocus() {
        this.setState((state) => {
            return Object.assign(state, {focusing: !state.focusing});
        });
    }

    updateList(index) {
        this.overlay.addEventListener('click', this.closeOverlay);
        this.setState((state) => {
            return Object.assign(state, {focusing: !state.focusing, currentIndex: index});
        });
    }

    //register for events on all cards
    register(cardOps) {
        const index = this.state.items.length;

        //this is safe because we are calling register from the constructor of the card
        this.state.items.push(cardOps);

        return index;
    }

    closeOverlay() {
        
        let currentCardOps = this.state.items[this.state.currentIndex];
        currentCardOps.closeCard();
        this.toggleFocus();

        this.overlay.removeEventListener('click', this.closeOverlay);
    }

    //get the next card if exists
    next(index) {
        if (index + 1 < this.state.items.length) {
            this.state.items[index].closeCard();
            this.state.items[index + 1].openCard();
            this.setState((state) => {
                return Object.assign(state, {currentIndex: index+1})
            });
        }
    }

    //get the prev card if exists
    prev(index) {
        if (index > 0) {
            this.state.items[index].closeCard();
            this.state.items[index - 1].openCard();
            this.setState((state) => {
                return Object.assign(state, {currentIndex: index-1});
            });
        }
    }
}