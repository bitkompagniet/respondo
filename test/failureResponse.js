/* global define describe, it */

const chai = require('chai');
const should = chai.should();
const failureResponse = require('../lib/failureResponse');

const res = {
	lastcode: null,
};

res.acceptedDataFormat = payload => payload;
res.status = code => { res.lastcode = code; return res; };

describe('failureResponse', () => {
	const failureMiddleware = failureResponse();

	it('should be a function', function() {
		failureMiddleware.should.be.a('function');
	});

	it('should augment res with a failure function', function() {
		failureMiddleware(null, res, null);
		res.failure.should.be.a('function');
	});

	it('should return the defaults when given just payload', function() {
		const result = res.failure('That is not going to work!');
		result.should.be.an('object');
		result.should.deep.equal({
			success: false,
			code: 400,
			error: 'That is not going to work!',
		});
		result.should.not.contain.keys('result');
	});

	it('should allow a custom status code', function() {
		const result = res.failure('Error', 500);
		result.should.deep.equal({
			success: false,
			code: 500,
			error: 'Error',
		});

		res.lastcode.should.equal(500);
	});

	it('should throw if the status code is not in the failure range', function() {
		should.throw(() => res.failure('Error', 100));
		should.throw(() => res.failure('Error', 200));
		should.throw(() => res.failure('Error', 305));
	});
});
