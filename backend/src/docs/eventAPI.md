# Create Event

Create an event with a description, groupId, title, etc.

**URL** : `/event/create/`

**Method** : `POST`

**Auth required** : TODO

**Permissions required** : TODO

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "id": 1234,
  "first_name": "Joe",
  "last_name": "Bloggs",
  "email": "joe25@example.com"
}
```

For a user with ID 4321 on the local database but no details have been set yet.

```json
{
  "id": 4321,
  "first_name": "",
  "last_name": "",
  "email": ""
}
```

## Notes

- If the User does not have a `UserInfo` instance when requested then one will
  be created for them.
