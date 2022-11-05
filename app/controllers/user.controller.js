const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userService = require('.././Services/UserServices');

const JWTstrategy = require('passport-jwt').Strategy;
const Extractjwt = require('passport-jwt').ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: Extractjwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'signup',
  new localStrategy(
    {
      first_name: 'first_name',
      last_name: 'last_name',
      email: 'email',
      password: 'password',
    },
    async (first_name, last_name, email, password, done) => {
      try {
        const user = await userService.createUser({
          first_name,
          last_name,
          email,
          password,
        });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      email: 'email',
      password: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await userService.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong password' });
        }

        return done(null, user, { message: 'Logged in successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// exports.createUser = async (req, res) => {
//   try {
//     const { first_name, last_name, email, password } = req.body;

//     const user = await userService.createUser({
//       first_name,
//       last_name,
//       email,
//       password,
//     });
//     res.status(201).json({ data: null, message: 'User Added successfully' });
//   } catch (error) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getUserByID = async (req, res) => {
//   try {
//     const user = await userService.getUserByID(req.params.id);
//     res.status(201).json({
//       blog,
//       message: 'Success',
//     });
//   } catch (error) {
//     res.status(500).json({ error: err.message });
//   }
// };
