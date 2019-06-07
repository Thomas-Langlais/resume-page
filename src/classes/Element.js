import createId from '../utils/createId'

export default class Element {

    constructor(options) {
        this.elem = options.parallaxItem
        this.props = options.props
        this.id = createId()
    }

}