import { SignIn } from "@clerk/nextjs/app-beta";

export default function SignInPage() {
  return (
    <main className="flex h-screen flex-col items-center">
      <SignIn
        redirectUrl="/dashboard"
        signUpUrl="/sign-up"
        path="/sign-in"
        appearance={{
          layout: {
            socialButtonsPlacement: "bottom",
            socialButtonsVariant: "iconButton",
          },
          elements: {
            rootBox: "shadow-none",
            card: "bg-[#72AA63] shadow-none",
            headerTitle: "text-white text-3xl",
            headerSubtitle: "text-white text-lg",
            formFieldLabel: "text-white",
            formButtonPrimary: "bg-[#305230]",
            socialButtons: "bg-white rounded-md",
            footerActionText: "text-white text-lg font-[500]",
            footerActionLink: "text-[#305230] text-lg font-[500]",
            logoImage: "brightness-0 invert",
          },
        }}
      />
    </main>
  );
}
