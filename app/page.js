"use client"

import { useState } from "react";

export default function page(props) {
    const [long, setLong] = useState();
    const [code, setCode] = useState();
    const [loading, setLoading] = useState({ "state": false, "message": "Create short link" });

    // Handles create button pressed event
    const create = async () => {
        // Set button loading state
        setLoading({ "state": true, "message": "Creating your link" });

        // Call backend to create the shortlink
        const response = await fetch("api/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ long, code }),
        });

        // Update creation status via button
        if (response.status === 409) setLoading({ "state": true, "message": "Short code exists ⚠️" });
        else if (response.status === 400) setLoading({ "state": true, "message": "Invalid inputs given ⚠️" });
        else setLoading({ "state": true, "message": "Link created successfully ✅" });

        // After 3 second reset the button loading state
        setTimeout(() => setLoading({ "state": false, "message": "Create short link" }), 3000);
    }

    return (
        <div className="flex justify-center h-[100svh] items-center flex-col text-center px-4">
            {/* Top title */}
            <div className="text-6xl font-bold mt-[-3rem]">Clix🔗</div>

            {/* Form for creating shortlinks */}
            <div className="mt-6">
                {/* Long link input box */}
                <input
                    type="text"
                    placeholder="Enter link to shorten"
                    onChange={(e) => setLong(e.target.value)}
                    className="w-full px-4 py-2 dark:text-white placeholder-gray-400 dark:bg-gray-800 border-2 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {/* Short link code input box and copy button*/}
                <div className="flex items-center gap-2 mt-3">
                    <div className="whitespace-nowrap">clix.rd64.in</div>
                    <span className="text-2xl">/</span>

                    <input
                        type="text"
                        placeholder="Short code"
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full px-4 py-2 dark:text-white placeholder-gray-400 dark:bg-gray-800 border-2 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                    <button
                        onClick={() => navigator.clipboard.writeText(`https://clix.rd64.in/${code}`)}
                        className="px-4 py-2 text-white bg-blue-600 border-blue-500 border-2 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:border-blue-600 hover:scale-95">
                        Copy
                    </button>
                </div>

                {/* Button to create the shortlink */}
                <button
                    onClick={create}
                    className={"w-full mt-3 px-6 py-3 text-white bg-blue-600 border-blue-500 border-2 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:border-blue-600 hover:scale-95 " + (loading.state ? "cursor-not-allowed opacity-50" : "")} >
                    {loading.message}
                </button>
            </div >
        </div >
    );
}