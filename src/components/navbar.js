import React from 'react'
import ReactDOM from 'react-dom'
import { createOneTimeEvent, getTextWidth } from '../utils/utils.js'
import '../css/navbar.css'

const FADE_SCROLL_START = 350;

class NavbarItem extends React.Component {

    static defaultProps = {
        selected: false
    };

    constructor(props) {
        super(props);

        this.goToLocation = this.goToLocation.bind(this);
    }

    render() {
        const selected = this.props.selected;
        
        return (
            <div onClick={this.goToLocation} className={"nav-item" + (selected ? ' selected' : '')}
                style={this.props.style}>
                {this.props.title}
            </div>
        )
    }

    goToLocation(e) {
        const navHeight = this.goToLocation.navHeight || (this.goToLocation.navHeight = document.getElementById('navbar').getBoundingClientRect().height);

        var location = Math.floor(this.props.location(this.props.locRef, this.props.index) - (this.props.index !== 0 ? navHeight : 0));

        createOneTimeEvent(
            window, 'scroll',
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

// TODO: get this fake bar to get navData somehow... look it up
// Ill have to use requestAnimationFrame to hand move the scroolbar out
class FadeScrollBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            visible: false,
            top: null
        };

        this.checkToAnimate = this.checkToAnimate.bind(this);
    }

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        
        this.hollowData = {
            exposeLocation: FADE_SCROLL_START,
            top: node.offsetTop,
            height: node.getBoundingClientRect().height
        };

        if (this.state.loading) {
            this.setState(state => Object.assign(state, {
                loading: false,
                top: this.hollowData.top
            }));
        }

        window.addEventListener('scroll', this.checkToAnimate, true);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.checkToAnimate);
    }

    render() {
        
        return (
            <div id="scroll-navbar" style={!this.state.loading && this.state.visible ? {top: this.state.top} : {}} className="bar">
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
            // console.log(
            //     'top of popped navbar = TPN\n',
            //     'location: ' + top + '\n', 
            //     'current location: ' + e.pageY + '\n',
            //     'pixels til location: ' + (top - e.pageY) + '\n',
            //     'pixels til TPN: ' + (top - e.pageY - height) + '\n',
            //     '% til TPN: ' + ((top - e.pageY - height) / (FADE_SCROLL_START - height)),
            //     'TPN shifted up: ' + (1 - ((top - e.pageY - height) / (FADE_SCROLL_START - height))) * height
            // );
                        
            window.requestAnimationFrame((ts) => {
                const perUntilComplete = ((top - e.pageY - height) / (FADE_SCROLL_START - height));

                let newLocation = top - Math.ceil((1 - perUntilComplete) * height),
                    opacity = 1 - Math.round((perUntilComplete + 0.00001) * 100) / 100
                
                self.style.top = newLocation + 'px';
                self.style.opacity = opacity;
            });

        } else {
            // window.requestAnimationFrame((ts) => {
            //     ReactDOM.findDOMNode(this).style.top = this.hollowData.top + 'px';
            // });
            // if (this.state.visible) {
            //     this.setState(state => {
            //         return Object.assign(state, {
            //             visible: false,
            //             top: top
            //         });
            //     });
            // }
        }
        
    }
}

class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            locationIndex: -1,
            navToLink: false,
            docToLink: false,
            loading: true
        };

        this.calculateLocations = this.calculateLocations.bind(this);
        this.changeNavOnScroll = this.changeNavOnScroll.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.endDocEvent = this.endDocEvent.bind(this);
        this.transitionFinished = this.transitionFinished.bind(this);

        //fixes the canvas bug for loading
        createOneTimeEvent(window, 'load', () => true, 
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
        const { navigatableChildren, navData, scrollIn } = this.render.data || (this.render.data = this.renderForChanges(this.props.children));
        const styles = {
            fontSize: 16
        };

        if (scrollIn) this.passNavData(navigatableChildren, navData.map((item) => item.title));

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
            <div>
                {/* FIXME: work on the refresh bug that sets the locationIndex to locationIndex - 1...
                    We will work on hiding the navbar on intro and fade in the nav to stick to the top after passing
                    The threshold, which will be the the 2nd section */}
                {/* <div id="bar" style={this.state.locationIndex === 0 ? {position: 'relative'} : {}}> */}
                <div id="navbar" style={{display: 'none'}} className="bar">
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
            </div>
        );
    }

    calculateLocations() {
        this.render.data.navData.forEach((navItem,index,root) => {
            navItem.boundary.greater = this.findOffsetLocation(navItem.ref, this.refs);
            if (index+1 < root.length) {
                navItem.boundary.lesser = this.findOffsetLocation(root[index+1].ref, this.refs);
            }
        });
    }

    getLocation(ref, index) {
        this.setState(state => Object.assign(state, {locationIndex: index, docToLink: true, navToLink: true}));
        return this.findOffsetLocation(ref, this.refs);
    }

    endDocEvent() {
        this.setState(state => Object.assign(state, {docToLink: false}));
    }

    //events
    changeNavOnScroll(e) { //scroll event
        if (!this.state.docToLink && !this.state.navToLink) {
            const index = this.checkForNavItems(e.pageY, this.render.data.navData);
            if (this.state.locationIndex !== index) {
                this.setState(state => Object.assign(state, {locationIndex: index}));
            }
        }
    }

    transitionFinished() {
        this.setState(state => Object.assign(state, {navToLink: false}));
    }

    //util methods
    renderForChanges(children) {
        var navData = [],
            i = 0,
            scrollRef;

        var navigatableChildren = React.Children.map(children, (child) => {
            
            if (!child.props) {
                return child;
            }

            if (!scrollRef && child.type === FadeScrollBar) {
                scrollRef = this.SCROLLBAR;
                return React.cloneElement(child, {ref: scrollRef});
            }

            if (child.props.navTitle && child.type !== FadeScrollBar) {

                var ref = this.NAVBAR_REF + i++;
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

    findOffsetLocation(ref, refs) {
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

    checkForNavItems(location, navData) {
        const navHeight = this.checkForNavItems.navHeight || (this.checkForNavItems.navHeight = ReactDOM.findDOMNode(this.refs[this.NAVBAR]).getBoundingClientRect().height);

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

    passNavData(children, data) {
        children.forEach((item,i,arr) => {
            if (item.type === FadeScrollBar) {
                arr[i] = React.cloneElement(item, {data: data});
            }
        })
    }
}

Navbar.prototype.NAVBAR_REF = 'navbar-ref';
Navbar.prototype.NAVBAR = 'navbar';
Navbar.prototype.SCROLLBAR = 'scrollbar';

export {Navbar,FadeScrollBar};