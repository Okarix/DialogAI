import mongoose, { Document, Schema } from 'mongoose';

export interface IChat extends Document {
	userPrompt: string;
	response: string;
	createdAt: Date;
}

const chatSchema = new Schema<IChat>({
	userPrompt: { type: String, required: true },
	response: { type: String, required: true },
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Chat = mongoose.model<IChat>('Chat', chatSchema);

export default Chat;
