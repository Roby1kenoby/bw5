import {Schema, model} from "mongoose"

const experiencesSchema = new Schema(
    {
        role: {
            type: String,
            // required: true
        },
        company: {
            type: String,
            // required: true
        },
        startDate: {
            type: Date,
            // required: true,
        },
        endDate:{
            type: Date,
            // required: true
        },
        area: {
            type: String
        },
        description: {
            type: String
        },
    },
    {
        collection: "experiences",
        timestamps: true
    }
)

const Experiences = model("Experience", experiencesSchema)

export default Experiences