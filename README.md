Respondo exposes some convenient methods on the `res` object of an express REST API, and adds some practical middleware for authentication.

## Responders

```javascript
app.use(respondo.responders());
```

```javascript
res.success(payload, statusCode = 200);

// For example
res.success({ name: 'Darth Vader' }, 201);

// Result (HTTP Status Code 201)
{
	"success": true,
	"code": 201,
	"result": { "name": 'Darth Vader' }
}

```

```javascript
res.failure(message, statusCode = 400);

// For example
res.failure('You are not authorized to do so!', 401);

// Result (HTTP Status Code 401)
{
	"success": true,
	"code": 401,
	"error": "You are not authorized to do so!"
}

```

## Errors

Adds standard errors 404 and 500 to the stack, as a fall-through. It also wraps Mongo validation and index errors, and presents them in a more generic way.

When called, it takes a boolean whether we are in production mode. In production mode, any error details of a generic 500 error are hidden from the user. In development mode, it falls through.

```javascript
app.use(respondo.errors(false));
```

## Authorization middleware

Given the secret key, decodes a [JSON web token](https://www.npmjs.com/package/jsonwebtoken) set on the `Authorization`header. It sets an `identity` field on the `req` object containing properties `user` (the decoded payload) and `authenticated` (a boolean indicating if there is a user).

```javascript
app.use(respondo.authorizationIdentity('ssshh!'));

// Sets the req.identity property
app.get('/', function(req, res) {
	if (!req.identity.authenticated) {
		return res.send('You are not authenticated');
	} else {
		return res.json(req.identity.user);
	}
});
```