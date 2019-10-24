const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {secret} = require('../index');
const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'procost'
  })

//to authenticate the user by jwt strategy
module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = secret;
    passport.use(new JwtStrategy (opts, (jwt_payload, done) =>{
              //  Admin.getAdminById(jwt_payload.data._id, (err, user) =>{
                mysqlConnection.query('SELECT * from user WHERE Id =?', [jwt_payload.data[0].Id], function(err, user){                    
                   // console.log(jwt_payload.data[0]);
                    if(err) return done(err, false);

                        if(user) return done(null, user);
                     
                   // return done(null, false);                    
                });              
    }));
}