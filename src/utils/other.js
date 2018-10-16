
//tried using this snippet for zoom in the card
let card = ReactDOM.findDOMNode(this.parent.refs[this.ref]);
let rect = card.getBoundingClientRect();
let style = card.currentStyle || window.getComputedStyle(card);
let parent = this.parent;

function positionCard(ts) {
    card.style.position = 'fixed';
    card.style.top = Math.ceil(rect.top - parseInt(style.marginTop, 10)) + 'px';
    card.style.left = Math.ceil(rect.left - parseInt(style.marginLeft, 10)) + 'px';
    card.style.width = rect.width + 'px';
    card.style.boxShadow = 'none';

    window.requestAnimationFrame(setCardAnimation);
}

function setCardAnimation(ts) {
    card.style.transition = 'width 0.3s ease-in-out, height 0.3s ease-in-out, top 0.3s ease-in-out, left 0.3s ease-in-out';

    window.requestAnimationFrame(executeAnimation)
}

function executeAnimation(ts) {
    card.style.top = '50%';
    card.style.left = '50%';
    card.style.width = '80%';
    card.style.height = '80%';
    card.style.transform = 'translate(-50%,-50%)';

    parent.setState(state => Object.assign(state, {focusing: true}))
}

window.requestAnimationFrame(positionCard);