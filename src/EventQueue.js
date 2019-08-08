import TinyQueue from 'tinyqueue'
import {checkWhichEventIsLeft} from './compareEvents'

export default class EventQueue {

    constructor () {
        this.queue = new TinyQueue([], checkWhichEventIsLeft);
    }

    checkIfQueueContainsEvent (e) {
        for (let i = 0; i < this.queue.data.length; i++) {
            if (this.queue.data[i].isSamePoint(e)) return true
        }
        return false
    }

}
