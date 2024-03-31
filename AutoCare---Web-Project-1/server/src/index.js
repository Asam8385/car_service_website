const express = require('express');
const sequelize = require('./config/database');
const path = require('path');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authroutes');
const cors = require('cors');
const serviceSenderRoutes = require("./routes/serviceSenderRoutes");
const userRoutes = require("./routes/userRoute");
const offerRoutes = require("./routes/offerRoutes")
const formRoutes = require("./routes/formRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();


// Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())


app.use('/auth', authRoutes);
app.use('/ServiceSender', serviceSenderRoutes);
app.use('/user', userRoutes);
app.use('/offer', offerRoutes);
app.use('/bookings', bookingRoutes);
app.use('/form', formRoutes);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
  
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
    res.render('error');
  });


sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synchronized');
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
        });
    })
    .catch(err => {
        console.error('Database synchronization error:', err);
    });