import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/models/user.model";

export async function POST(request: Request) {
    try {
        await connectDB();
        const { email, otp } = await request.json();
        
        if (!email || !otp) {
            return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
        }
        
        const user = await User.findOne({ email });
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        if (user.otp !== otp) {
            return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
        }
        
        if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
            return NextResponse.json({ error: "OTP expired" }, { status: 400 });
        } 
        
        user.isEmailVerified = true;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();
        
        return NextResponse.json({ message: "Email verified" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error: " + (error as Error).message }, { status: 500 });
    }
}