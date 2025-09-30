
const bcrypt = require('bcrypt');

const saltRounds = 10; 
const testUserPassword = bcrypt.hashSync('password123', saltRounds);

let USERS = [
    { username: 'testuser', password: testUserPassword }
];

const findUser = (username) => USERS.find(u => u.username === username);

const registerUser = (username, password) => {
    if (!username || !password) {
        return { error: 'Username and password are required.', status: 400 };
    }

    if (findUser(username)) {
        return { error: 'Username already exists.', status: 409 };
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const newUser = { username, password: hashedPassword };
    USERS.push(newUser);

    console.log('Registered new user:', { username: newUser.username });
    console.log('Current users:', USERS);

    return {success:true,message: 'User registered successfully.',status:201 };
};

const verifyUser = (username, password) => {
    const user = findUser(username);

    if (user && bcrypt.compareSync(password, user.password)) {
        return { success: true, user: { username: user.username }, status: 200 };
    }

    return { error: 'Invalid username or password.', status: 401 };
};

module.exports = {
    registerUser,
    verifyUser
};
