import { Schema, Types } from 'mongoose';
import { dateFormat } from '../utils/dateFormat.js';

export interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date; // Underlying type remains Date
}

const ReactionSchema = new Schema<IReaction>(
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
      // Use a getter to format the timestamp.
      // Casting the getter as unknown then as the expected type bypasses TS's type error.
      get: function (value: any): string {
        return dateFormat(value, { monthLength: 'short', dateSuffix: true });
      } as unknown as (value: any) => any,
    },
  },
  {
    _id: false, // This schema is a subdocument so no separate _id is created.
    toJSON: {
      getters: true,
    },
  }
);

export default ReactionSchema;
