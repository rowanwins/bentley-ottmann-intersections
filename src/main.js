import EventQueue from './EventQueue'
import Sweepline from './Sweepline'

import {fillEventQueue} from './fillQueue'
// import {debugEventAndSegments, debugTwoSegments, debugSweepline,
//     debugEventAndSegment, debugIntersectionEventAndSegments} from './debug'


export default function bentleyOttmann (geojson) {
    const intersectionPoints = []
    const eventQueue = new EventQueue()

    fillEventQueue(geojson, eventQueue)

    const sweepLine = new Sweepline();

    let currentSegment = null

    while (eventQueue.queue.length) {
        const event = eventQueue.queue.pop();
        // debugEventAndSegments(event, sweepLine)

        if (event.isLeftEndpoint) {

            currentSegment = sweepLine.addSegment(event)

            // debugSweepline(event.p, sweepLine.tree)
            // debugEventAndSegment(event.p, currentSegment)

            const ipWithSegAbove = sweepLine.testIntersect(currentSegment, currentSegment.segmentAbove)
            if (ipWithSegAbove !== false) {
                eventQueue.queue.push(ipWithSegAbove)
            }

            const ipWithSegBelow = sweepLine.testIntersect(currentSegment, currentSegment.segmentBelow)
            if (ipWithSegBelow !== false) {
                eventQueue.queue.push(ipWithSegBelow)

            }
        } else if (event.isLeftEndpoint === false) {

            // debugEventAndSegment(event.p, event.segment)
            // debugSweepline(event.p, sweepLine.tree)

            const ipWithSegBelow = sweepLine.testIntersect(event.segment.segmentAbove, event.segment.segmentBelow)
            if (ipWithSegBelow !== false) {
                if (!eventQueue.checkIfQueueContainsEvent(ipWithSegBelow)) {
                    eventQueue.queue.push(ipWithSegBelow)
                }
            }
            sweepLine.removeSegmentFromSweepline(event.segment)
        } else {
            if (notInIntersectionPoints(event)) intersectionPoints.push(event);

            // This ought to be the top segment
            const segE1 = event.segment1
            // This ought to be the bottom segment
            const segE2 = event.segment2

            sweepLine.flipSegments(segE1, segE2)

            const segAbove = segE2.segmentAbove
            const segBelow = segE1.segmentBelow

            const ipWithSegAbove = sweepLine.testIntersect(segE2, segAbove, eventQueue)
            if (ipWithSegAbove !== false) {
                if (!eventQueue.checkIfQueueContainsEvent(ipWithSegAbove) && notInIntersectionPoints(ipWithSegAbove)) {
                    eventQueue.queue.push(ipWithSegAbove)
                }
            }

            const ipWithSegBelow = sweepLine.testIntersect(segE1, segBelow, eventQueue)
            if (ipWithSegBelow !== false) {
                if (!eventQueue.checkIfQueueContainsEvent(ipWithSegBelow) && notInIntersectionPoints(ipWithSegBelow)) {
                    eventQueue.queue.push(ipWithSegBelow)
                }
            }

        }
    }

    function notInIntersectionPoints(e) {
        for (let i = 0; i < intersectionPoints.length; i++) {
            if ((intersectionPoints[i].segment1 === e.segment1 &&
                 intersectionPoints[i].segment2 === e.segment2) ||
                (intersectionPoints[i].segment2 === e.segment1 &&
                 intersectionPoints[i].segment1 === e.segment2)
            ) {
                return false
            }
        }
        return true
    }

    return intersectionPoints
}

