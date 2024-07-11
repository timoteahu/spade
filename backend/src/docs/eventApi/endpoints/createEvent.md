[All Endpoints](../EventApi.md)

# Create Event

Create an event with a description, groupId, title, etc.

**URL** : `/event/create/`

**Method** : `POST`

**Body** :

```json
{
  "title": "Event Number 1 title",
  "description": "idk",
  "groupId": 2
}
```

**Auth required** : TODO

**Permissions required** : TODO

## Success Response

**Code** : `201 Created`

**Content examples**

```json
{
  "id": 17,
  "title": "Event title",
  "description": "some description...",
  "groupId": 2,
  "createdAt": "2024-07-11T21:04:29.239Z",
  "updatedAt": "2024-07-11T21:04:29.239Z"
}
```
