HasSet
======
A simple hash set in JavaScript
[![build status](https://travis-ci.org/liushuping/HashSet.svg?branch=master)](https://travis-ci.org/liushuping/HashSet.svg?branch=master)

## Create a new HashSet
```
var HashSet = require('hashset');

//Create an empty hash set
var hashset = new HashSet();

//Create a hash set an initialize it with a value 'a'
var hashset = new HashSet('a');

//Create a hash set an initialize it with a set of values
var hashset = new HashSet('a', 'b', 'c');

//Create a hash set an initialize it with an array of avalues
var hashset = new HashSet([1, 2, 3]);
```

## Check whether a value is in the hash set
```
hashset.contains(val);
```

## Add a new value into the hash set
```
hashset.add(val);
```

## Remove a value from the hash set
```
hashset.remove(val);
```
Removing an non-existing value will not trigger any error

## Test
Make sure `mocha` is installed globally
```
npm install mocha -g
```
Run `npm test` to run unit test

## Dependencies

## License
MIT