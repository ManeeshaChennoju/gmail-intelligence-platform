"use client";

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

    console.log("RESPONSE:----------------", response);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">
                    Gmail Intelligence Dashboard
                </h1>

                <a
                    href="/compose"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                    ✉️ Compose Email
                </a>
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">

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
                        <p className="text-gray-500">🔐 Security</p>
                        <h2 className="text-3xl font-bold text-center">
                            {stats.security}
                        </h2>
                    </div>

                    <div className="bg-white shadow rounded-xl p-4">
                        <p className="text-gray-500">🎁 Promotions</p>
                        <h2 className="text-3xl font-bold text-center">
                            {stats.promotions}
                        </h2>
                    </div>

                </div>
            )}

            {response?.answer?.map((email: any, index: number) => (
                <div
                    key={index}
                    className="bg-white shadow-md rounded-xl p-5 mb-4 border"
                >
                    <h3 className="text-xl font-semibold mb-2">
                        {email.subject}
                    </h3>

                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-3">
                        {email.category}
                    </span>

                    <p className="font-semibold">Summary</p>

                    <p className="text-gray-700">
                        {email.summary}
                    </p>
                </div>
            ))}


        </div>
    );
}