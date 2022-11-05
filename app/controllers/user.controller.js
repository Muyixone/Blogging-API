// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
const userService = require('.././Services/UserServices');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_EXPIRY = process.env.JWT_EXPIRY

//A function to create a token
const signInToken = (id) => {
  return (
    jwt.sign({ id }),
    JWT_SECRET,
    {
      expiresIn: '1hr',
    }
  );
};

//Sign up a new user
exports.createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });
    const token = signInToken(newUser._id);
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Unable to create user' });
  }
};

//LOGIN IN USER

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new Error('Provide a valid email and password', 401));
    }
    const user = await userService.login({ email }).select('+password');
    if (!user) {
      return next(new Error('User not found', 401));
    }
    const validatePassword = bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return next(new Error('Wrong password', 401));
    }
    const token = signInToken(user._id);
    res.status(201).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(401).json({ message: 'Provide valid email and/or password' });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(new Error('Unauthirized, Login to continue', 401));
    }

    //Verify token
    const user = jwt.verify(token, JWT_SECRET);

    //Confirm if user still exists
    const currentUser = await userService.authenticate(user.id);
    if (!currentUser) {
      return next(new Error('User does not exists', 401));
    }
    req.user = currentUser;
    next();
  } catch (err) {
    return err;
  }
};

// // const JWTstrategy = require('passport-jwt').Strategy;
// // const Extractjwt = require('passport-jwt').ExtractJwt;

// passport.use(
//   new JWTstrategy(
//     {
//       secretOrKey: process.env.JWT_SECRET,
//       jwtFromRequest: Extractjwt.fromUrlQueryParameter('secret_token'),
//     },
//     async (token, done) => {
//       try {
//         return done(null, token.user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

// passport.use(
//   'signup',
//   new localStrategy(
//     {
//       firstnameField: 'firstname',
//       lastnameField: 'lastname',
//       email: 'email',
//       password: 'password',
//       passReqToCallback: true,
//     },
//     async (req, email, password, done) => {
//       try {
//         const user = await userService.createUser({
//           req,
//           email,
//           password,
//         });
//         return done(null, user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

// passport.use(
//   'login',
//   new localStrategy(
//     {
//       email: 'email',
//       password: 'password',
//     },
//     async (email, password, done) => {
//       try {
//         const user = await userService.findOne({ email });

//         if (!user) {
//           return done(null, false, { message: 'User not found' });
//         }

//         const validate = await user.isValidPassword(password);

//         if (!validate) {
//           return done(null, false, { message: 'Wrong password' });
//         }

//         return done(null, user, { message: 'Logged in successfully' });
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );
