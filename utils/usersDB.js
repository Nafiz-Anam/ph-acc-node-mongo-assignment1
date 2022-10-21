const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/usersData.json");

const getUsersData = () => {
    const data = fs.readFileSync(file, "utf-8");
    const users = JSON.parse(data);
    return users;
};

const saveNewUser = async (newUser) => {
    try {
        const users = await getUsersData();
        const _id = users.length + 1;
        users.push({ ...newUser, _id });
        fs.writeFileSync(file, JSON.stringify(users));
        return {
            success: true,
            message: "User Successfully saved!!!",
            data: { ...newUser, _id },
        };
    } catch (err) {
        return { success: false, message: "Failed to save user!!!" };
    }
};

const updateUser = async (updatedData) => {
    try {
        fs.writeFileSync(file, JSON.stringify(updatedData));
        return { success: true, message: "User updated successfully!!!" };
    } catch (err) {
        return { success: false, message: "Failed to update user data!!!" };
    }
};

const deleteOne = async (selectedId) => {
    try {
        const users = await getUsersData();
        const residualUsers = users.filter(
            (user) => user._id.toString() !== selectedId.toString()
        );
        if (users.length === residualUsers.length)
            return { message: "Users not found!!!" };

        fs.writeFileSync(file, JSON.stringify(residualUsers));
        return { success: true, message: "User deleted successfully!!!" };
    } catch (err) {
        return { success: false, message: "Failed to delete user!!!" };
    }
};

module.exports = { getUsersData, saveNewUser, updateUser, deleteOne };
