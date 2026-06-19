"use client";

import { useState } from "react";

export default function ComposePage() {
    const [prompt, setPrompt] = useState("");
    const [draft, setDraft] = useState("");
    const [source, setSource] = useState("");
    const [loading, setLoading] = useState(false);

    const generateEmail = async () => {
        if (!prompt) return;

        setLoading(true);

        const res = await fetch("/api/compose", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt,
            }),
        });

        const data = await res.json();

        if (data.success) {
            setDraft(data.draft || "");
            setSource(data.source || "gemini");
            setPrompt("");
        }

        setLoading(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(draft);
        alert("Email copied!");
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">

            <div className="flex justify-between items-center mb-4">

                <h1 className="text-3xl font-bold">
                    ✉️ AI Email Composer
                </h1>

                <a
                    href="/dashboard"
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                    🏠 Dashboard
                </a>

            </div>



            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LEFT CARD */}

                <div className="bg-white border rounded-xl p-6 shadow-sm flex flex-col">

                    <h2 className="text-xl font-semibold mb-5">
                        Quick Templates
                    </h2>

                    <div className="flex flex-wrap gap-3 mb-6">

                        <button
                            onClick={() =>
                                setPrompt(
                                    "Write a leave request email"
                                )
                            }
                            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            🏖 Leave
                        </button>

                        <button
                            onClick={() =>
                                setPrompt(
                                    "Write a follow up email"
                                )
                            }
                            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            📨 Follow Up
                        </button>

                        <button
                            onClick={() =>
                                setPrompt(
                                    "Write a meeting request email"
                                )
                            }
                            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            📅 Meeting
                        </button>

                        <button
                            onClick={() =>
                                setPrompt(
                                    "Write a professional business email"
                                )
                            }
                            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            💼 Business
                        </button>

                    </div>

                    <label className="font-medium mb-3">
                        Describe the email
                    </label>

                    <textarea
                        rows={10}
                        value={prompt}
                        onChange={(e) =>
                            setPrompt(e.target.value)
                        }
                        placeholder="Example: Write a follow-up email to the product team regarding the Q3 launch delay."
                        className="w-full border rounded-lg p-4 resize-none"
                    />

                    <button
                        onClick={generateEmail}
                        disabled={loading}
                        className="mt-5 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading
                            ? "Generating..."
                            : "Generate Email"}
                    </button>

                </div>

                {/* RIGHT CARD */}

                <div className="bg-white border rounded-xl p-6 shadow-sm flex flex-col">

                    <div className="flex items-start justify-between mb-5">

                        <div>

                            <h2 className="text-2xl font-semibold">
                                Generated Draft
                            </h2>

                            {draft && (
                                <span className="mt-2 inline-block text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                    {source === "fallback"
                                        ? "Fallback Template"
                                        : "Gemini AI"}
                                </span>
                            )}

                        </div>

                        {draft && (
                            <button
                                onClick={copyToClipboard}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                                Copy
                            </button>
                        )}

                    </div>

                    {!draft ? (
                        <div className="flex-1 min-h-[360px] border rounded-lg flex items-center justify-center text-gray-400 bg-gray-50">

                            Generate an email to preview it here

                        </div>
                    ) : (
                        <div className="flex-1 min-h-[360px] border rounded-lg p-5 bg-gray-50">

                            <pre className="whitespace-pre-wrap text-sm leading-7">
                                {draft}
                            </pre>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}