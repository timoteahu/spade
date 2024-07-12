[All Endpoints](../EventApi.md)

# Change Description

change an Event description using it's id and a new description

**URL** : `event/:eventId/description`

**Method** : `POST`

**Body** :

```json
{
  "description": "event description..."
}
```

**Auth required** : TODO

**Permissions required** : TODO

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "id": 13,
  "title": "Event Number 1 title",
  "description": "event description...",
  "groupId": 2,
  "createdAt": "2024-07-10T22:10:27.687Z",
  "updatedAt": "2024-07-11T21:49:59.492Z"
}
```
