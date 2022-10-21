const usersData = require("../utils/usersDB");

// get all users
module.exports.getAllUsers = async (req, res) => {
    const allUsers = await usersData.getUsersData();
    const limit = req?.query?.limit;
    if (limit) {
        return res.send(allUsers.slice(0, limit));
    }
    res.send(allUsers);
};

// get a random user
module.exports.getRandomUser = async (req, res) => {
    const allUsers = await usersData.getUsersData();
    const randomNumber = Math.floor(Math.random() * allUsers.length);
    const randomUser = allUsers[randomNumber];
    res.send(randomUser);
};

// post a new user
module.exports.saveUser = async (req, res) => {
    const newUser = req.body;
    if (
        newUser.gender &&
        newUser.name &&
        newUser.contact &&
        newUser.address &&
        newUser.photoUrl
    ) {
        const status = await usersData.saveNewUser(newUser);
        res.send(status);
    } else {
        res.send({
            message: "Please fill-up all fields.",
            field: "name, gender, contact, address, photoURL",
        });
    }
};

// update a user
module.exports.updateUser = async (req, res) => {
    const { _id } = req.body;

    const allUsers = await usersData.getUsersData();
    const userIndex = allUsers.findIndex(
        (user) => user._id.toString() === _id.toString()
    );

    const modifiedUser = { ...allUsers[userIndex], ...req.body };
    allUsers[userIndex] = modifiedUser;

    const status = await usersData.updateUser(allUsers);
    res.send(status);
};

// update bulk users
module.exports.updateBulkUsers = async (req, res) => {
    const { id, data } = req.body;
    // console.log(data);

    const allUsers = await usersData.getUsersData();

    id.forEach(async (item) => {
        const selectedUser = allUsers.findIndex(
            (user) => user._id.toString() === item.toString()
        );
        const user = { ...allUsers[selectedUser], ...data };
        allUsers[selectedUser] = user;
        // console.log(user);
    });

    const status = await usersData.updateUser(allUsers);
    res.send(status);
};

// delete a user
module.exports.deleteUser = async (req, res) => {
    const { id } = req.query;
    if (!id) return res.send({ message: "User not found!!!" });

    const status = await usersData.deleteOne(id);
    res.send(status);
};
