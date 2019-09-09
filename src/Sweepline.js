import SplayTree from 'splaytree'
import Segment from './Segment'
import {compareSegments} from './compareSegments'
import Event from './Event'
import Point from './Point'

// import {debugTwoSegments, debugIntersectionEventAndSegments, debugSegmentBelowAbove, debugSplitSeg, debugPriorSegNewSeg, debugOutputSequence, debugReconstructionOnMultiHit, checkRewiring, debugMultilineSplit, debugP, debugP2, debugPlotLine, debugShowLineDirectionAfterSplit, debugShowLineDirectionPriorSplit} from './debug'

export default class SweepLine {
    constructor () {
        this.tree = new SplayTree(compareSegments)
    }

    addSegment (event) {
        const seg = new Segment(event)
        const node = this.tree.insert(seg)
        const nextNode = this.tree.next(node)
        const prevNode = this.tree.prev(node)
        if (nextNode !== null) {
            seg.segmentAbove = nextNode.key
            seg.segmentAbove.segmentBelow = seg
        }
        if (prevNode !== null) {
            seg.segmentBelow = prevNode.key
            seg.segmentBelow.segmentAbove = seg
        }
        return node.key
    }

    removeSegmentFromSweepline (seg) {
        const node = this.tree.find(seg)
        if (node === null) return
        const nextNode = this.tree.next(node)
        const prevNode = this.tree.prev(node)

        if (nextNode !== null) {
            const nextSeg = nextNode.key
            nextSeg.segmentBelow = seg.segmentBelow
        }
        if (prevNode !== null) {
            const prevSeg = prevNode.key
            prevSeg.segmentAbove = seg.segmentAbove
        }
        this.tree.remove(seg)
    }

    flipSegments (seg1, seg2) {
        const node1 = this.tree.find(seg1)
        const node2 = this.tree.find(seg2)

        if (node1 === null || node2 === null) {
            return
        }
        const tempAbove1 = seg1.segmentAbove
        const tempAbove2 = seg2.segmentAbove

        const tempBelow1 = seg1.segmentBelow
        const tempBelow2 = seg2.segmentBelow

        if (seg2.segmentAbove === seg1) {
            seg1.segmentAbove = seg2
            seg2.segmentAbove = tempAbove1
            seg1.segmentBelow = tempBelow2
            seg2.segmentBelow = seg1
            if (tempAbove1 !== null) tempAbove1.segmentBelow = seg2
            if (tempBelow2 !== null) tempBelow2.segmentAbove = seg1
        } else {
            seg1.segmentAbove = tempAbove2
            seg2.segmentAbove = seg1
            seg1.segmentBelow = seg2
            seg2.segmentBelow = tempBelow1
            if (tempAbove2 !== null) tempAbove2.segmentBelow = seg1
            if (tempBelow1 !== null) tempBelow1.segmentAbove = seg2
        }
        const tmp1 = node1.key
        const tmp2 = node2.key

        node2.key = tmp1
        node1.key = tmp2
    }

    testIntersect (seg1, seg2) {
        if (seg1 === null || seg2 === null) return false

        if (seg1.rightSweepEvent.isSamePoint(seg2.leftSweepEvent) ||
            seg1.rightSweepEvent.isSamePoint(seg2.rightSweepEvent) ||
            seg1.leftSweepEvent.isSamePoint(seg2.leftSweepEvent) ||
            seg1.leftSweepEvent.isSamePoint(seg2.rightSweepEvent)) return false

        const x1 = seg1.leftSweepEvent.p.x
        const y1 = seg1.leftSweepEvent.p.y
        const x2 = seg1.rightSweepEvent.p.x
        const y2 = seg1.rightSweepEvent.p.y
        const x3 = seg2.leftSweepEvent.p.x
        const y3 = seg2.leftSweepEvent.p.y
        const x4 = seg2.rightSweepEvent.p.x
        const y4 = seg2.rightSweepEvent.p.y


        const denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1))
        const numeA = ((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3))
        const numeB = ((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3))

        if (denom === 0) {
            if (numeA === 0 && numeB === 0) return false
            return false
        }

        const uA = numeA / denom
        const uB = numeB / denom

        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            const x = x1 + (uA * (x2 - x1))
            const y = y1 + (uA * (y2 - y1))

            const p = new Point([x, y])
            const intersectionEvent = new Event(p)

            if (seg2.segmentAbove === seg1) {
                intersectionEvent.segment1 = seg1
                intersectionEvent.segment2 = seg2
            } else if (seg1.segmentAbove === seg2) {
                intersectionEvent.segment1 = seg2
                intersectionEvent.segment2 = seg1
            }

            const comp = compareSegments(seg1, seg2)
            if (comp > 0) {
                intersectionEvent.segment1 = seg1
                intersectionEvent.segment2 = seg2
            } else {
                intersectionEvent.segment1 = seg2
                intersectionEvent.segment2 = seg1
            }

            return intersectionEvent
        }
        return false
    }

}
