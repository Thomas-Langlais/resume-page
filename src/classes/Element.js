import createId from '../utils/createId'

export default class Element {

    constructor(options) {
        this.id = createId()
        this.elem = options.parallaxItem
        this.props = options.props
        this.parallaxDetails = {
            top: null,
            sticky: null,
            nextElem: null,
            prevElem: null
        }
    }

    updateDetails({top, sticky, nextElem, prevElem}) {
        this.parallaxDetails = { top, sticky, nextElem, prevElem }
    }
}