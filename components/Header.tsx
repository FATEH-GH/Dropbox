import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import ModeToggle from "./ThemeToggler";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex items-center justify-center gap-4">
        <div className="bg-blue-600 ">
          <Image
            className="invert p-1"
            src="/logo/DropBox.svg"
            alt=" DropBox logo"
            width={50}
            height={50}
          />
        </div>
        <h2 className="font-extrabold text-xl">Dropbox</h2>
      </Link>
      <div className="px-5 flex space-x-2 items-center">
        <ModeToggle />

        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
