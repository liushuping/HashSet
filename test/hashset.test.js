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
		var hashset = new HashSet([1, 2, 3, 4]);
		assert.strictEqual(hashset.contains(1), true);
		assert.strictEqual(hashset.contains(2), true);
		assert.strictEqual(hashset.contains(3), true);
		assert.strictEqual(hashset.contains(4), true);
	});

	it('should differentiate string and number', function() {
		var hashset = new HashSet(1);
		hashset.add('1');
		assert.strictEqual(hashset.contains(1), true);
		assert.strictEqual(hashset.contains('1'), true);
	});

	it('should compare reference types', function() {
		var arr = [1, 2, 3, 4];
		var hashset = new HashSet();
		hashset.add(arr);
		assert.strictEqual(hashset.contains(arr), true);
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
		var hashset = new HashSet(1, 2, 3);
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

	it('should return false if right side has value not existing in lef side', function() {
		var hashset1 = new HashSet(1, 2, 3);
		var hashset2 = new HashSet(1, 2, 4);
		var result = hashset1.isSubSetOf(hashset2);
		assert.strictEqual(result, false);
	});
});

describe('#isSuperSetOf', function() {
	it('should return true if right side is an empty hashset', function() {
		var hashset1 = new HashSet();
		var hashset2 = new HashSet();
		var result = hashset1.isSuperSetOf(hashset2);
		assert.strictEqual(result, true);

		hashset1.add(2);
		result = hashset1.isSuperSetOf(hashset2);
		assert.strictEqual(result, true);
	});

	it('should return true if left side and right side are identical', function() {
		var hashset1 = new HashSet(1, 2, 3);
		var hashset2 = new HashSet(1, 2, 3);
		var result1 = hashset1.isSuperSetOf(hashset2);
		var result2 = hashset2.isSuperSetOf(hashset1);

		assert.strictEqual(result1, true);
		assert.strictEqual(result2, true);
	});

	it('should return true if left side contains all elements from right side', function() {
		var hashset1 = new HashSet(1, 2, 3);
		var hashset2 = new HashSet(2, 3);
		var result1 = hashset1.isSuperSetOf(hashset2);
		var result2 = hashset2.isSuperSetOf(hashset1);

		assert.strictEqual(result1, true);
		assert.strictEqual(result2, false);
	});

	it('should return false if right side hash set has value not existing in left side', function() {
		var hashset1 = new HashSet(1, 2, 3);
		var hashset2 = new HashSet(2, 3, 4);
		var result = hashset1.isSuperSetOf(hashset2);
		assert.strictEqual(result, false);
	});
});

describe('#equals', function() {
	it('should return true when testing 2 empty hash sets', function() {
		var hashset1 = new HashSet();
		var hashset2 = new HashSet();
		var result = hashset1.equals(hashset2);
		result = result && hashset2.equals(hashset1);
		assert.strictEqual(result, true);
	});

	it('should return false when lengths of 2 hash sets do not match', function() {
		var hashset1 = new HashSet();
		var hashset2 = new HashSet(1);
		var result = hashset1.equals(hashset2);
		assert.strictEqual(result, false);
	});

	it('should return true if 2 hash sets have identical values', function() {
		var hashset1 = new HashSet(1, 2, 3, 4, 5);
		var hashset2 = new HashSet(1, 2, 3, 4, 5);
		var result = hashset1.equals(hashset2);
		assert.strictEqual(result, true);
		result = hashset2.equals(hashset1);
		assert.strictEqual(result, true);
	});

	it('should return false if 2 hash set have different values', function() {
		var hashset1 = new HashSet(1, 2, 6, 4, 5);
		var hashset2 = new HashSet(1, 2, 3, 4, 5);
		var result = hashset1.equals(hashset2);
		assert.strictEqual(result, false);
		result = hashset2.equals(hashset1);
		assert.strictEqual(result, false);
	});
});

describe('#unionWith', function() {
	it('should remain unchanged when union with an empty hash set', function() {
		var hashset1 = new HashSet(1, 2, 3);
		var hashset2 = new HashSet();
		hashset1.unionWith(hashset2);
		assert.strictEqual(hashset1.length, 3);
	});

	it('should merge 2 hash sets', function() {
		var hashset1 = new HashSet(1, 2);
		var hashset2 = new HashSet(2, 3);
		hashset1.unionWith(hashset2);
		assert.strictEqual(hashset1.length, 3);
		assert.strictEqual(hashset1.contains(1), true);
		assert.strictEqual(hashset1.contains(2), true);
		assert.strictEqual(hashset1.contains(3), true);
	});
});