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

		hashset = new HashSet(1, 2, 3);
		assert.strictEqual(hashset.contains(2), true);
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

describe('#length', function() {
	it('should be readonly property', function() {
		var hashset = new HashSet(1,2,3);
		assert.strictEqual(hashset.length, 3);
		hashset.length = 100;
		assert.strictEqual(hashset.length, 3);
	});
});

describe('#isSubSetOf', function() {
	it('should return true if left side is an empty hashset', function() {
		var hashset1 = new HashSet();
		var hashset2 = new HashSet();
		var result = hashset1.isSubSetOf(hashset2);
		assert.strictEqual(result, true);

		hashset2.add(4, 5);
		result = hashset1.isSubSetOf(hashset2);
		assert.strictEqual(result, true);
	});

	it('should return false if right side is empty hashset and left side not', function() {
		var hashset1 = new HashSet(1);
		var hashset2 = new HashSet();
		var result = hashset1.isSubSetOf(hashset2);
		assert.strictEqual(result, false);
	});
});