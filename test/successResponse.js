/* global define describe, it */

const chai = require('chai');
const should = chai.should();
const successResponse = require('../lib/successResponse');

const res = {
	lastcode: null,
};

res.acceptedDataFormat = payload => payload;
res.status = code => { res.lastcode = code; return res; };

describe('successResponse', function () {
	const successMiddleware = successResponse();

	it('should be a function', function () {
		successMiddleware.should.be.a('function');
	});

	it('should augment res with a success function', function () {
		successMiddleware(null, res, null);
		res.success.should.be.a('function');
	});

	it('should return the defaults when given just payload', function() {
		const result = res.success({ name: 'Kristian' });
		result.should.be.an('object');
		result.should.deep.equal({
			success: true,
			code: 200,
			result: { name: 'Kristian' },
		});
	});

	it('should allow a custom status code', function() {
		const result = res.success({ name: 'Kristian' }, 201);
		result.should.deep.equal({
			success: true,
			code: 201,
			result: { name: 'Kristian' },
		});

		res.lastcode.should.equal(201);
	});

	it('should throw if the status code is not in the success range', function() {
		should.throw(() => res.success({ name: 'Kristian' }, 400));
		should.throw(() => res.success({ name: 'Kristian' }, 401));
		should.throw(() => res.success({ name: 'Kristian' }, 500));
	});
});
