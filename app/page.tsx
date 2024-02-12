import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main
      className="flex h-full flex-col justify-center items-center bg-slate-400"
    >
      <div
        className="space-y-6 text-center"
      >
        <h1
          className="text-6xl font-bold text-white drop-shadow-md"
        >
          🔐Auth
        </h1>
        <p
          className="text-lg font-bold text-white"
        >
          simple authentication with nextjs
        </p>
      </div>
      <LoginButton>
        <Button
          variant="secondary"
          className="mt-6"
          size="lg"
        >
          Sign In
        </Button>
      </LoginButton>

    </main>
  )
}
