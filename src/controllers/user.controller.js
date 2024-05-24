import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { user } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const registerUser = asyncHandler(async (req, res) => {

    //get details from frontend
    //validation- not empty
    // check if user already exisits: check email username
    //check image,check for avatar
    //upload cloudinary
    //create user object- create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res user created

    const { username, email, fullname, password } = req.body //get details from frontend

    //validation- not empty
    if ([fullname, email, username, password].some((field) =>
        field?.trim() === "")

    ) {
        throw new ApiError(400, "all fields are required")
    }
    // check if user already exisits: check email username
    const existedUser = user.find({
        $or: [{ username }, { email }]
    })


    if (existedUser) {
        throw new ApiError(400, "User with email already existed")
    }
    //check image,check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverimageLocalPath = req.files?.coverimage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file required")
    }
    //upload cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverimage = await uploadOnCloudinary(coverimageLocalPath);

    if (!avatar) { throw new ApiError(400, "Avatar file is required") }

    //create user object- create entry in db

    const user = await user.create({
        fullname,
        avatar: avatar.url,
        coverimage: coverimage?.url || "",
        email,
        password,
        username: username.toLowerCase()

    })
    //checking if user created at DB or not
    const createdUser = await user.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong")
    }

    






})

export default registerUser;