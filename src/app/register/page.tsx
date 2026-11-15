import { AuthForm } from "@/components/auth/auth-form";

export const metadata = {
  title: "Create an account",
};

export default function RegisterPage() {
  return (
    <main className="grid flex-1 place-items-center bg-[#f0f1e9] px-5 py-12 sm:py-16">
      <AuthForm mode="register" />
    </main>
  );
}
