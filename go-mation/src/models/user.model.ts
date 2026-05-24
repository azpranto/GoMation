import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password?: string;
  role: "user" | "partner" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ["user", "partner", "admin"], default: "user" },
}, {
  timestamps: true
})

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;