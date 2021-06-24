## Install & Run

```
$ git clone https://github.com/michael-act/FreeCodeCamp
$ cd FreeCodeCamp/Timestamp
$ npm install
$ npm start
```

#### Try your first Timestamp Backend program

```shell
$ curl -X GET HOST_IP:PORT/api/
{
  "unix": 1624444092200,
  "utc": "Wed, 23 Jun 2021 10:28:12 GMT",
}

$ curl -X GET HOST_IP:PORT/api/1624444092200
{
  "unix": 1624444092200,
  "utc": "Wed, 23 Jun 2021 10:28:12 GMT",
}

$ curl -X GET HOST_IP:PORT/api/2015-12-25
{
	"unix":1451001600000, 
	"utc":"Fri, 25 Dec 2015 00:00:00 GMT"
}
```
Please understand the codes in `./src` for further understanding. 
