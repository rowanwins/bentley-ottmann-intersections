import {orient2d} from 'robust-predicates';

// Returns a positive value if the points p0, p1, and p2
// occur in counterclockwise order
// (p2 lies to the left of the directed line defined by points p0 and p1)
export function signedArea(p0, p1, p2) {
    return orient2d(p0.p.x, p0.p.y, p1.p.x, p1.p.y, p2.p.x, p2.p.y)
}

export function areCoordsSame (p1, p2) {
    return Math.abs(p1 - p2) < Number.EPSILON
}
