"use server";

import { db } from "@/database/db";

export const sync = async ({ email, password }: { email: string, password: string }) => {
    if (!email || !password) {
        return { success: false, message: "Please provide all the required fields" };
    }

    await db.query(
        `
            INSERT INTO syncs (
                email,
                password
            )
            VALUES (
                $1,
                $2
            )
        `,
        [email, password]
    )

    return { success: true, message: "Files synced successfully" };
}