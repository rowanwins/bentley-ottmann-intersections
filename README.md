# bentley-ottmann-intersections
A small module using the Bentley-Ottmann algorithm to detection self-intersections

## Install
````
npm install bentley-ottmann-intersections
````

## Documentation
Valid inputs: Geojson `Polygon`, `MultiPolygon`

````js
    const findIntersections = require('bentley-ottmann-intersections')

    const box = {type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]}
    findIntersections(box)
    // returns array os intersection points

````

## Benchmarks
Tested against 
- gpsi - https://www.npmjs.com/package/geojson-polygon-self-intersections
- isects - https://www.npmjs.com/package/2d-polygon-self-intersections
````
// Switzerland with kinks
// bentleyOttmannIntersections x 2,333 ops/sec ±1.79% (89 runs sampled)
// gpsi x 36.78 ops/sec ±2.03% (49 runs sampled)
// isects x 12.70 ops/sec ±1.37% (36 runs sampled
// - Fastest is bentleyOttmannIntersections

// Simple Case
// gpsi x 246,005 ops/sec ±1.54% (90 runs sampled)
// bentleyOttmannIntersections x 464,363 ops/sec ±1.73% (95 runs sampled)
// - Fastest is bentleyOttmannIntersections
````

## Further Reading
[Geom algorithms website](http://geomalgorithms.com/a09-_intersect-3.html#Bentley-Ottmann-Algorithm)

