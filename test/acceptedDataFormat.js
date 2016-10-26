/* global define describe, it */

const acceptedDataFormat = require('../lib/acceptedDataFormat');

const req = {};

req.acceptReturnValue = 'json';
req.accepts = () => req.acceptReturnValue;

const res = {
	lastcode: null,
};

res.json = payload => payload;
res.send = res.json;
res.status = code => { res.lastcode = code; return res; };

describe('acceptedDataFormat', function () {
	const acceptedDataFormatMiddleware = acceptedDataFormat();

	it('should be a function', function () {
		acceptedDataFormatMiddleware.should.be.a('function');
	});

	it('should augment res with a acceptedDataFormat function', function () {
		acceptedDataFormatMiddleware(req, res, null);
		res.acceptedDataFormat.should.be.a('function');
	});

	it('should return json when accepting json', function() {
		req.acceptReturnValue = 'json';
		const result = res.acceptedDataFormat({ name: 'Kristian' });
		result.should.be.an('object');
		result.should.deep.equal({ name: 'Kristian'	});
	});

	it('should return xml when accepting xml', function() {
		req.acceptReturnValue = 'xml';
		const result = res.acceptedDataFormat({ name: 'Kristian' });
		result.should.be.a('string');
		result.should.equal('<?xml version=\'1.0\'?>\n<result>\n    <name>Kristian</name>\n</result>');
	});
});
