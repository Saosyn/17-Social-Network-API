import { Schema, model, Document, Types } from 'mongoose';
import { dateFormat } from '../utils/dateFormat';

export interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date; // underlying type remains Date
}

export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date; // underlying type remains Date
  username: string;
  reactions: IReaction[];
  reactionCount: number;
}

const reactionSchema = new Schema<IReaction>(
  {
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
  },
  {
    _id: false,
  }
);

const thoughtSchema = new Schema<IThought>(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
      transform: (doc, ret) => {
        // Format the createdAt field for the thought
        if (ret.createdAt) {
          ret.createdAt = dateFormat(ret.createdAt, {
            monthLength: 'short',
            dateSuffix: true,
          });
        }
        // If reactions exist, format each reaction's createdAt
        if (ret.reactions && Array.isArray(ret.reactions)) {
          ret.reactions = ret.reactions.map((reaction: any) => {
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
  }
);

// Virtual to get reaction count
thoughtSchema.virtual('reactionCount').get(function (this: IThought): number {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);
export default Thought;
