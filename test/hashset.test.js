var assert = require('assert');
var HashSet = require('../hashset.js');

describe('#contains', function() {
	it('should return false if element is not added yet.', function() {
		var hashset = new HashSet();
		assert.strictEqual(hashset.contains('a'), false);
	});

	it('should return true if element is added.', function() {
		var hashset = new HashSet('a');
		assert.strictEqual(hashset.contains('a'), true);	

		hashset = new HashSet();
		hashset.add('a');
		assert.strictEqual(hashset.contains('a'), true);
	});

	it('should initialze with all elements in the given array.', function() {
		var hashset = new HashSet([1,2,3,4]);
		assert.strictEqual(hashset.contains(1), true);
		assert.strictEqual(hashset.contains(2), true);
		assert.strictEqual(hashset.contains(3), true);
		assert.strictEqual(hashset.contains(4), true);
	});
});

describe('#remove', function() {
	it('should not throw error when removing an no-existing element.', function() {
		var hashset = new HashSet();
		assert.doesNotThrow(function() {
			hashset.remove('a')
		});
	});
});