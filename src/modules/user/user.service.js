import { usermodel } from "../../DB/modules/user.model.js"



export const getUsers = async (req, res) => {
    try {
    const users = await usermodel.findAll({
        attributes: ["id", "firstname", "lastname", "email"],
        order: [["id", "ASC"]],
    });

    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
        message: "Users retrieved successfully",
        users,
    });
    } catch (error) {
    console.error("Full Error:", error);
    res.status(500).json({
        message: "Error fetching users",
        error: error.message,
    });
    }
};




export const getemail = async (req, res) => {
    try {
    const { email } = req.params;

    const result = await usermodel.findOne({ where: { email } });

    if (!result) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        message: "User found",
        user: result,
    });
    } catch (error) {
    console.error("Full Error:", error);
    res.status(500).json({
        message: "Error fetching user",
        error: error.message,
    });
    }
};

export const updateuser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, email } = req.body;

        const result = await usermodel.update(
            { firstname, lastname, email },
            { where: { id } }
        );

        if (result[0] === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Update user successful"
        });

    } catch (error) {
        console.error('Full Error:', error);
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
};


export const signup = async(req, res) => {
    try {
        const {firstname, lastname, email, password} = req.body;
        
        console.log('Received data:', {firstname, lastname, email, password}); 
        
        const user = await usermodel.create({
            firstname,
            lastname,
            email,
            password
        });
        
        res.status(201).json({
            message: "User created successfully",
            user
        });
        
    } catch (error) {
        console.error('Full Error:', error);
        res.status(500).json({
            message: "Error creating user",
            error: error.message,
            details: error.original?.message || error 
        });
    }
}