"use client"
import { form } from "motion/react-client";
import Link from "next/link";
import { nerkoOne } from '../fonts/NerkoOne';

import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export default function RegisterPage() {

    async function HandleSubmit(e) {
        e.preventDefault();

        const email = e.target.email.value;
        const username = e.target.username.value;
        const password = e.target.password.value;

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username: username
                }
            }
        })

        if (error) {
            console.error('[AUTH] Signup error:', error);
            alert("Error adding user")
            return;
        }

        window.location.replace('/')
        return data.user;
    }

    return (<div className={`flex flex-col justify-center items-center min-h-[85vh] ${nerkoOne.className} select-none`}>

        <h1 className="text-6xl mb-6 tracking-wide drop-shadow-md">Join ItsDone✔️</h1>

        {/* The Form: Thick borders, cream background, and a hard black shadow */}
        <form
            onSubmit={HandleSubmit}
            className="flex flex-col w-[400px] max-w-[90vw] p-8 text-3xl gap-5 border-black rounded-3xl border-4 bg-[#fffdce] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
            <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                className="p-3 rounded-xl border-4 border-black focus:outline-none focus:bg-[#D0FFCE] transition-colors placeholder:text-gray-400"
                required
            />

            <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                className="p-3 rounded-xl border-4 border-black focus:outline-none focus:bg-[#D0FFCE] transition-colors placeholder:text-gray-400"
                required
            />

            <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="p-3 rounded-xl border-4 border-black focus:outline-none focus:bg-[#D0FFCE] transition-colors placeholder:text-gray-400"
                required
            />

            {/* The Button: Matches your header gray, with a click animation */}
            <button
                type="submit"
                className="mt-2 p-3 bg-[#9D9695] text-white rounded-xl border-4 border-black hover:bg-gray-600 transition-all active:translate-y-1 active:translate-x-1 active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
                Sign Up
            </button>

            {/* Styled Link matching your underline aesthetic */}
            <p className="text-2xl text-center mt-2">
                Already have an account?{" "}
                <Link href="/" className="underline decoration-[#D0FFCE] decoration-4 underline-offset-4 hover:text-gray-500">
                    Log In
                </Link>
            </p>
        </form>
    </div>
    )
}