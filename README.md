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
// gpsi x 36.78 ops/sec ±2.03% (49 runs sampled)
// bentleyOttmannIntersections x 2,047 ops/sec ±1.79% (89 runs sampled)
// isects x 14.22 ops/sec ±1.73% (40 runs sampled)
// - Fastest is bentleyOttmannIntersections

// Simple Case
// gpsi x 246,005 ops/sec ±1.54% (90 runs sampled)
// bentleyOttmann x 535,293 ops/sec ±1.73% (95 runs sampled)
// - Fastest is bentleyOttmannIntersections
````

## Contributing
- For a live dev server run `npm run debug`. 
  - The geometry being tested can be modified in `debug/src/App.vue`
- There are a couple of test suites
  - `npm run test` runs all tests
  - `npm run test:e2e` does a general test that the correct number of self-intersections are found in the `test/fixtures` folder
  - `npm run test:unit` is unit style tests to make sure functions & methods do the right thing
    - these need some love


## Further Reading
- [Original paper](https://github.com/rowanwins/bentley-ottmann-intersections/blob/master/1979-Bentley.pdf)
- [Geom algorithms website](http://geomalgorithms.com/a09-_intersect-3.html#Bentley-Ottmann-Algorithm)
- [Lecture notes by M Smid from Carleton University](https://people.scs.carleton.ca/~michiel/lecturenotes/ALGGEOM/bentley-ottmann.pdf)

