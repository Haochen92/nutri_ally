"use server";
import { auth } from "@/app/auth";
import { prisma } from "prisma/prisma";

export default async function deleteAccount () {
    const session = await auth();
    if (!session?.user) return null;

    const user = session.user?.id
    await prisma.account.deleteMany({
        where: {userId: user}
    })

    await prisma.session.deleteMany({
        where: {userId: user}
    })

    await prisma.user.delete({
        where: {id: user}
    })

    console.log(`User ${user} and all related data has been deleted`);

};


