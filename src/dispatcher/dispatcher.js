class Dispatcher {
    constructor() {
        this.callbacks = [];
    }

    register(callback) {
        this.callbacks.push(callback);
    }

    dispatch(action, payload) {
        this.callbacks.forEach(c => c(action, payload));
    }
}

export default new Dispatcher;

