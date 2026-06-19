"use client";

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const [stats, setStats] = useState<any>(null);

    useEffect
        (() => {
            fetch("/api/stats")
                .then((res) => res.json())
                .then((data) => setStats(data));
        }, []);

    const askQuestion = async () => {
        setLoading(true);

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question,
            }),
        });

        const data = await res.json();

        setResponse(data);
        setLoading(false);
    };


    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">
                    Gmail Intelligence Dashboard
                </h1>

                <div className="flex gap-3">

                    <a
                        href="/compose"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        ✉️ Compose
                    </a>

                    <a
                        href="/reply"
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                    >
                        💬 Reply
                    </a>
                    <button
                        onClick={() =>
                            signOut({
                                callbackUrl: "/",
                            })
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        🚪 Logout
                    </button>

                </div>
            </div>

            <div className="flex gap-3 mb-6">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask about your emails..."
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={askQuestion}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
                >
                    {loading ? "Loading..." : "Ask"}
                </button>
            </div>

            {loading && (
                <p className="mt-4">Loading...</p>
            )}


            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-6">
                    <div className="bg-white shadow rounded-xl p-4">
                        <p className="text-gray-500">📧 Total Emails</p>
                        <h2 className="text-3xl font-bold text-center">
                            {stats.totalEmails}
                        </h2>
                    </div>
                    <div className="bg-white shadow rounded-xl p-4">
                        <p className="text-gray-500">💰 Finance</p>
                        <h2 className="text-3xl font-bold text-center">
                            {stats.finance}
                        </h2>
                    </div>
                    <div className="bg-white shadow rounded-xl p-4">
                        <p className="text-gray-500">💼 Jobs</p>
                        <h2 className="text-3xl font-bold text-center">
                            {stats.jobs}
                        </h2>
                    </div>

                    <div className="bg-white shadow rounded-xl p-4">
                        <p className="text-gray-500">🔐 Notifications</p>
                        <h2 className="text-3xl font-bold text-center">
                            {stats.notifications}
                        </h2>
                    </div>

                    <div className="bg-white shadow rounded-xl p-4">
                        <p className="text-gray-500">🎁 Newsletters</p>
                        <h2 className="text-3xl font-bold text-center">
                            {stats.newsletters}
                        </h2>
                    </div>

                </div>
            )}

            {!response && (
                <div className="bg-white rounded-xl border p-10 text-center">
                    <h2 className="text-2xl font-semibold mb-2">
                        Ask About Your Emails
                    </h2>

                    <p className="text-gray-500">
                        Examples:
                        "show finance emails",
                        "show security emails",
                        "show promotion emails"
                    </p>
                </div>
            )}

            {response?.answer?.map((email: any, index: number) => (
                <div
                    key={index}
                    className="bg-white shadow-sm hover:shadow-md rounded-xl p-5 mb-4 border transition"
                >
                    <h3 className="text-xl font-semibold mb-3">
                        {email.subject}
                    </h3>

                    <div className="flex gap-2 mb-3">
                        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                            {email.category}
                        </span>
                    </div>

                    <p className="mb-2">
                        <span className="font-semibold">
                            Sender:
                        </span>{" "}
                        {email.sender}
                    </p>

                    <p className="font-semibold">
                        Summary
                    </p>

                    <p className="text-gray-700 mt-1 line-clamp-3">
                        {email.summary}
                    </p>
                </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pt-6">

                <a
                    href="/compose"
                    className="bg-green-50 border border-green-200 rounded-xl p-5 hover:shadow-md transition"
                >
                    <h3 className="text-lg font-semibold text-green-700">
                        ✉️ Compose Email
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                        Generate professional emails using AI or fallback templates.
                    </p>
                </a>

                <a
                    href="/reply"
                    className="bg-purple-50 border border-purple-200 rounded-xl p-5 hover:shadow-md transition"
                >
                    <h3 className="text-lg font-semibold text-purple-700">
                        💬 Reply Assistant
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                        Generate contextual replies for existing emails.
                    </p>
                </a>

            </div>


        </div>
    );
}