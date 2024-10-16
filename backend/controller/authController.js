const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  console.log(`its working`);
  const { email, password } = req.body;
  console.log(req.body);

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      email,
      password,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id
      },
    };

    const tokenVal= jwt.sign(payload,process.env.JWT_TOKEN,{ expiresIn: '1h' },(err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials!!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_TOKEN,
      { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.cookie('token',token,{
            httpOnly: true,
          });
          res.json({ token });
        }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
