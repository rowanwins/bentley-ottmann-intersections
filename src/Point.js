import {areCoordsSame} from './utils'

export default class Point {

    constructor (coords) {
        this.x = coords[0]
        this.y = coords[1]
    }

    isSamePoint(pointToCheck) {
        return areCoordsSame(this.x, pointToCheck.x) && areCoordsSame(this.y, pointToCheck.y)
    }
}
