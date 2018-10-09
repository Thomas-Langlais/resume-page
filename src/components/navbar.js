import React from 'react'
import ReactDOM from 'react-dom'
import '../css/navbar.css'

class NavbarItem extends React.Component {

    render() {
        const selected = this.props.selected;
        
        return (
            <div className={"nav-item" + (selected ? ' selected' : '')}>
                {this.props.title}
            </div>
        )
    }

    static defaultProps = {
        selected: false
    };
}

class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            locationIndex: -1,
            loading: true
        };

        this.findOffsetLocation = this.findOffsetLocation.bind(this);
        this.calculateLocations = this.calculateLocations.bind(this);
        this.checkForNavItems = this.checkForNavItems.bind(this);
        this.checkForItemEvent = this.checkForItemEvent.bind(this);
    }

    componentDidMount() {
        var index;
        
        //we need to recalculate
        this.calculateLocations();
        index = this.checkForNavItems(window.pageYOffset);

        
        if (this.state.loading) {
            this.setState(state => {
                return Object.assign(state, {locationIndex: index, loading: false})
            });
        }

        //add the handlers
        window.addEventListener('resize', this.calculateLocations);
        window.addEventListener('scroll', this.checkForItemEvent);
    }

    componentWillUnmount() {
        //remove the handlers
        window.removeEventListener('resize', this.calculateLocations);
        window.removeEventListener('scroll', this.checkForItemEvent);
    }
    
    render() {
        
        const { navigatableChildren, navData } = this.renderForChanges(this.props.children);
        this.navData = navData;
        
        return (
            <div>
                <div id="bar">
                    {
                    navData.map((nav,i) => {
                        if (!this.state.loading && i === this.state.locationIndex) {
                            return <NavbarItem selected key={i} title={nav.title} />;
                        } else {
                            return <NavbarItem key={i} title={nav.title} />
                        }
                    })
                    }
                    <div id="navbar-line">
                        <div id="highlight"></div>
                    </div>
                </div>
                <div ref={Navbar.prototype.NAVBAR} id="nav-content">
                    {navigatableChildren}
                </div>
            </div>
        );
    }

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

    findOffsetLocation(ref) {
        var offsetLocation = 0,
            e = ReactDOM.findDOMNode(this.refs[ref]),
            bound = ReactDOM.findDOMNode(this.refs[Navbar.prototype.NAVBAR]);
        do {
            if (e !== bound && !isNaN(e.offsetTop)) {
                offsetLocation += e.offsetTop;
            }
        } while(e !== bound && (e = e.offsetParent));
        return offsetLocation;
    }

    calculateLocations() {
        this.navData = this.navData.map(navItem => Object.assign(navItem, {location: this.findOffsetLocation(navItem.ref)}));
        this.ranges = this.navData.map((navItem, i, arr) => {
            if (i+1 < arr.length) {
                return {greater: navItem.location, less: arr[i+1].location};
            }
            return {greater: navItem.location};
        })
    }

    checkForNavItems(location) {
        
        var navItemFound = false,
            index = -1;
            
        for (var i = 0; i < this.ranges.length; i++) {
            var range = this.ranges[i];

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

    checkForItemEvent(e) {
        const index = this.checkForNavItems(e.pageY);

        if (this.state.locationIndex !== index) {
            this.setState(state => Object.assign(state, {locationIndex: index}));
        }
    }
}

Navbar.prototype.NAVBAR_ITEM = 'navbar-item';
Navbar.prototype.NAVBAR_REF = 'navbar-ref';
Navbar.prototype.NAVBAR = 'navbar';

export default Navbar;