import {model, Schema} from 'mongoose';

const SongSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "A Song Title is required!"],
            minlength: [1, "Song Title must be at least 1 characters long!"],
            maxlength: [30, "Song Title must be less than 30 characters long"]
        },
        artist: {
            type: String,
            required: [true, "An Artist name is required!"],
            minlength: [1, "Artist name must be at least 1 characters long!"],
            maxlength: [50, "Artist name must be less than 50 characters long"]
        },
        yearReleased: {
            type: Number,
            required: [true, "A Release Year is required!"],
            min: [1500, "No songs before 1500"],
            max: [2025, "No songs past 2025"]
        },
        background: {
            type: String,
            required: [true, "A background is required!"],
            minlength: [1, "Background must be at least 1 characters long!"],
            maxlength: [250, "Background must be less than 250 characters long"]
        },
        link: {
            type: String,
            required: [true, "A link is required!"],
            minlength: [1, "Link must be at least 1 characters long!"]
        }
    },
    { timestamps: true }
);
const Song = model("Song", SongSchema);
export default Song;