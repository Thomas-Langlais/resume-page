import React from 'react'
import ReactDOM from 'react-dom'
import { createOneTimeEvent, getTextWidth } from '../utils/utils.js'
import '../css/navbar.css'

const FADE_SCROLL_START = 550;

class NavbarItem extends React.Component {

    static defaultProps = {
        selected: false
    };

    render() {
        const selected = this.props.selected;
        
        return (
            <div onClick={this.goToLocation} className={"nav-item" + (selected ? ' selected' : '')}
                style={this.props.style}>
                {this.props.title}
            </div>
        )
    }

    goToLocation = (e) => {
        const navHeight = this.goToLocation.navHeight || (this.goToLocation.navHeight = document.getElementById('navbar').getBoundingClientRect().height);
        var location = Math.floor(this.props.location(this.props.locRef, this.props.index) - (this.props.index !== 0 ? navHeight : 0)) + 1; //adding 1 stops fade bar from bugging

        createOneTimeEvent(
            window, 'scroll',
            null,
            function (e,location) {
                return e.pageY === location;
            },
            function() {
                this.props.onEnd();
            },
            this,
            location
        );

        window.scroll({
            top: location,
            behavior: 'smooth'
        });
    }
}

class FadeScrollBar extends React.Component {

    constructor(props) {
        super(props);
        this.checkToAnimate = this.checkToAnimate.bind(this);
    }

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        
        this.hollowData = {
            exposeLocation: FADE_SCROLL_START,
            top: node.offsetTop,
            height: node.offsetHeight
        };

        window.addEventListener('scroll', this.checkToAnimate, true);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.checkToAnimate);
    }

    render() {
        
        return (
            <div id="scroll-navbar" className="bar">
                <div className="bar-content">
                    {React.Children.map(this.props.data, (item) => 
                        (<div className="nav-item">{item}</div>)
                    )}
                </div>
            </div>
        );
    }

    checkToAnimate(e) {
        
        const {top,height} = this.hollowData;
        
        
        if (top - FADE_SCROLL_START <= e.pageY && e.pageY <= top - height) {
            
            let self = ReactDOM.findDOMNode(this);    
            window.requestAnimationFrame((ts) => {
                const perUntilComplete = ((top - e.pageY - height) / (FADE_SCROLL_START - height));

                let newLocation = top - Math.ceil((1 - perUntilComplete) * height),
                    opacity = 1 - Math.round((perUntilComplete + 0.00001) * 100) / 100
                
                self.style.top = newLocation + 'px';
                self.style.opacity = opacity;
            });

        }
    }
}

class Navbar extends React.Component {

    state = {
        locationIndex: -1,
        navToLink: false,
        docToLink: false,
        waitForScroll: false,
        loading: true
    };

    constructor(props) {
        super(props);

        /* this.state = {
            locationIndex: -1,
            navToLink: false,
            docToLink: false,
            waitForScroll: false,
            loading: true
        };


        this.calculateLocations = this.calculateLocations.bind(this);
        this.changeNavOnScroll = this.changeNavOnScroll.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.endDocEvent = this.endDocEvent.bind(this);
        this.transitionFinished = this.transitionFinished.bind(this);
        this.scrollFadeBarStateCheck = this.scrollFadeBarStateCheck.bind(this);*/

        //fixes the canvas bug for loading
        createOneTimeEvent(window, 'load', null, () => true, 
            function() {
                this.setState(state => Object.assign(state, {loading: false}));
            }, this
        );

        window.navbar = this;
    }

    componentDidMount() {
        var index;
        
        //we need to recalculate
        this.calculateLocations();
        index = this.checkForNavItems(window.pageYOffset, this.render.data.navData);
        this.scrollFadeBarStateCheck(window.pageYOffset);
        
        if (this.state.loading) {
            this.setState(state => {
                return Object.assign(state, {locationIndex: index})
            });
        }

        //add the handlers
        window.addEventListener('resize', this.calculateLocations);
        window.addEventListener('scroll', this.changeNavOnScroll);
    }

    componentWillUnmount() {

        //remove the handlers
        window.removeEventListener('resize', this.calculateLocations);
        window.removeEventListener('scroll', this.changeNavOnScroll);
    }
    
    render() {
        //do this once...
        const { navigatableChildren, navData, scrollIn } = this.render.data || (this.render.data = renderForChanges(this.props.children));
        const styles = {
            fontSize: 16
        };

        if (scrollIn) {
            let data = navData.map((item) => item.title);
            navigatableChildren.forEach((item,i,arr) => {
                if (item.type === FadeScrollBar) {
                    arr[i] = React.cloneElement(item, {data: data});
                }
            })
        }

        if (!this.state.loading) {

            let sumLeft = 0;
            this.render.data.navData.forEach((navItem) => {
                
                //add the fontSize as .5em + .5em == 16(0.5) + 16(0.5) for left and right padding 
                var width = getTextWidth(navItem.title, styles.fontSize + 'px Oswald') + styles.fontSize;

                navItem.navLine = {
                    width: width,
                    left: sumLeft
                };

                sumLeft += width;
            });
        }

        return (
            <React.Fragment>
                {/* FIXME: work on the refresh bug that sets the locationIndex to locationIndex - 1...
                    We will work on hiding the navbar on intro and fade in the nav to stick to the top after passing
                    The threshold, which will be the the 2nd section */}
                <div id="navbar" className="bar" style={this.state.waitForScroll ? {visibility: 'hidden'} : {}}>
                    <div ref={this.NAVBAR} className="bar-content">
                        {
                        navData.map((nav,i) => {
                            if (!this.state.loading && i === this.state.locationIndex) {
                                return <NavbarItem selected key={i} index={i} title={nav.title} locRef={nav.ref} 
                                        location={this.getLocation} onEnd={this.endDocEvent} 
                                        style={styles} />;
                            } else {
                                return <NavbarItem key={i} index={i} title={nav.title} locRef={nav.ref} 
                                        location={this.getLocation} onEnd={this.endDocEvent}
                                        style={styles} />
                            }
                        })
                        }
                        {!this.state.loading &&
                            <div className="navbar-line" onTransitionEnd={this.transitionFinished} style={!this.state.loading ? this.render.data.navData[this.state.locationIndex].navLine : {}}></div>
                        }
                    </div>
                </div>
                <div id="nav-content">
                    {navigatableChildren}
                </div>
            </React.Fragment>
        );
    }

    calculateLocations = () => {
        this.render.data.navData.forEach((navItem,index,root) => {
            navItem.boundary.greater = findOffsetLocation(navItem.ref, this.refs);
            if (index+1 < root.length) {
                navItem.boundary.lesser = findOffsetLocation(root[index+1].ref, this.refs);
            }
        });
    }

    getLocation = (ref, index) => {
        this.setState(state => Object.assign(state, {locationIndex: index, docToLink: true, navToLink: true}));
        return findOffsetLocation(ref, this.refs);
    }

    endDocEvent = () => {
        this.setState(state => Object.assign(state, {docToLink: false}));
    }

    scrollFadeBarStateCheck = (Y) => {
        const {top, height} = this.refs[this.SCROLLBAR].hollowData
        this.setState(state => Object.assign(state, {waitForScroll: (Y <= (top - height))}));
    }

    //events
    changeNavOnScroll = (e) => { //scroll event
        this.scrollFadeBarStateCheck(e.pageY);

        if (!this.state.docToLink && !this.state.navToLink) {
            const index = this.checkForNavItems(e.pageY, this.render.data.navData);
            if (this.state.locationIndex !== index) {
                this.setState(state => Object.assign(state, {locationIndex: index}));
            }
        }
    }

    transitionFinished = () => {
        this.setState(state => Object.assign(state, {navToLink: false}));
    }

    checkForNavItems = (location, navData) => {
        const navHeight = Math.ceil(//need to use ceiling to stop rounding issue giving the wrong index
            this.checkForNavItems.navHeight || (this.checkForNavItems.navHeight = ReactDOM.findDOMNode(this.refs[this.NAVBAR]).getBoundingClientRect().height)
        );
        var navItemFound = false,
            index = -1;
            
        for (var i = 0; i < navData.length; i++) {
            var range = navData[i].boundary;

            if (range.lesser) {
                navItemFound = (range.greater - navHeight <= location && location < range.lesser - navHeight);
            } else {
                navItemFound = range.greater - navHeight <= location;
            }
            if (navItemFound) {
                index = i;
                break;
            }
        }
        
        return index;
    }
}

Navbar.prototype.NAVBAR_REF = 'navbar-ref';
Navbar.prototype.NAVBAR = 'navbar';
Navbar.prototype.SCROLLBAR = 'scrollbar';

//util methods
function renderForChanges(children) {
    var navData = [],
        i = 0,
        scrollRef;

    var navigatableChildren = React.Children.map(children, (child) => {
        
        if (!child.props) {
            return child;
        }

        if (!scrollRef && child.type === FadeScrollBar) {
            scrollRef = Navbar.prototype.SCROLLBAR;
            return React.cloneElement(child, {ref: scrollRef});
        }

        if (child.props.navTitle && child.type !== FadeScrollBar) {

            var ref = Navbar.prototype.NAVBAR_REF + i++;
            navData.push({
                title: child.props.navTitle,
                ref: ref,
                boundary: {
                    greater: null,
                    lesser: null
                },
                navLine: {
                    left: null,
                    width: null
                }
            });

            return React.cloneElement(child, {ref: ref});
        }

        return child;
    });

    return {
        navigatableChildren: navigatableChildren,
        navData: navData,
        scrollIn: scrollRef !== undefined
    };
}

function findOffsetLocation(ref, refs) {
    var offsetLocation = 0,
        e = ReactDOM.findDOMNode(refs[ref]),
        bound = ReactDOM.findDOMNode(refs[Navbar.prototype.NAVBAR]);
    do {
        if (e !== bound && !isNaN(e.offsetTop)) {
            offsetLocation += e.offsetTop;
        }
    } while(e !== bound && (e = e.offsetParent));
    return offsetLocation;
}

export {Navbar,FadeScrollBar};