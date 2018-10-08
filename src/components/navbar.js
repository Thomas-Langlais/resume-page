import React from 'react'
import ReactDOM from 'react-dom'
import '../css/navbar.css'

class NavbarItem extends React.Component {
    


    render() {
        return (
            <div class="nav-item">
                {this.props.title}
            </div>
        )
    }
}

class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.findOffsetLocation = this.findOffsetLocation.bind(this);
        this.calculateLocations = this.calculateLocations.bind(this);
    }

    componentDidMount() {
        //we need to recalculate
        this.calculateLocations();
        window.addEventListener('resize', this.calculateLocations);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateLocations);
    }
    
    render() {
        
        const { navigatableChildren, navData } = this.renderForChanges(this.props.children);
        this.navData = navData;
        return (
            <div>
                <div id="bar">{
                    navData.map(nav => {
                        return <NavbarItem title={nav.title} />
                    })
                }
                </div>
                <div ref="navbar" id="nav-content">
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
                let ref = 'navbar-ref' + i++;
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
            bound = ReactDOM.findDOMNode(this.refs['navbar']);
        do {
            if (e !== bound && !isNaN(e.offsetTop)) {
                offsetLocation += e.offsetTop;
            }
        } while(e !== bound && (e = e.offsetParent));
        return offsetLocation;
    }

    calculateLocations() {
        this.navData = this.navData.map(navItem => Object.assign(navItem, {location: this.findOffsetLocation(navItem.ref)}));
    }
}

export default Navbar;