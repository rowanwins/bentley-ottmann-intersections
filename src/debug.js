/* istanbul ignore file */
export function debugEventAndSegments (event, sweepline) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const eLayer = L.circleMarker([event.p.y, event.p.x]).addTo(map)

    const segs = sweepline.tree.keys()
    const lines = L.layerGroup([]).addTo(map)

    segs.forEach(function (seg) {
        L.polyline([
            [seg.leftSweepEvent.p.y, seg.leftSweepEvent.p.x],
            [seg.rightSweepEvent.p.y, seg.rightSweepEvent.p.x]
        ], {color: 'grey'}).addTo(lines)

    })

    const polyline = L.polyline([[event.p.y, event.p.x], [event.otherEvent.p.y, event.otherEvent.p.x]], {color: 'red'}).addTo(map)

    // debugger

    eLayer.remove()
    polyline.remove()
    lines.remove()
}

export function debugCentroid (p) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const eLayer = L.circleMarker([p[1], p[0]]).addTo(map)

    debugger

    // eLayer.remove()

}

export function debugIntersectionEventAndSegments (event, seg1, seg2) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const eLayer = L.circleMarker([event.y, event.x]).addTo(map)

    const lines = L.layerGroup([]).addTo(map)

    L.polyline([
        [seg1.leftSweepEvent.p.y, seg1.leftSweepEvent.p.x],
        [seg1.rightSweepEvent.p.y, seg1.rightSweepEvent.p.x]
    ], {color: 'green'}).bindTooltip('S - should be below on left', { permanent: true, direction: 'left' }).addTo(lines)

    L.polyline([
        [seg2.leftSweepEvent.p.y, seg2.leftSweepEvent.p.x],
        [seg2.rightSweepEvent.p.y, seg2.rightSweepEvent.p.x]
    ], {color: 'red'}).bindTooltip('T - should be above on left', { permanent: true, direction: 'right' }).addTo(lines)

    debugger

    eLayer.remove()
    lines.remove()
}


// export function debugIntersectionEventAndSegments (event, sweepline) {
//     if (process.env.NODE_ENV !== 'development') return
//     const map = window.map
//     const eLayer = L.circleMarker([event.y, event.x]).addTo(map)

//     const segs = sweepline.tree.keys()
//     const lines = L.layerGroup([]).addTo(map)

//     segs.forEach(function (seg) {
//         L.polyline([
//             [seg.leftSweepEvent.p.y, seg.leftSweepEvent.p.x],
//             [seg.rightSweepEvent.p.y, seg.rightSweepEvent.p.x]
//         ], {color: 'grey'}).addTo(lines)

//     })

//     debugger

//     eLayer.remove()
//     lines.remove()
// }

export function debugSegmentBelowAbove (intersection, segment) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const eLayer = L.circleMarker([intersection.y, intersection.x]).addTo(map)

    const lines = L.layerGroup([]).addTo(map)

    L.polyline([
        [segment.leftSweepEvent.p.y, segment.leftSweepEvent.p.x],
        [segment.rightSweepEvent.p.y, segment.rightSweepEvent.p.x]
    ], {color: 'grey'}).addTo(lines)

    if (segment.segmentAbove !== null) {
        L.polyline([
            [segment.segmentAbove.leftSweepEvent.p.y, segment.segmentAbove.leftSweepEvent.p.x],
            [segment.segmentAbove.rightSweepEvent.p.y, segment.segmentAbove.rightSweepEvent.p.x]
        ], {color: 'green'}).addTo(lines)
    }

    if (segment.segmentBelow !== null) {
        L.polyline([
            [segment.segmentBelow.leftSweepEvent.p.y, segment.segmentBelow.leftSweepEvent.p.x],
            [segment.segmentBelow.rightSweepEvent.p.y, segment.segmentBelow.rightSweepEvent.p.x]
        ], {color: 'purple'}).addTo(lines)
    }


    debugger

    eLayer.remove()
    lines.clearLayers()
}

export function debugEventAndSegment (event, segment) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const eLayer = L.circleMarker([event.y, event.x]).addTo(map)

    const lines = L.layerGroup([]).addTo(map)

    const b = map.getBounds()
    L.polyline([
        [b.getNorth(), event.x],
        [b.getSouth(), event.x]
    ], {color: 'grey', weight: 1}).addTo(lines);


    L.polyline([
        [segment.leftSweepEvent.p.y, segment.leftSweepEvent.p.x],
        [segment.rightSweepEvent.p.y, segment.rightSweepEvent.p.x]
    ], {color: 'red', weight: 5}).addTo(lines)

    if (segment.segmentAbove !== null) {
        L.polyline([
            [segment.segmentAbove.leftSweepEvent.p.y, segment.segmentAbove.leftSweepEvent.p.x],
            [segment.segmentAbove.rightSweepEvent.p.y, segment.segmentAbove.rightSweepEvent.p.x]
        ], {color: 'green'}).addTo(lines)
    }

    if (segment.segmentBelow !== null) {
        L.polyline([
            [segment.segmentBelow.leftSweepEvent.p.y, segment.segmentBelow.leftSweepEvent.p.x],
            [segment.segmentBelow.rightSweepEvent.p.y, segment.segmentBelow.rightSweepEvent.p.x]
        ], {color: 'purple'}).addTo(lines)
    }


    debugger

    eLayer.remove()
    lines.clearLayers()
}

export function debugSplitSeg (origLeft, origRight, newLeftSeg, newRightSeg) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const lines = L.layerGroup([]).addTo(map)

    L.polyline([
        [origLeft.y, origLeft.x],
        [origRight.y, origRight.x]
    ], {color: 'red'}).addTo(lines)

    lines.clearLayers()

    L.polyline([
        [newLeftSeg.leftSweepEvent.p.y, newLeftSeg.leftSweepEvent.p.x],
        [newLeftSeg.rightSweepEvent.p.y, newLeftSeg.rightSweepEvent.p.x]
    ], {color: 'green'}).addTo(lines)

    L.polyline([
        [newRightSeg.leftSweepEvent.p.y, newRightSeg.leftSweepEvent.p.x],
        [newRightSeg.rightSweepEvent.p.y, newRightSeg.rightSweepEvent.p.x]
    ], {color: 'purple'}).addTo(lines)

    debugger

    lines.clearLayers()
}

export function debugSegPriorToSplit (seg, intersectionEvent) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const lines = L.layerGroup([]).addTo(map)
    L.circleMarker([intersectionEvent.p.y, intersectionEvent.p.x]).addTo(lines)
    let line = null
    if (seg.isHeadingLeftToRight()) {
        // console.log('was gonig left to right')
        line = L.polyline([
            [seg.leftSweepEvent.p.y, seg.leftSweepEvent.p.x],
            [seg.rightSweepEvent.p.y, seg.rightSweepEvent.p.x]
        ], {color: 'orange', weight: 5}).addTo(lines)

        // L.circleMarker([seg.rightSweepEvent.p.nextVertice.y, seg.rightSweepEvent.p.nextVertice.x], {color: 'pink'}).addTo(lines)

    } else {
        // console.log('was gonig right to left')
        line = L.polyline([
            [seg.rightSweepEvent.p.y, seg.rightSweepEvent.p.x],
            [seg.leftSweepEvent.p.y, seg.leftSweepEvent.p.x]
        ], {color: 'orange', weight: 5}).addTo(lines)

        // L.circleMarker([seg.leftSweepEvent.p.nextVertice.y, seg.leftSweepEvent.p.nextVertice.x], {radius: 20, color: 'pink'}).addTo(lines)

    }
    L.polylineDecorator(line, {
        patterns: getBasicLinePattern('orange')
    }).addTo(lines);

    debugger
    lines.clearLayers()
}

export function debugOutConstruction (outContour, nextPoint, startPoint) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const points = L.layerGroup([]).addTo(map)

    L.circleMarker([nextPoint.y, nextPoint.x], {color: 'red'}).addTo(points)
    L.circleMarker([startPoint.y, startPoint.x], {color: 'green'}).addTo(points)

    const lines = L.geoJSON({
        type: 'LineString',
        coordinates: outContour
    }, {color: 'grey'}).addTo(map)

    debugger
    points.clearLayers()
    lines.remove()

}

export function checkRewiring(origSeg, newEvent, p) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const eLayer = L.circleMarker([newEvent.y, newEvent.x]).addTo(map)
    const lines = L.layerGroup([]).addTo(map)
    L.polyline([
        [origSeg.leftSweepEvent.y, origSeg.leftSweepEvent.x],
        [origSeg.rightSweepEvent.y, origSeg.rightSweepEvent.x]
    ], {color: 'purple', weight: 5}).addTo(lines)
    L.polyline([
        [p.y, p.x],
        [p.nextVertice.y, p.nextVertice.x]
    ], {color: 'green'}).addTo(lines)

    // debugger
    eLayer.remove()
    lines.clearLayers()
}


export function debugCoords (ipIn, ip, ipOut) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const points = L.layerGroup([]).addTo(map)

    L.circleMarker([ipIn[1], ipIn[0]], {color: 'red', radius: 10}).addTo(points)
    L.circleMarker([ip[1], ip[0]], {color: 'orange', radius: 6}).addTo(points)
    L.circleMarker([ipOut[1], ipOut[0]], {color: 'yellow', radius: 3}).addTo(points)
    debugger
}

export function debugP (ipIn, ip, ipOut) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const points = L.layerGroup([]).addTo(map)

    L.circleMarker([ipIn.y, ipIn.x], {color: 'red', radius: 10}).addTo(points)
    L.circleMarker([ip.y, ip.x], {color: 'orange', radius: 6}).addTo(points)
    L.circleMarker([ipOut.y, ipOut.x], {color: 'yellow', radius: 3}).addTo(points)
    debugger
    points.clearLayers()
}

export function debugP2 (ip, ipOut) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const points = L.layerGroup([]).addTo(map)

    L.circleMarker([ip.y, ip.x], {color: 'purple'}).addTo(points)
    L.circleMarker([ipOut.y, ipOut.x], {color: 'red'}).addTo(points)
    debugger
    points.clearLayers()
}

export function debugPlotLine (ip, line) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const eLayer = L.circleMarker([ip.y, ip.x]).addTo(map)
    const lines = L.layerGroup([]).addTo(map)
    L.polyline([
        [line.leftSweepEvent.p.y, line.leftSweepEvent.p.x],
        [line.rightSweepEvent.p.y, line.rightSweepEvent.p.x]
    ], {color: 'purple', weight: 5}).addTo(lines)
    debugger
    eLayer.remove()
    lines.clearLayers()
}

export function debugShowLineDirectionPriorSplit(seg, ip, oldIp) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const lines = L.layerGroup([]).addTo(map)

    L.circleMarker([ip.y, ip.x], {color: 'red'}).addTo(lines)
    L.circleMarker([oldIp.y, oldIp.x], {color: 'green'}).addTo(lines)
    let line = null

    if (seg.isHeadingLeftToRight()) {
        console.log('was gonig left to right')
        line = L.polyline([
            [seg.leftSweepEvent.p.y, seg.leftSweepEvent.p.x],
            [seg.rightSweepEvent.p.y, seg.rightSweepEvent.p.x]
        ], {color: 'orange', weight: 5}).addTo(lines)

        L.circleMarker([seg.rightSweepEvent.p.nextVertice.y, seg.rightSweepEvent.p.nextVertice.x], {color: 'pink'}).addTo(lines)

    } else {
        console.log('was gonig right to left')
        line = L.polyline([
            [seg.rightSweepEvent.p.y, seg.rightSweepEvent.p.x],
            [seg.leftSweepEvent.p.y, seg.leftSweepEvent.p.x]
        ], {color: 'orange', weight: 5}).addTo(lines)

        L.circleMarker([seg.leftSweepEvent.p.nextVertice.y, seg.leftSweepEvent.p.nextVertice.x], {radius: 20, color: 'pink'}).addTo(lines)

    }
    L.polylineDecorator(line, {
        patterns: getBasicLinePattern('orange')
    }).addTo(lines);

    debugger
    lines.clearLayers()
}

export function debugReconstructionOnMultiHit(ip, oldSeg, oldIp) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const lines = L.layerGroup([]).addTo(map)

    L.circleMarker([ip.p.y, ip.p.x], {color: 'green'}).addTo(lines)
    L.circleMarker([ip.p.nextVertice.y, ip.p.nextVertice.x], {color: 'purple'}).addTo(lines)

    L.polyline([
        [oldSeg.leftSweepEvent.p.y, oldSeg.leftSweepEvent.p.x],
        [oldSeg.rightSweepEvent.p.y, oldSeg.rightSweepEvent.p.x]
    ], {color: 'orange', weight: 5}).bindTooltip('Old Seg', { permanent: true, direction: 'top' }).addTo(lines)

    L.circleMarker([oldIp.p.y, oldIp.p.x], {color: 'red'}).addTo(lines)
    L.circleMarker([oldSeg.rightSweepEvent.p.y, oldSeg.rightSweepEvent.p.x], {color: 'orange'}).addTo(lines)    
    L.circleMarker([oldSeg.rightSweepEvent.p.nextVertice.y, oldSeg.rightSweepEvent.p.nextVertice.x], {color: 'yellow'}).addTo(lines)    

    debugger
    lines.clearLayers()
}

export function debugMultilineSplit(oldIp, thisIp, amIBetter) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const lines = L.layerGroup([]).addTo(map)

    L.circleMarker([oldIp.p.y, oldIp.p.x], {color: 'orange'}).addTo(lines)

    // L.polyline([
    //     [oldIp.segment1.leftSweepEvent.p.y, oldIp.segment1.leftSweepEvent.p.x],
    //     [oldIp.segment1.rightSweepEvent.p.y, oldIp.segment1.rightSweepEvent.p.x]
    // ], {color: 'orange', weight: 5}).bindTooltip('Old Seg 1', { permanent: true, direction: 'top' }).addTo(lines)

    const line = L.polyline([
        [oldIp.segment2.leftSweepEvent.p.y, oldIp.segment2.leftSweepEvent.p.x],
        [oldIp.segment2.rightSweepEvent.p.y, oldIp.segment2.rightSweepEvent.p.x]
    ], {color: 'orange', weight: 5}).bindTooltip('Old Seg 2', { permanent: true, direction: 'bottom' }).addTo(lines)

    L.polylineDecorator(line, {
        patterns: getBasicLinePattern('orange')
    }).addTo(lines);

    debugger
    // const p = L.circleMarker([thisIp.p.y, thisIp.p.x], {color: 'red'}).addTo(lines)
    let line2 = null
    if (amIBetter.isHeadingLeftToRight()) {
        console.log('was gonig left to right')
        line2 = L.polyline([
            [amIBetter.leftSweepEvent.p.y, amIBetter.leftSweepEvent.p.x],
            [amIBetter.rightSweepEvent.p.y, amIBetter.rightSweepEvent.p.x]
        ], {color: 'red', weight: 2}).addTo(lines)

    } else {
        console.log('was gonig right to left')
        line2 = L.polyline([
            [amIBetter.rightSweepEvent.p.y, amIBetter.rightSweepEvent.p.x],
            [amIBetter.leftSweepEvent.p.y, amIBetter.leftSweepEvent.p.x]
        ], {color: 'red', weight: 2}).addTo(lines)

    }
    L.polylineDecorator(line2, {
        patterns: getBasicLinePattern('red')
    }).addTo(lines);
    debugger
    lines.clearLayers()
}

export function debugShowLineDirectionAfterSplit(intersectionEvent, leftSegment, rightSegment) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const lines = L.layerGroup([]).addTo(map)
    L.circleMarker([intersectionEvent.p.y, intersectionEvent.p.x]).addTo(lines)
    let line, line2 = null
    if (leftSegment.isHeadingLeftToRight()) {
        line = L.polyline([
            [leftSegment.leftSweepEvent.p.y, leftSegment.leftSweepEvent.p.x],
            [leftSegment.rightSweepEvent.p.y, leftSegment.rightSweepEvent.p.x]
        ], {color: 'red', weight: 3}).addTo(lines)
    } else {
        line = L.polyline([
            [leftSegment.rightSweepEvent.p.y, leftSegment.rightSweepEvent.p.x],
            [leftSegment.leftSweepEvent.p.y, leftSegment.leftSweepEvent.p.x]
        ], {color: 'red', weight: 3}).addTo(lines)
    }
    if (rightSegment.isHeadingLeftToRight()) {
        line2 = L.polyline([
            [rightSegment.leftSweepEvent.p.y, rightSegment.leftSweepEvent.p.x],
            [rightSegment.rightSweepEvent.p.y, rightSegment.rightSweepEvent.p.x]
        ], {color: 'orange', weight: 5}).addTo(lines)
    } else {
        line2 = L.polyline([
            [rightSegment.rightSweepEvent.p.y, rightSegment.rightSweepEvent.p.x],
            [rightSegment.leftSweepEvent.p.y, rightSegment.leftSweepEvent.p.x]
        ], {color: 'orange', weight: 5}).addTo(lines)
        // L.circleMarker([seg.leftSweepEvent.p.nextVertice.y, seg.leftSweepEvent.p.nextVertice.x], {radius: 20, color: 'pink'}).addTo(lines)
    }
    L.polylineDecorator(line, {
        patterns: getBasicLinePattern('red')
    }).addTo(lines);
    L.polylineDecorator(line2, {
        patterns: getBasicLinePattern('orange')
    }).addTo(lines);
    debugger
    lines.clearLayers()
    lines.clearLayers()
}

export function debugPriorSegNewSeg(oldSeg, newSeg) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const lines = L.layerGroup([]).addTo(map)

    const line1 = L.polyline([
        [oldSeg.leftSweepEvent.p.y, oldSeg.leftSweepEvent.p.x],
        [oldSeg.rightSweepEvent.p.y, oldSeg.rightSweepEvent.p.x]
    ], {color: 'purple', weight: 5}).bindTooltip('Old Seg', { permanent: true, direction: 'left' }).addTo(lines)

    const dir = L.polylineDecorator(line1, {
        patterns: getBasicLinePattern('purple')
    }).addTo(lines);

    debugger
    lines.removeLayer(dir)
    const line2 = L.polyline([
        [newSeg.leftSweepEvent.p.y, newSeg.leftSweepEvent.p.x],
        [newSeg.rightSweepEvent.p.y, newSeg.rightSweepEvent.p.x]
    ], {color: 'orange', weight: 2}).bindTooltip('New Seg', { permanent: true, direction: 'right' }).addTo(lines)


    L.polylineDecorator(line2, {
        patterns: getBasicLinePattern('orange')
    }).addTo(lines);

    debugger
    lines.clearLayers()

}


export function debugOutputSequence(ip, ipNext, duplicate, duplicateNext) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    // const p = L.circleMarker([ip.y, ip.x], {color: 'red'}).addTo(map)
    const lines = L.layerGroup([]).addTo(map)

    const line1 = L.polyline([
        [ip.y, ip.x],
        [ipNext.y, ipNext.x]
    ], {color: 'purple', weight: 5}).addTo(lines)

    const line2 = L.polyline([
        [duplicate.y, duplicate.x],
        [duplicateNext.y, duplicateNext.x]
    ], {color: 'orange', weight: 5}).addTo(lines)

    L.polylineDecorator(line1, {
        patterns: getBasicLinePattern('purple')
    }).addTo(lines);

    L.polylineDecorator(line2, {
        patterns: getBasicLinePattern('orange')
    }).addTo(lines);
    debugger
    lines.clearLayers()
}

export function debugNewLeftRight (leftSeg, rightSeg) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    // const p = L.circleMarker([ip.y, ip.x], {color: 'red'}).addTo(map)
    const lines = L.layerGroup([]).addTo(map)

    const line1 = L.polyline([
        [leftSeg.leftSweepEvent.p.y, leftSeg.leftSweepEvent.p.x],
        [leftSeg.rightSweepEvent.p.y, leftSeg.rightSweepEvent.p.x]
    ], {color: 'purple', weight: 5}).bindTooltip('Left Seg', { permanent: true, direction: 'left' }).addTo(lines)

    const line2 = L.polyline([
        [rightSeg.leftSweepEvent.p.y, rightSeg.leftSweepEvent.p.x],
        [rightSeg.rightSweepEvent.p.y, rightSeg.rightSweepEvent.p.x]
    ], {color: 'orange', weight: 5}).bindTooltip('Right Seg', { permanent: true, direction: 'right' }).addTo(lines)

    debugger
    lines.clearLayers()
}

function getBasicLinePattern (color) {
    return [{
        offset: 0,
        repeat: 20,
        symbol: L.Symbol.arrowHead({
            pixelSize: 15,
            polygon: false,
            pathOptions: {
                stroke: true,
                color
            }
        })
    }]
}
