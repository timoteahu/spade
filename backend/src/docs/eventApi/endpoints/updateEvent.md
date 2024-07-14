[All Endpoints](../EventApi.md)

# Update Event

change an Event title using it's id and a new title

**URL** : `event/:groupId/eventId`

**Method** : `POST`

**Body** :

```json
{
  "title": "Event Number 1 new-title"
}
```

**Auth required** :

- Must be in group

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "id": 13,
  "title": "Event Number 1 new-title",
  "description": "event description...",
  "groupId": 2,
  "createdAt": "2024-07-10T22:10:27.687Z",
  "updatedAt": "2024-07-11T21:49:59.492Z"
}
```
