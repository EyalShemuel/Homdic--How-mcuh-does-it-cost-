const User = require("../s-models/user");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const saltRounds = 12;
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.loginUser = async function (req, res) {
    try {
          const { username, password } = req.body;
        const userFound = await User.findOne({
            $or: [{ username: username }, { email: username }],
        });

        hash = userFound.password;
        bcrypt.compare(password, hash, function (err, result) {
            if (result) {
                const token = jwt.encode(
                    {
                        id: userFound._id,
                        role: userFound.role,
                        username: userFound.username,
                        fName: userFound.firstName,
                        lName: userFound.lastName,
                        time: new Date().getTime(),
                    },
                    process.env.SECRET
                );
                res.cookie("userLoggedIn", token, {
                    maxAge: 7200000,
                    httpOnly: true,
                });
                res.send({ status: "authorized" });
            } else {
                res.send({ status: "unauthorized" });
                res.end();
            }
        });
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};

exports.registerUser = async function (req, res) {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        const newUser = new User({
            email: email,
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
        });

        bcrypt.hash(newUser.password, saltRounds, async function (err, hash) {
            newUser.password = hash;
            await newUser.save();

            const token = jwt.encode(
                {
                    role: newUser.role,
                    username: newUser.username,
                    fName: newUser.firstName,
                    lName: newUser.lastName,
                    time: new Date().getTime(),
                    id: newUser._id,
                },
                process.env.SECRET
            );
            res.cookie("userLoggedIn", token, {
                maxAge: 7200000,
                httpOnly: true,
            });
            res.send({ status: "authorized" });
        });
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.logUserOut = function (req, res) {
    try {
        res.cookie("userLoggedIn", "", { expires: new Date(0) }); // this delete cookie (sets it to a date that is gone)

        res.send({ loggedout: true });
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.getUserInfo = function (req, res) {
    try {
        const token = req.cookies.userLoggedIn;
        if (token) {
            const decoded = jwt.decode(token, process.env.SECRET);
            res.send({ decoded });
        } else {
            res.send({ ok: false });
        }
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.resetPassword = async function (req, res) {
    try {
        const userEmail = req.body.userEmail;
        const userFound = await User.findOne({ email: userEmail });
        if (userFound) {
            const userId = userFound._id;
            const encodedId = jwt.encode(userId, process.env.SECRET);
            const tranporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAILPASSWORD,
                },
            });

            const mailOptions = {
                from: "Homedic Support",
                to: `${userEmail}`,
                subject: "Reset your password at Homedic",
                html: `<p>Hey there!,
              We heard that you forgot your password, Click on the link below to reset your password and enjoy Homedic!.</p><br>http://localhost:3000/updateUserPassword.html?${encodedId} `,
            };

            tranporter.sendMail(mailOptions, function (e, info) {
                if (e) {
                    res.send({ email: "failed" });
                } else {
                    res.send({ email: "success" });
                }
            });
        } else {
            res.send({ email: "failed" });
        }
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.checkUserCookie = function (req, res) {
    try {
        res.send({ validCookie: true })
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};