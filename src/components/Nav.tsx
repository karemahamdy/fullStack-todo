import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { ModeToggle } from "@/components/ModeToggle";

export function Nav() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
      <SignedIn>
        <ModeToggle />
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  )
}

