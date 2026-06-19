"use client";

import { signIn } from "next-auth/react";

export default function HomePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">

            <div className="bg-white p-10 rounded-2xl shadow-lg text-center">

                <h1 className="text-4xl font-bold mb-4">
                    Gmail Intelligence Platform
                </h1>

                <p className="text-gray-600 mb-8">
                    AI-powered Gmail assistant with
                    summarization, categorization,
                    compose, reply and chat features.
                </p>

                <button
                    onClick={() =>
                        signIn("google", {
                            callbackUrl: "/dashboard",
                        })
                    }
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    Sign in with Google
                </button>

            </div>

        </div>
    );
}