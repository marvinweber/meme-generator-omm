import crypto from 'crypto';
import { SignJWT } from 'jose';
import User from '../models/user.js';

/* Get Endpoint for retrieving the currently logged-in user. */
export const getUser = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

/** Controller for creating a new user. */
export const registerUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  if (!email || !password || !name) {
    return res.status(400).json({ success: false });
  }

  // note: this should be improved for a real production app (e.g., salting)
  const hashedPassword = crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');

  // generates avatars consisting of initial letters
  const avatarUrl = encodeURI(
    `https://eu.ui-avatars.com/api/?size=128&name=${name}`
  );

  try {
    const newUser = await User({
      email,
      name,
      password: hashedPassword,
      registeredAt: new Date(),
      profilePicUrl: avatarUrl,
    }).save();

    return res.json({
      success: true,
      user: newUser,
    });
  } catch (e) {
    let msg = 'Unkown error!';

    // check for duplicate key error
    if (e.name === 'MongoServerError' && e.code === 11000) {
      msg = 'E-Mail already registered!';
    }

    return res.status(400).json({ success: false, message: msg });
  }
};

/** Controller to log the user in (and create JWT token). */
export const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ success: false });
  }

  const hashedPassword = crypto
    .createHash('sha256')
    .update(req.body.password || undefined)
    .digest('hex');

  if (user.password !== hashedPassword) {
    return res.status(400).json({ success: false });
  }

  const secretKey = crypto.createSecretKey(process.env.JWT_SECRET);
  const jwt = await new SignJWT({
    _id: user._id,
    name: user.name,
    email: user.email,
    picture: user.profilePicUrl,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER)
    .setExpirationTime('2h')
    .sign(secretKey);

  return res.json({ success: true, user, jwt });
};
