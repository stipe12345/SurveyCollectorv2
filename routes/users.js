const router = require("express").Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const auth = require("../middleware/auth");
const User = require("../models/user.model");
const VerifyToken=require("../models/token.model");
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, firstName, lastName } = req.body;
    function validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
    if(!validateEmail(email))
    return res.status(400).json({ msg: "Not a valid email adress" });
    // validate
    if (!email || !password || !passwordCheck || !firstName || !lastName)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      firstname: firstName,
      lastname: lastName,
    });
    const savedUser = await newUser.save();
      var token = new VerifyToken({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });
      token.save(function (err) {
        if(err){
          return res.status(500).send({msg:err.message});
        }
        const linkto=`http://surv3y-coll3ctor.herokuapp.com/confirmation/${email}/${token.token}`
      const msg = {
        to: newUser.email, // Change to your recipient
        from: 'surv3ycoll3ctor@gmail.com', // Change to your verified sender
        subject: 'Account Verification',
        html: '<p>Hello '+firstName+' '+lastName+', Please verify your account by clicking link:<a href=' +linkto+ '>'+'http://surv3y-coll3ctor.herokuapp.com' + '\/confirmation\/' + email + '\/' + token.token+'</a></p>',
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
    });
  console.log(savedUser);
    res.json(savedUser);
}
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/resendmail",async(req,res)=>{
  let {email}=req.body;
  const ResendUser=User.findOne({email:email})
  var token = new VerifyToken({ _userId: ResendUser._id, token: crypto.randomBytes(16).toString('hex') });
      token.save(function (err) {
        if(err){
          return res.status(500).send({msg:err.message});
        }
        const linkto=`http://surv3y-coll3ctor.herokuapp.com/confirmation/${email}/${token.token}`
      const msg = {
        to: ResendUser.email, // Change to your recipient
        from: 'surv3ycoll3ctor@gmail.com', // Change to your verified sender
        subject: 'Account Verification',
        html: '<p>Hello '+ResendUser.firstname+' '+ResendUser.lastname+', Please verify your account by clicking link:<a href=' +linkto+ '>'+'http://surv3y-coll3ctor.herokuapp.com' + '\/confirmation\/' + email + '\/' + token.token+'</a></p>',
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
    });

})
router.post("/verify",async(req,res)=>{

const {email}=req.body;
const user=User.findOne({email:email});
if(user)
{user.isVerified=true;
const updatedUser=await user.save();
return res.json(updatedUser);}
else
return res
        .status(500)
        .json({ msg: "error while validating user" });
})
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.firstname,
        isVerified:user.isVerified,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.firstname,
    id: user._id,
  });
});

module.exports = router;
