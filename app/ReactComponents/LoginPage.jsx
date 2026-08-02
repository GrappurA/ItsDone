"use client"

import Link from "next/link";
import { nerkoOne } from '../fonts/NerkoOne';

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const isColor = email.length > 0 && password.length > 0;

    async function HandleLogin(e) {
        e.preventDefault()

        const result = await signIn("credentials", {
            email: email,
            password: password,
            redirect: true,
            callbackUrl: "/home"
        });

        if (result?.error) {
            alert("Invalid email or password");
            return;
        }

    }


    return (
        <div className={`flex flex-col justify-center items-center min-h-[85vh] ${nerkoOne.className} select-none`}>
            <h1 className="text-6xl mb-6 tracking-wide drop-shadow-md">Welcome Back!</h1>
            {/* The Form: Thick borders, cream background, and the hard black shadow */}
            <form
                onSubmit={HandleLogin}
                className="flex flex-col w-[400px] max-w-[90vw] p-8 text-3xl gap-5 border-black rounded-3xl border-4 bg-[#fffdce] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
                <input
                    onChange={(e) => { setEmail(e.target.value) }}

                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                    required
                    className="p-3 rounded-xl border-4 border-black focus:outline-none focus:bg-[#D0FFCE] transition-colors placeholder:text-gray-400"
                />

                <input
                    onChange={(e) => { setPassword(e.target.value) }}

                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    required
                    className="p-3 rounded-xl border-4 border-black focus:outline-none focus:bg-[#D0FFCE] transition-colors placeholder:text-gray-400"
                />

                {/* The Button: Matches your header gray, with the push-down click animation */}
                <button
                    type="submit"
                    className={`mt-2 p-3 ${isColor ? 'bg-[#d0ffce] text-black' : 'bg-[#9D9695] text-white'} rounded-xl border-4 border-black hover:bg-gray-600 transition-all active:translate-y-1 active:translate-x-1 active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
                >
                    Log In
                </button>

                {/* Styled Link matching your underline aesthetic */}
                <p className="text-2xl text-center mt-2">
                    Don't have an account?{" "}
                    <Link href="/register" className="underline decoration-[#D0FFCE] decoration-4 underline-offset-4 hover:text-gray-500">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    )
}
