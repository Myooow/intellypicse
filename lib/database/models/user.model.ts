import { Model, models, model } from 'mongoose';
import { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    role: 'admin' | 'user';
    photo: string;
    planId: number;
    creditBalance: number;
}

interface Methods {
    comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser, {}, Methods>({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    photo: { type: String, required: true },
    planId: { type: Number, default: 1 },
    creditBalance: { type: Number, default: 10 },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        throw error;
    }
});

UserSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

const User = models.User || model('User', UserSchema);

export default User as Model<IUser, {}, Methods>;
