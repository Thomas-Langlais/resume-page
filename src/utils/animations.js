export function animateCard(card, rect, style, callback) {

    let top = Math.ceil(rect.top - parseInt(style.marginTop, 10)),
        left = Math.ceil(rect.left - parseInt(style.marginLeft, 10));

    function positionCard() {
        card.style.position = 'fixed';
        card.style.top = top + 'px';
        card.style.left = left + 'px';
        card.style.width = rect.width + 'px';
        card.style.height = rect.height + 'px';
        card.style.boxShadow = 'none';
    
        window.requestAnimationFrame(setCardAnimation);
    }

    function setCardAnimation() {
        card.style.transition = 'width 0.3s ease-out, height 0.3s ease-out, top 0.3s ease-out, left 0.3s ease-out, transform 0.3s ease-out';
    
        window.requestAnimationFrame(executeAnimation)
    }
    
    function executeAnimation() {
        card.style.top = '50%';
        card.style.left = '50%';
        card.style.width = '80%';
        card.style.height = '80%';
        card.style.transform = 'translate(-50%,-50%)';

        if (callback) setTimeout(callback, 300);
    }

    window.requestAnimationFrame(positionCard);
}