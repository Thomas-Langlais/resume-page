import React from 'react'
import ReactDOM from 'react-dom'
import { createOneTimeEvent, getTextWidth } from '../utils/utils.js'
import '../css/navbar.css'

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

    render() {
        return (
            <div id="scroll-navbar" className="bar">
                <div className="bar-content">
                    <div className="nav-item">biiitch</div>
                </div>
            </div>
        )
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
    }

    componentDidMount() {
        var index;
        
        //we need to recalculate
        this.calculateLocations();
        index = this.checkForNavItems(window.pageYOffset, this.navData);

        
        if (this.state.loading) {
            this.setState(state => {
                return Object.assign(state, {locationIndex: index})
            });
        }

        //add the handlers
        window.addEventListener('resize', this.calculateLocations);
        window.addEventListener('scroll', this.changeNavOnScroll);

        window.navbar = this;
    }

    componentWillUnmount() {

        //remove the handlers
        window.removeEventListener('resize', this.calculateLocations);
        window.removeEventListener('scroll', this.changeNavOnScroll);
    }
    
    render() {
        //do this once...
        const { navigatableChildren, navData } = this.renderForChanges(this.props.children);            
        const styles = {
            fontSize: 16
        };

        this.navData = this.navData || (this.navData = navData);


        if (!this.state.loading) {

            let sumLeft = 0;
            this.navData.forEach((navItem,index,root) => {
                
                //add the fontSize as .5em + .5em == 16(0.5) + 16(0.5) for left and right padding 
                var width = getTextWidth(navItem.title, styles.fontSize + 'px Oswald') + styles.fontSize;

                navItem.navLine.width = width;
                navItem.navLine.left = sumLeft;

                sumLeft += width;
            });
        }

        return (
            <div>
                {/* FIXME: work on the refresh bug that sets the locationIndex to locationIndex - 1...
                    We will work on hiding the navbar on intro and fade in the nav to stick to the top after passing
                    The threshold, which will be the the 2nd section */}
                {/* <div id="bar" style={this.state.locationIndex === 0 ? {position: 'relative'} : {}}> */}
                <div id="navbar" className="bar">
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
                            <div className="navbar-line" onTransitionEnd={this.transitionFinished} style={!this.state.loading ? this.navData[this.state.locationIndex].navLine : {}}></div>
                        }
                    </div>
                </div>
                <div className="nav-content">
                    {navigatableChildren}
                </div>
            </div>
        );
    }

    calculateLocations() {
        this.navData.forEach((navItem,index,root) => {
            navItem.boundary.greater = this.findOffsetLocation(navItem.ref, this.refs);
            if (index+1 < root.length) {
                navItem.boundary.lesser = this.findOffsetLocation(root[index+1].ref, this.refs);
            }
        });
        // this.navData = this.navData.map(navItem => Object.assign(navItem, {location: this.findOffsetLocation(navItem.ref, this.refs)}));
        // this.ranges = this.navData.map((navItem, i, arr) => {
        //     if (i+1 < arr.length) {
        //         return {greater: navItem.location, less: arr[i+1].location};
        //     }
        //     return {greater: navItem.location};
        // })
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
        const index = this.checkForNavItems(e.pageY, this.navData);
        
        if (!this.state.docToLink && !this.state.navToLink && this.state.locationIndex !== index) {
            this.setState(state => Object.assign(state, {locationIndex: index}));
        }
    }

    transitionFinished() {
        this.setState(state => Object.assign(state, {navToLink: false}));
    }

    //util methods
    renderForChanges(children) {
        var navData = [],
            i = 0;
        var navigatableChildren = React.Children.map(children, (child) => {
            
            if (!child.props) {
                return child;
            }

            if (child.props.navTitle) {

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
            navData: navData
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

            if (range.less) {
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

export {Navbar,FadeScrollBar};