HasSet
======
A simple hash set in JavaScript

[![build status](https://travis-ci.org/liushuping/HashSet.svg?branch=master)](https://travis-ci.org/liushuping/HashSet.svg?branch=master)

## Create a new HashSet
```javascript
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

## Properties
### length
Get the length of the hash set
```javascript
hashset.length;
```

## Methods
### equals
Tests whether current hash set equals to another
```javascript
var hashset1 = new HashSet(1, 2, 3, 4, 5);
var hashset2 = new HashSet(1, 2, 3, 4, 5);
var result = hashset1.equals(hashset2); //true
```

### contains
Check whether a value is in the hash set
```javascript
hashset.contains(val);
```

### add
Add a new value into the hash set
```javascript
hashset.add(val);
```

### remove
Remove a value from the hash set
```javascript
hashset.remove(val);
```
Removing an non-existing value will not trigger any error

### isSubSetOf
Tests whether a hash set is a sub set of another. Empty hash set is a sub set of any other hash set including another empty hash set.
```javascript
var hashset1 = new HashSet();
var hashset2 = new HashSet();
var result = hashset1.isSubSetOf(hashset2);
```
### isSuperSetOf
Tests whether a hash set is a super set of another. Any hash set is a super set of empty hahs set including an empty hash set.
```javascript
var hashset1 = new HashSet(1, 2, 3);
var hashset2 = new HashSet(1, 2, 3);
var hashset3 = new HashSet();
var result1 = hashset1.isSuperSetOf(hashset2); //true
var result2 = hashset2.isSuperSetOf(hashset1); //true
var result3 = hashset1.isSuperSetOf(hashset3); //true
var result3 = hashset3.isSuperSetOf(hashset1); //false
```

### unionWith
Union current hash set with another
```javascript
var hashset1 = new HashSet(1, 2);
var hashset2 = new HashSet(2, 3);
hashset1.unionWith(hashset2);
console.log(hashset1.values); //[1,2,3];
```

## Test
Make sure `mocha` is installed globally
```
npm install mocha -g
```
Run `npm test` to run unit test

## Dependencies

## License
MIT