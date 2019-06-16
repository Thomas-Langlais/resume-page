
/**
 * This function is used for checking whether an element as overflown
 * it's container
 * 
 * This is useful for the project table and the cards in order to activate
 * certain elements
 *
 * @param {Element} elem: DOM node used to be tested for overflow
 * @returns {Boolean}
 */
function hasOverflown(elem) {
    return elem.scrollHeight > elem.clientHeight || elem.scrollWidth > elem.clientWidth
}

export default hasOverflown