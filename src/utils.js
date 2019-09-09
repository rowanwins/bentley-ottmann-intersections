import {orient2d} from 'robust-predicates';

// I don't think this is really a signed area function anymore...
// but I've kept it named from what it was...
export function signedArea(p0, p1, p2) {

    // Docs from robust-predicate
    // Returns a positive value if the points p0, p1, and p2
    // occur in counterclockwise order
    // (p2 lies to the left of the directed line defined by points p0 and p1)
    return orient2d(p0.p.x, p0.p.y, p1.p.x, p1.p.y, p2.p.x, p2.p.y)
}

export function areCoordsSame (p1, p2) {
    return Math.abs(p1 - p2) < Number.EPSILON
}
