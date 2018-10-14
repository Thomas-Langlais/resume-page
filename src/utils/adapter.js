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

    load(getData) {
        const {thisArg, data} = getData();

        this.data = Object.assign(this.data, data);

        var iter = this.listeners.entries();
        var item;

        while(!(item = iter.next()).done) {
            item = item.value;

            if (thisArg !== item[0]) {
                item[1].load(this.data);
            }
        }
    }

    addListener(operations = {}, thisArg) {
        
        this.listeners.set(thisArg, Object.assign(operations, {
            change: function(data) {

            },
            load: function(data) {
    
            }
        }));

    }
}

export default Adapter;