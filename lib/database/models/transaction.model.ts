import { Schema, model, models } from 'mongoose';

interface ITransaction extends Document {
    createdAt: Date;
    stripeId: string;
    amout: number;
    plan: string;
    credits: number;
    buyer: {
        _id: string;
        username: string;
    };
}

const TransactionSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    stripeId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    plan: { type: String },
    credits: { type: Number },
    buyer: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Transaction =
    models?.Transaction || model('Transaction', TransactionSchema);

export default Transaction;
