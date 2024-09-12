import {Schema, model} from "mongoose"

const profileSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String
        },
        role: {
            type: String
        },
        description: {
            type: String
        },
        avatar: {
            type: String
        },
        backgroundImage:{
            type: String
        },
        experiences: [{
            type: Schema.Types.ObjectId,
            ref: "Experience"
        }],
        googleId: {
            type: String
        }
        
    }
    ,
    {
        collection: "profiles",
        timestamps: true
    }
)

const Profiles = model("Profile", profileSchema)

export default Profiles