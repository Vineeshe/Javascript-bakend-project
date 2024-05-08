import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = newSchema({
    videoFile: {
        type: String, //cloud
        required: true
    },
    thumbnail: {
        type: String,
        required: true

    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: true,

    },
    discription: {
        type: String,
        required: true
    },
    duration: {
        type: Number,//cloudinary
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    }





}, { timestamps: true })








videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)