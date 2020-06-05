var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/user')
var postsRouter = require('./routes/post')
const dotenv = require('dotenv')
dotenv.config()
var app = express()
var mongoose = require('mongoose')
const { ErrorHandler } = require('./helpers/errorHandler')

// Connecting to the database
mongoose
  .connect(
    'mongodb+srv://user1:user1@cluster0-7zuhg.mongodb.net/BlogsDB?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log('Connected to the Database.')
  })
  .catch((err) => {
    console.log(
      'There was an error with connecting to the database:  ',
      err.message
    )
  })

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/user', usersRouter)
app.use('/post', postsRouter)

// error handler
app.use((err, req, res, next) => {
  console.log(err)
  err.handleError(res)
})

module.exports = app
