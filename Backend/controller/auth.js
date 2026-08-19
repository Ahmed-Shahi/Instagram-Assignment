const { createUser, findUser } = require("../model/users");
const bcrypt = require('bcryptjs');

exports.createUser = async (data) => {
    try {
        if (!data || !data.email || !data.password) {
            return "Email and password are required!";
        }
        const uid = Date.now();
        const resp = await createUser(data, uid);
        return resp;
    } catch (err) {
        console.error("controller createUser error:", err);
        throw err;
    }
};

exports.loginUser = async (email, password) => {
    try {
        if (!email || !password) {
            return "Email and password are required!";
        }

        const user = await findUser(email);
        if (!user || !user.password) {
            return "Invalid email or password";
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return "Login Success";
        } else {
            return "Invalid email or password";
        }
    } catch (err) {
        console.error("controller loginUser error:", err);
        return "Invalid email or password";
    }
};