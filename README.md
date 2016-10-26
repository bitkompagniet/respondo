Respondo exposes some convenient methods on the `res` object of an express REST API.

```javascript
app.use(respondo.responders());
app.use(respondo.errors());
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

