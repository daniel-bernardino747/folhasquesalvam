import { SignUp } from "@clerk/nextjs/app-beta";

export default function SignUpPage() {
  return (
    <main className="flex h-screen flex-col items-center">
      <SignUp
        redirectUrl="/sign-in"
        signInUrl="/sign-in"
        path="/sign-up"
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
