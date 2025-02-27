import { Schema, Types } from 'mongoose';
import { dateFormat } from '../utils/dateFormat.js';
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Use a getter to format the timestamp.
        // Casting the getter as unknown then as the expected type bypasses TS's type error.
        get: function (value) {
            return dateFormat(value, { monthLength: 'short', dateSuffix: true });
        },
    },
}, {
    _id: false, // This schema is a subdocument so no separate _id is created.
    toJSON: {
        getters: true,
    },
});
export default ReactionSchema;
