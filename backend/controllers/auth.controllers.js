import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        console.log(req.body);
        
        const { userName, fullName, email, password } = req.body;

        // Check for missing fields
        if (!userName || !fullName || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Check if email or username already exists
        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ userName });

        if (existingEmail) {
            return res.status(400).json({ error: "Email is already in use" });
        }

        if (existingUsername) {
            return res.status(400).json({ error: "Username is already taken" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must have at least 6 characters" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            userName,
            fullName,
            email,
            password: hashedPassword
        });

        if(newUser){
            generateToken(newUser._id, res);
            // Save new user to the database
            await newUser.save();
            // Respond with the new user's details
            res.status(200).json({
                _id: newUser._id,
                username: newUser.userName,
                fullName: newUser.fullName,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
                bio: newUser.bio,
                link: newUser.link
            });
        }
    } catch (error) {
        console.log(`Error in signup controller: ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const login = async (req, res)=>{
    try{
        const {userName, password} = req.body;
        const user = await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error : "Invalid Username or Password"})
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id: User._id,
            username: User.userName,
            fullName: User.fullName,
            email: User.email,
            followers: User.followers,
            following: User.following,
            profileImg: User.profileImg,
            coverImg: User.coverImg,
            bio: User.bio,
            link: User.link
        })

    } catch (error){
        console.log(`Error in login controller: ${error}`)
        res.status(500).json({error: "Internal Server Error"});
    }
    
}


export const logout = async (req, res)=>{
    try{
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message: "Logout Successfully"});

    }catch (error){
        console.log(`Error in logout controller:${error}`)
        res.status(500).json({error: "Internal Server Error"});

    }
}

export const getMe = async (req, res)=>{
    try{
        const user = await User.findOne({_id : req.user._id}).select("-password")
        res.status(200).json(user);
    }catch (error){
        console.log(`Error in getMe controller:${error}`)
        res.status(500).json({error: "Internal Server Error"});
    }
}