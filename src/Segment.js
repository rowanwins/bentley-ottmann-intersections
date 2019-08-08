import { debugSegPriorToSplit, debugShowLineDirectionPriorSplit, debugNewLeftRight, debugShowLineDirectionAfterSplit } from './debug'

export default class Segment {

    constructor (event) {
        this.leftSweepEvent = event
        this.rightSweepEvent = event.otherEvent
        this.segmentAbove = null
        this.segmentBelow = null

        event.segment = this
        event.otherEvent.segment = this
    }
}
