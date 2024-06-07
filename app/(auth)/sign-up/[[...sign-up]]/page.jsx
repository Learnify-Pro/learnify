import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <main className="flex h-full w-full p-4 pb-0 items-center content-center justify-center">
            <div>
                <SignUp />
            </div>
        </main>
    )
}