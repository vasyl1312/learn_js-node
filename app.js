const express = require('express')
const http = require('http')
const path = require('path')

const app = express()
app.set('port', 3000)

http.createServer(app).listen(app.get('port'), function () {
  console.log('Server has listened on port ' + app.get('port'))
})

app.use(function (req, res, next) {
  if (req.url == '/') {
    res.end('Hello ')
  } else {
    next() //next щоб перейти наприклад в else на наступний міддлевейр use
  }
})

app.use(function (req, res, next) {
  if (req.url == '/test') {
    res.end('Hello from test')
  } else {
    next()
  }
})

app.use(function (req, res, next) {
  if (req.url == '/b') {
    next(new Error('Woops'))
  } else {
    next()
  }
})

app.use(function (req, res, next) {
  //NODE_ENV='production'
  if (req.get('env') == 'development') {
    var errorHandl = express.errorHandler()
    errorHandl(err, req, res, next)
  } else {
    res.send(500)
  }
})
