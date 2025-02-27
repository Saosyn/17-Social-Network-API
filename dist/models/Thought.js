import { Schema, model, Types } from 'mongoose';
import { dateFormat } from '../utils/dateFormat.js';
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
    },
}, {
    _id: false,
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
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
        transform: (_doc, ret) => {
            // Format the createdAt field for the thought
            if (ret.createdAt) {
                ret.createdAt = dateFormat(ret.createdAt, {
                    monthLength: 'short',
                    dateSuffix: true,
                });
            }
            // If reactions exist, format each reaction's createdAt
            if (ret.reactions && Array.isArray(ret.reactions)) {
                ret.reactions = ret.reactions.map((reaction) => {
                    if (reaction.createdAt) {
                        reaction.createdAt = dateFormat(reaction.createdAt, {
                            monthLength: 'short',
                            dateSuffix: true,
                        });
                    }
                    return reaction;
                });
            }
            return ret;
        },
    },
    id: false,
});
// Virtual to get reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
