[All Endpoints](../EventApi.md)

# Get Event

Grab an event using its ID

**URL** : `/event/:eventId/get-event`

**Method** : `GET`

**Auth required** :

- must be in group to see event

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "id": 13,
  "title": "Event title",
  "description": null,
  "groupId": 2,
  "createdAt": "2024-07-10T22:10:27.687Z",
  "updatedAt": "2024-07-10T22:10:27.687Z"
}
```
