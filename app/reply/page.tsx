"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ReplyPage() {
    const [emailId, setEmailId] = useState("");
    const [prompt, setPrompt] = useState("");
    const [reply, setReply] = useState("");
    const [emails, setEmails] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        fetch("/api/emails/list")
            .then((res) => res.json())
            .then((data) => setEmails(data));
    }, []);

    const selectedEmail = emails.find(
        (email) => email.id === emailId
    );

    const generateReply = async () => {
        if (!emailId) {
            alert("Please select an email");
            return;
        }

        setLoading(true);

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

        setReply(data.reply || "");
        setPrompt("");
        setLoading(false);
    };

    const copyReply = () => {
        navigator.clipboard.writeText(reply);
        alert("Reply copied!");
    };

    const sendReply = async () => {
        if (!selectedEmail || !reply) {
            alert("Generate a reply first");
            return;
        }

        setSending(true);

        try {
            const recipient =
                selectedEmail.sender.match(
                    /<(.+?)>/
                )?.[1] || selectedEmail.sender;

            const res = await fetch(
                "/api/reply/send",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        to: recipient,
                        subject: `Re: ${selectedEmail.subject}`,
                        body: reply,
                    }),
                    // body: JSON.stringify({
                    //     to: selectedEmail.sender,
                    //     subject: `Re: ${selectedEmail.subject}`,
                    //     body: reply,
                    // }),
                }
            );

            const data = await res.json();

            if (data.success) {
                toast.success(
                    "Reply sent successfully"
                );

                setReply("");
                setPrompt("");
                setEmailId("");

                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }
            else {
                toast.error(
                    "Failed to send reply"
                );
            }
        } catch (error) {
            console.error(error);

            toast.error(
                "Failed to send reply"
            );
        }

        setSending(false);
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex gap-3 mb-6">

                <a
                    href="/dashboard"
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                    🏠 Dashboard
                </a>

            </div>

            <h1 className="text-4xl font-bold mb-6">
                💬 Reply Assistant
            </h1>

            <div className="bg-white border rounded-xl p-6 shadow-sm">

                <label className="font-medium block mb-2">
                    Select Email
                </label>

                <select
                    value={emailId}
                    onChange={(e) =>
                        setEmailId(e.target.value)
                    }
                    className="w-full border p-3 rounded-lg mb-4"
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

                {selectedEmail && (
                    <div className="bg-gray-50 border rounded-lg p-4 mb-4">

                        <h3 className="font-semibold text-lg">
                            {selectedEmail.subject}
                        </h3>

                        <p className="text-sm text-gray-600 mt-1">
                            {selectedEmail.sender}
                        </p>

                        <div className="mt-2">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                {selectedEmail.category}
                            </span>
                        </div>

                    </div>
                )}

                <h2 className="font-medium mb-3">
                    Quick Reply Actions
                </h2>

                <div className="flex flex-wrap gap-2 mb-4">

                    <button
                        onClick={() =>
                            setPrompt(
                                "acknowledge and thank them"
                            )
                        }
                        className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                        🙏 Thank Them
                    </button>

                    <button
                        onClick={() =>
                            setPrompt(
                                "ask for more information"
                            )
                        }
                        className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                        ❓ More Info
                    </button>

                    <button
                        onClick={() =>
                            setPrompt(
                                "confirm receipt of email"
                            )
                        }
                        className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                        ✅ Confirm
                    </button>

                </div>

                <textarea
                    placeholder="Reply instruction..."
                    value={prompt}
                    onChange={(e) =>
                        setPrompt(e.target.value)
                    }
                    rows={3}
                    className="w-full border p-3 rounded-lg"
                />

                <button
                    onClick={generateReply}
                    disabled={loading}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading
                        ? "Generating..."
                        : "Generate Reply"}
                </button>

            </div>

            {reply && (
                <div className="mt-6 bg-gray-50 border rounded-xl p-6">
                    <div className="flex gap-3 justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">
                            Generated Reply
                        </h2>
                        <div className="flex gap-2">

                            <button
                                onClick={copyReply}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                                Copy
                            </button>

                            <button
                                onClick={sendReply}
                                disabled={sending}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {sending
                                    ? "Sending..."
                                    : "Send Reply"}
                            </button>

                        </div>

                    </div>

                    <div className="bg-white border rounded-lg p-4">

                        <pre className="whitespace-pre-wrap">
                            {reply}
                        </pre>


                    </div>
                </div>
            )}

        </div>
    );
}