"use client";

import { useEffect, useState } from "react";

export default function ReplyPage() {
    const [emailId, setEmailId] = useState("");
    const [prompt, setPrompt] = useState("");
    const [reply, setReply] = useState("");
    const [emails, setEmails] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/emails/list")
            .then((res) => res.json())
            .then((data) => setEmails(data));
    }, []);

    const generateReply = async () => {
        const res = await fetch("/api/reply", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailId,
                prompt,
            }),
        });

        const data = await res.json();
        setReply(data.reply);
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-6">
                Reply To Email
            </h1>

            <select
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full border p-3 rounded mb-4"
            >
                <option value="">
                    Select an Email
                </option>

                {emails.map((email) => (
                    <option
                        key={email.id}
                        value={email.id}
                    >
                        {email.subject} - {email.sender}
                    </option>
                ))}
            </select>

            <textarea
                placeholder="Reply instruction"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                className="w-full border p-3 rounded"
            />

            <button
                onClick={generateReply}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
            >
                Generate Reply
            </button>

            {reply && (
                <div className="mt-6 border rounded p-4">
                    <h2 className="font-bold mb-2">
                        Generated Reply
                    </h2>

                    <pre className="whitespace-pre-wrap">
                        {reply}
                    </pre>
                </div>
            )}
        </div>
    );
}