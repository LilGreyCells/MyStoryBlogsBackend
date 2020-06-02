var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/user')

var app = express()
var mongoose = require('mongoose')

// Connecting to the database
mongoose
  .connect(
    'mongodb+srv://user1:user1@cluster0-7zuhg.mongodb.net/BlogsDB?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log('Database is connected')
  })
  .catch((err) => {
    console.log('Error in connecting to database:  ', err.message)
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

// catch 404 and forward to error handler`
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  // res.render('error')
})

module.exports = app
