"use server";
import { signIn} from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "prisma/prisma";

const handleAuth = async (providerId) => {
    await signIn(providerId, {redirectTo: "/gallery"});
}


const resendAuth = async(formData) => {
    const email = formData.get("email")
    if (!email) {
        throw new Error("Email is required for Resend authentication");
    }
    await signIn("resend", {email, redirectTo:"/gallery"})
}

const uploadForm = async(formData) => {
    console.log("formData: ", formData)
    const userId = formData.get("id")
    const username = formData.get("username")
    const gender = formData.get("gender")
    const birthday = formData.get("birthday") || "1992-02-15"
    const height = formData.get("height")
    const weight = formData.get("weight")

    try{
        await prisma.user.update({
            where: {id: userId},
            data: {
                name: username,
                gender: gender || "M",
                birthday: new Date(birthday),
                height: parseInt(height) || 0,
                weight: parseInt(weight) || 0,
            }
        })
        console.log("Form Submission Succeeded")
    } catch (error) {
        throw new Error(`form submission failed. Error: ${error}`)
    }
}


export {handleAuth, resendAuth, uploadForm};

