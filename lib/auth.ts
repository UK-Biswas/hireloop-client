import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

import { isValidEmail, normalizeEmail } from "./email";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL as string);
const db = client.db("hireloopdb");

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,

    emailAndPassword: {
        enabled: true,
    },

    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    // Better Auth's built-in check lets a domain label end with a
                    // hyphen (e.g. "name@example-.com"), so enforce our stricter
                    // validator before anything is written to the database.
                    if (!isValidEmail(user.email)) {
                        throw new APIError("BAD_REQUEST", {
                            message: "Please enter a valid email address.",
                        });
                    }

                    return {
                        data: {
                            ...user,
                            email: normalizeEmail(user.email),
                        },
                    };
                },
            },
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "seeker",
                input: true,
                validator: {
                    input: {
                        "~standard": {
                            version: 1 as const,
                            vendor: "hireloop",
                            validate(value: unknown) {
                                if (
                                    value === "seeker" ||
                                    value === "recruiter" ||
                                    value === "admin"
                                ) {
                                    return { value };
                                }

                                return {
                                    issues: [
                                        {
                                            message:
                                                "Role must be seeker, recruiter, or admin.",
                                        },
                                    ],
                                };
                            },
                        },
                    },
                },
            },
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    database: mongodbAdapter(db, {
        client,
    }),
});