import { Schema, model, Types } from 'mongoose';
import { dateFormat } from '../utils/dateFormat';
const reactionSchema = new Schema({
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
        get: function (value) {
            return dateFormat(value, { monthLength: 'short', dateSuffix: true });
        },
    },
}, {
    _id: false,
    toJSON: {
        getters: true,
    },
});
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function (value) {
            return dateFormat(value, { monthLength: 'short', dateSuffix: true });
        },
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: { virtuals: true, getters: true },
    id: false,
});
// Virtual to get reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
