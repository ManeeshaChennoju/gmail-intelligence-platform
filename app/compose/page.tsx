"use client";

import { useState } from "react";

export default function ComposePage() {
    const [prompt, setPrompt] = useState("");
    const [draft, setDraft] = useState("");
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

        setDraft(data.draft || "");
        setLoading(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(draft);
        alert("Email copied!");
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-6">
                ✉️ AI Email Composer
            </h1>

            <div className="bg-white border rounded-xl p-6 shadow-sm">
                <label className="font-medium block mb-2">
                    Describe the email
                </label>

                <textarea
                    rows={5}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Example: Write a follow-up email to the product team regarding the Q3 launch delay."
                    className="w-full border rounded-lg p-3"
                />

                <button
                    onClick={generateEmail}
                    disabled={loading}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    {loading
                        ? "Generating..."
                        : "Generate Email"}
                </button>
            </div>

            {draft && (
                <div className="mt-8 bg-gray-50 border rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">
                            Generated Draft
                        </h2>

                        <button
                            onClick={copyToClipboard}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                            Copy
                        </button>
                    </div>

                    <pre className="whitespace-pre-wrap">
                        {draft}
                    </pre>
                </div>
            )}
        </div>
    );
}