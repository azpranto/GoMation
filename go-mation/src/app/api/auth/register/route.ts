import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { sendMail } from "@/lib/sendMail";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" }, 
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" }, 
        { status: 400 }
      );
    }

    await connectDB();

    let user = await User.findOne({ email });
    
    if (user && user.isEmailVerified) {
      return NextResponse.json(
        { error: "User already exists" }, 
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    const hashedPassword = await bcrypt.hash(password, 10);

    if (user && !user.isEmailVerified) {
      user.name = name;
      user.password = hashedPassword;
      user.otp = otp;
      user.otpExpiresAt = otpExpiresAt;
    } else {
      user = new User({
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpiresAt,
      });
    }

    user.markModified('otp');
    user.markModified('otpExpiresAt');
    await user.save();
    
    await sendMail(user.email, "Verify your email", `<h2>Your OTP is <strong>${user.otp}</strong></h2>`);

    return NextResponse.json(user, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}