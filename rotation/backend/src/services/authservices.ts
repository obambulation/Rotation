import bcrypt from "bcrypt";
import AppError from "../utils/apperror";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";


type authInput = {
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
}

export async function signup(data: authInput) {

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: data.email },
                    { username: data.username },
                    { phoneNumber: data.phoneNumber }
                ]
            }
        });

        if (user){
            throw new AppError("User with this email, username, or phonenumer already exists", 400);
        }
        else {
            const hashedPassword = await bcrypt.hash(data.password, 12);

            const newUser = await prisma.user.create({
                data: {
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    username: data.username,
                    password: hashedPassword
                }
            })
            return newUser;
        }
    }

export async function login(data: authInput) {

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: data.email },
                { username: data.username },
                { phoneNumber: data.phoneNumber }
            ]
            
        }
    }
    )
    if(!user){
        throw new AppError("User not found", 404);
    }
    const comparePass = await bcrypt.compare(data.password, user.password);

    if(comparePass){
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                lastLogin: new Date()
            }
        })
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {expiresIn: "7d"});   
        return { User: updatedUser, token };
    }
    else {
        throw new AppError("Incorrect password", 401);
    }

}