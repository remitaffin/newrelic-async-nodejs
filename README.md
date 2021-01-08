# newrelic-async-nodejs

Tests the NewRelic Node.js agent with synchronous web endpoints vs asynchronous web endpoints.
In this repository, the following endpoints are:
* `/`: Runs 1000 queries and then returns a 200
* `/background`: Runs 1000 queries asynchronously and returns 200

### Pre-requisites

Docker and docker-compose must be installed.

### Local Setup

1. `docker-compose up`

2. Go to http://localhost:3000/ to load the "synchronous" endpoint, which will take ~ 3 seconds and report to NewRelic successfully

3. Go to http://localhost:3000/background to load the "asynchronous" endpoint, which will return a 200 within a few milliseconds and then process the 1000 queries asynchronously. This only partially reports to NewRelic and only shows a few query and not the 1000 queries. NewRelic stops recording as soon as the 200 is returned.
