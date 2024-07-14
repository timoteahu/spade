[All Endpoints](../EventApi.md)

# Get Group Events

Grab all events of a group using its ID

**URL** : `/event/:groupId/get-group-events`

**Method** : `GET`

**Auth required** :

- Must be in group

## success response

**code** : `200 ok`

**content examples**

```json
[
  {
    "id": 13,
    "title": "Event Number 1 title",
    "description": null,
    "groupId": 2,
    "createdAt": "2024-07-10T22:10:27.687Z",
    "updatedAt": "2024-07-10T22:10:27.687Z"
  },
  {
    "id": 17,
    "title": "Event Number 2 title",
    "description": "description...",
    "groupId": 2,
    "createdAt": "2024-07-11T21:04:29.239Z",
    "updatedAt": "2024-07-11T21:04:29.239Z"
  }
]
```
