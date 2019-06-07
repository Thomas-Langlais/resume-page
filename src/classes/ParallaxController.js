import Element from './Element'

function ParallaxController({ scrollContainer }) {
    
    let elements = []

    this.createElement = function(options) {
        const newElement = new Element(options)
        elements = [ ...elements, newElement ]
        return newElement
    }

    this.destroy = function() {
        elements = undefined;
    }
}

export default ParallaxController