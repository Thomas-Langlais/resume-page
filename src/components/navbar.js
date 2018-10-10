import React from 'react'
import ReactDOM from 'react-dom'
import createOneTimeEvent from '../utils/utils.js'
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
            <div onClick={this.goToLocation} className={"nav-item" + (selected ? ' selected' : '')}>
                {this.props.title}
            </div>
        )
    }

    goToLocation(e) {
        // document.body.animate({
        //     scrollTop: this.props.location(this.props.locRef, this.props.index)
        // }, 300);
        var location = this.props.location(this.props.locRef, this.props.index);

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
    }

    componentDidMount() {
        var index;
        
        //we need to recalculate
        this.calculateLocations();
        index = this.checkForNavItems(window.pageYOffset, this.ranges);

        
        if (this.state.loading) {
            this.setState(state => {
                return Object.assign(state, {locationIndex: index, loading: false})
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
        
        const { navigatableChildren, navData } = this.renderForChanges(this.props.children);
        this.navData = navData;

        const navLineStyles = this.navLineStyles || (this.navLineStyles = navData.map((item,i,arr) => {
            return {
                left: 'calc(' + ((i / (arr.length)) * 100) + '%)'
            }
        }));
        
        return (
            <div>
                <div id="bar">
                    <div id="bar-content">
                        {
                        navData.map((nav,i) => {
                            if (!this.state.loading && i === this.state.locationIndex) {
                                return <NavbarItem selected key={i} index={i} title={nav.title} locRef={nav.ref} 
                                        location={this.getLocation} onEnd={this.endDocEvent} />;
                            } else {
                                return <NavbarItem key={i} index={i} title={nav.title} locRef={nav.ref} 
                                        location={this.getLocation} onEnd={this.endDocEvent} />
                            }
                        })
                        }
                        {!this.state.loading &&
                            <div id="navbar-line" onTransitionEnd={this.transitionFinished} style={navLineStyles[this.state.locationIndex]}></div>
                        }
                    </div>
                </div>
                <div ref={this.NAVBAR} id="nav-content">
                    {navigatableChildren}
                </div>
            </div>
        );
    }

    calculateLocations() {
        this.navData = this.navData.map(navItem => Object.assign(navItem, {location: this.findOffsetLocation(navItem.ref, this.refs)}));
        this.ranges = this.navData.map((navItem, i, arr) => {
            if (i+1 < arr.length) {
                return {greater: navItem.location, less: arr[i+1].location};
            }
            return {greater: navItem.location};
        })
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
        const index = this.checkForNavItems(e.pageY, this.ranges);

        if (!this.state.docToLink && !this.state.navToLink && this.state.locationIndex !== index) {
            this.setState(state => Object.assign(state, {locationIndex: index}));
        }
    }

    transitionFinished() {
        this.setState(state => Object.assign(state, {navToLink: false}));
    }

    //util methods
    renderForChanges(children, i = 0) {
        var navData = [];
        var navigatableChildren = React.Children.map(children, (child) => {

            if (!child.props) {
                return child;
            }

            if (child.props.navTitle) {
                let ref = this.NAVBAR_REF + i++;
                navData.push({title: child.props.navTitle, ref: ref});
                return React.cloneElement(child, {ref: ref});
            }

            if (child.props.children) {

                var navChildren = this.renderForChanges(child.props.children, i);
                navData.push(navChildren.navData);
                navData = navData.flat();
                return React.cloneElement(child, {
                    children: navChildren.navigatableChildren
                });
            }
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

    checkForNavItems(location, ranges) {
        
        var navItemFound = false,
            index = -1;
            
        for (var i = 0; i < ranges.length; i++) {
            var range = ranges[i];

            if (range.less) {
                navItemFound = (range.greater <= location && location < range.less);
            } else {
                navItemFound = range.greater <= location;
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

export default Navbar;