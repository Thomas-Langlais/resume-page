import Element from './Element'

function ParallaxController({ scrollContainer }) {
    
    let elements = []

    // set the dom loaded event
    document.addEventListener('DOMContentLoaded', () => {
        console.log('elements', elements)
        console.log('scrollContainer', scrollContainer)
        _initParallax(scrollContainer, elements)
    })

    this.createElement = function(options) {
        const newElement = new Element(options)
        elements = [ ...elements, newElement ]
        return newElement
    }

    this.destroy = function() {
        elements = undefined;
    }

    function _initParallax(container, elements) {
        let sticky = false;

        let scrollElem = container ? container : document.body

        // for parallax to function on microsoft edge
        // there needs to be a fixed node in the body
        _edgeFix()

        for (let i = 0; i < elements.length; i++) {
            let elementObj = elements[i]
            let elem = elementObj.elem
            let containerElem = elem.parentNode

            if (getComputedStyle(containerElem).overflow != 'visible') {
                console.error('Need non-scrollable container to apply perspective for', elem);
                continue;
            }
            if (container && containerElem.parentNode != container) {
                console.warn('Currently we only track a single overflow clip, but elements from multiple clips found.', elem);
            }

            let container = containerElem.parentNode
            if (getComputedStyle(container).overflow == 'visible') {
                console.error('Parent of sticky container should be scrollable element', elem);
            }
            
            // FIXME: needs updating
            var perspectiveElement;
            if (sticky || getComputedStyle(container).webkitOverflowScrolling) {
                sticky = true;
                perspectiveElement = containerElem;
            } else {
                perspectiveElement = container;
                containerElem.style.transformStyle = 'preserve-3d';
            }
            perspectiveElement.style.perspectiveOrigin = 'bottom right';
            perspectiveElement.style.perspective = '1px';
            if (sticky)
                elem.style.position = '-webkit-sticky';
            if (sticky)
                elem.style.top = '0';
            elem.style.transformOrigin = 'bottom right';
        
            if (i === 0 && i !== elements.length - 1) {
                elementObj.updateDetails({
                    top: elem.offsetTop,
                    sticky: !!sticky,
                    nextElem: elements[i+1].elem,
                    prevElem: null
                })
            } else if (i === 0) {
                elementObj.updateDetails({
                    top: elem.offsetTop,
                    sticky: !!sticky,
                    nextElem: null,
                    prevElem: null
                })
            } else if (i === elements.length - 1) {
                elementObj.updateDetails({
                    top: elem.offsetTop,
                    sticky: !!sticky,
                    nextElem: null,
                    prevElem: elements[i-1].elem
                })
            } else {
                elementObj.updateDetails({
                    top: elem.offsetTop,
                    sticky: !!sticky,
                    nextElem: elements[i+1].elem,
                    prevElem: elements[i-1].elem
                })
            }
        }

        // Add a scroll listener to hide perspective elements when they should no
        // longer be visible.
        container.addEventListener('scroll', _onScroll.bind(null, scrollElem, elements));
        window.addEventListener('resize', _onResize.bind(null, elements));
        _onResize(elements);
        for (var i = 0; i < elements.length; i++) {
            elements[i].elem.parentNode.insertBefore(elements[i].elem, elements[i].elem.parentNode.firstChild);
        }
    }

    function _edgeFix() {
        if (getComputedStyle(document.body).transform == 'none')
            document.body.style.transform = 'translateZ(0)'
        let fixedPos = document.createElement('div')
        fixedPos.style.position = 'fixed'
        fixedPos.style.top = '0'
        fixedPos.style.width = '1px'
        fixedPos.style.height = '1px'
        fixedPos.style.zIndex = 1
        document.body.insertBefore(fixedPos, document.body.firstChild)
    }
    
    function _onScroll(scrollElem, elements) {
        for (var i = 0; i < elements.length; i++) {
            let element = elements[i]

            let container = element.elem.parentNode
            let nextElem = element.parallaxDetails.nextElem
            let prevElem = element.parallaxDetails.prevElem

            let parallaxStart = prevElem ? (prevElem.offsetTop + prevElem.offsetHeight) : 0
            let parallaxEnd = nextElem ? nextElem.offsetTop : container.offsetHeight
            let threshold = 200
            
            let visible = parallaxStart - threshold - scrollElem.clientHeight < scrollElem.scrollTop &&
                parallaxEnd + threshold > scrollElem.scrollTop
            // FIXME: Repainting the images while scrolling can cause jank.
            // For now, keep them all.
            // var display = visible ? 'block' : 'none'
            var display = 'block'
            if (element.elem.style.display != display)
                element.elem.style.display = display;
        }
        // // FIXME: update with my code
        // for (var i = 0; i < parallaxDetails.length; i++) {
        //     var container = parallaxDetails[i].node.parentNode;
        //     var previousCover = parallaxDetails[i].previousCover;
        //     var nextCover = parallaxDetails[i].nextCover;
        //     var parallaxStart = previousCover ? (previousCover.offsetTop + previousCover.offsetHeight) : 0;
        //     var parallaxEnd = nextCover ? nextCover.offsetTop : container.offsetHeight;
        //     var threshold = 200;
        //     var visible = parallaxStart - threshold - clip.clientHeight < clip.scrollTop &&
        //                     parallaxEnd + threshold > clip.scrollTop;
        //     // FIXME: Repainting the images while scrolling can cause jank.
        //     // For now, keep them all.
        //     // var display = visible ? 'block' : 'none'
        //     var display = 'block';
        //     if (parallaxDetails[i].node.style.display != display)
        //         parallaxDetails[i].node.style.display = display;
        // }
    }

    function _onResize(elements) {
        // FIXME: update
        for (var i = 0; i < elements.length; i++) {
            let container = elements[i].elem.parentNode;
        
            let clip = container.parentNode;
            let { prevElem, nextElem } = elements[i].parallaxDetails
            var rate = elements[i].props.parallax

            let parallaxStart = prevElem ? (prevElem.offsetTop + prevElem.offsetHeight) : 0
            let scrollbarWidth = elements[i].parallaxDetails.sticky ? 0 : clip.offsetWidth - clip.clientWidth;
            let parallaxElem = elements[i].parallaxDetails.sticky ? container : clip;
            let height = elements[i].elem.offsetHeight;
            let depth = 0;
            if (rate) {
                depth = 1 - (1 / rate);
            } else {
                var parallaxEnd = nextElem ? nextElem.offsetTop : container.offsetHeight;
                depth = (height - parallaxEnd + parallaxStart) / (height - clip.clientHeight);
            }
            if (elements[i].parallaxDetails.sticky)
                depth = 1.0 / depth;
        
            var scale = 1.0 / (1.0 - depth);
        
            // The scrollbar is included in the 'bottom right' perspective origin.
            var dx = scrollbarWidth * (scale - 1);
            // Offset for the position within the container.
            var dy = elements[i].parallaxDetails.sticky ?
                -(clip.scrollHeight - parallaxStart - height) * (1 - scale) :
                (parallaxStart - depth * (height - clip.clientHeight)) * scale;
        
            elements[i].elem.style.transform = 'scale(' + (1 - depth) + ') translate3d(' + dx + 'px, ' + dy + 'px, ' + depth + 'px)';
        }
    }
}

export default ParallaxController