import {signedArea} from './utils'

export default class Event {

    constructor (p) {
        this.p = p

        this.otherEvent = null
        this.isLeftEndpoint = null
        this.segment = null
        this.segmentIndex = null
    }

    isSamePoint(eventToCheck) {
        return this.p.isSamePoint(eventToCheck.p)
    }

    isBelow (p) {
        return this.isLeftEndpoint ?
            signedArea(this, this.otherEvent, p) > 0 :
            signedArea(this.otherEvent, p, this) > 0
    }

    isAbove (p) {
        return !this.isBelow(p);
    }

}

