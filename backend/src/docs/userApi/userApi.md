Sure! Here are the `.md` documentation files for the provided code:

## createUser.md

### Description

Creates a new user with the provided `username` and `email`.

### Endpoint

`POST /users`

### Request Body

```json
{
  "username": "string",
  "email": "string"
}
```

### Response

- **201 Created**
  ```json
  {
    "id": "int",
    "username": "string",
    "email": "string",
    "createdAt": "DateTime",
    "updatedAt": "DateTime"
  }
  ```

## login.md

### Description

Logs in a user by generating a JWT token if the user with the provided email exists.

### Endpoint

`POST /users/login`

### Request Body

```json
{
  "email": "string"
}
```

### Response

- **200 OK**
  ```json
  {
    "token": "string"
  }
  ```

### Description

Fetches a user by their `userId`.

### Endpoint

`GET /users/:userId`

### Path Parameters

- `userId`: The ID of the user to fetch.

### Response

- **200 OK**
  ```json
  {
    "id": "int",
    "username": "string",
    "email": "string",
    "createdAt": "DateTime",
    "updatedAt": "DateTime"
  }
  ```
  - If the user does not exist:
    ```json
    {}
    ```
- **4xx/5xx Errors**
  - See error handling documentation for details.

### Example

```bash
curl http://localhost:3000/api/users/1
```

## deleteUser.md

### Description

Deletes a user by their `userId`.

### Endpoint

`DELETE /api/users/:userId`

### Path Parameters

- `userId`: The ID of the user to delete.

### Response

- **200 OK**
  ```json
  {
    "id": "int",
    "username": "string",
    "email": "string",
    "createdAt": "DateTime",
    "updatedAt": "DateTime"
  }
  ```
- **4xx/5xx Errors**
  - See error handling documentation for details.

### Example

```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## Error Handling

Errors are handled by the `createError` middleware and passed to the `next` function. Typical error responses include:

- **400 Bad Request**
  ```json
  {
    "error": "string"
  }
  ```
- **404 Not Found**
  ```json
  {
    "error": "string"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "error": "string"
  }
  ```
