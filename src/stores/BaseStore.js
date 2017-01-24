import { EventEmitter } from 'events'
import dispatcher from '../dispatcher/dispatcher.js';

var CHANGE_EVENT = 'change';

class BaseStore extends EventEmitter {

    constructor() {
        super();
        dispatcher.register((action, payload) => this.onAction(action, payload));
    }

    onAction(action, payload) { }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

export default BaseStore;