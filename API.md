Request
==================================================
API endpoints should respond to GET request with parameters in the URL. The format ends up looking like: `/api/endpoint?parameter1=value&pararmeter2=value`

Possible parameters are:
```javascript
  {
    limit: "<integer>",      // the maximum number of the best records to be returned
    interval: "<interval>",      // see Formats section
    start: "<datetime>",     // see Formats section
    end: "<datetime>"
  }
```

Limit and interval.type 

Response 
==================================================
The response to requests made to API endpoints should correctly set the HTTP status code, and return a JSON body as follows:

```json
{
  "interval": "<interval>",
  "start": "<datetime>",
  "end": "<datetime>",
  "data": [{},{},{},...]
}
```

/api/referrers
--------------------------------------------------
- The list of top referers.
```json
{
    "data": {
        "referrers": [
          {
            "name": "facebook.com",
            "count": 16
          },
          {
            "name": "google.com",
            "count": 26
          },
          {
            "name": "youtube.com",
            "count": 14
          }
        ]
    }
}

```
/api/geo
--------------------------------------------------
- The complete listing of countries for a given time interval.
```json
{
  "data": {
    "visits": [
      {
        "country": "<country>",
        "count": 18098096
      },
      {
        "country": "GER",
        "count": 26
      },
      {
        "country": "USA",
        "count": 14
      }
    ]
  }
}
```

/api/unique
--------------------------------------------------
```json
{
  "data": {
    "unique": [
      {
        "datetime": "<datetime>",
        "count": 10
      },
      {
        "datetime": "<datetime>",
        "count": 10
      }
    ],
    "nonunique": [
      {
        "datetime": "<datetime>",
        "count": 10
      },
      {
        "datetime": "2015-01-19T1:00",
        "count": 10
      }
    ]
  }
}
```

/api/bots
--------------------------------------------------
```json
{
  "data": {
    "bots": {
      "count": 16
    },
    "users": {
      "count": 6
    }
  }
}
```

/api/pages
--------------------------------------------------
```json
{
  "data": {
    "toppages": [
      {
        "name": "/indexpagename",
        "hits": 16,
        "lastModified": "<datetime>"
      },
      {
        "name": "/page2",
        "hits": 18,
        "lastModified": "<datetime>"
      },
      {
        "name": "/page3",
        "hits": 1,
        "lastModified": "<datetime>"
      }
    ]
  }
}
```

Errors
==================================================
If an error is encountered the-top level response JSON body object should include a property `errors` with an array of objects containing a property `message` and any other related metadata.
```json
{
  "errors": [
    {
      "message": "error msg"
    }
  ]
}
```

Formats
==================================================

`<interval>`
--------------------------------------------------
- Type: string
- Possible values: `"month"`,`"week"`,`"hour"`, or `"minute"`
- Purpose: define the time interval

`<datetime>`
--------------------------------------------------
- Type: string
- Possible values: any of the following [ISO 8601 formats](https://en.wikipedia.org/wiki/ISO_8601) `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`
- Implicit meaning: when defining ranges of time, the time part can be implicit, i.e. `{ start: "2015-01-01", end: "2015-01-01"}` defines a range of time from the beginning of 2015-01-01 to the very last instant in 2015-01-01. 

`<country>`
--------------------------------------------------
- Type: string of 3 chars
- Possible values: [ISO 3166-1 Alpha-3 codes](https://en.wikipedia.org/wiki/ISO_3166-1)

`<integer>`
--------------------------------------------------
- Type: integer
