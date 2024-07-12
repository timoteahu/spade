## How to Handle Errors

### In a controller

- when creating endpoints, use a try-catch block to handle errors. When you want to throw an error create an error with the createError() function and pass it into the next() callback. There is an automatic middleware function that will send a response to the client.

**example**

```js
const function = async(req, res, next) => {
  try{
    ...
    if(...) throw createError(statusCode, Message);
  }catch (error) {
    next(error);
  }
}
```

**response to client**

```json
{
  "message": "required argument is missing"
}
```
