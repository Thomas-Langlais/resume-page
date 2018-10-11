class Adapter {
    
    /* 
        This will allow me to share data without any other 
        linking by attaching listeners for any changes to the data
    */
    constructor() {
        this.data = [];
        this.listeners = new Map();

        this.load = this.load.bind(this);
        this.addListener = this.addListener.bind(this);
    }

    load(data) {
        this.data = Object.assign(this.data, data);
    }

    addListener(thisArg, operations = {}) {
        console.log(this, thisArg);

    }
}

export default Adapter;