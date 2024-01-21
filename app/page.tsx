import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-gray-600 dark:bg-slate-800 ">
        <div className="p-10 flex flex-col bg-gray-600 dark:bg-slate-800 text-white">
          <h1 className="text-3xl sm:text-5xl font-bold ">
            Welcome to Dropbox.
            <br />
            <br />
            Storing everything for you and your buisness needs. All in one place
          </h1>
          <p className="pb-20">
            Enhance your personal storage with Dropbox, offering a simple and
            efficient way to upload, organize and access files from anywhere.
            Securely store inportant documents and media, and experience the
            convenience of easi file management and sharing in one centralized
            solution
          </p>
          <Link
            href="/dashboard"
            className="flex cursor-pointer bg-blue-500 p-5 w-fit"
          >
            Try it for free!
            <ArrowRight className="ml-10" />
          </Link>
        </div>
        <div className="bg-gray-600 dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/dropbox/dbx1-hero-1920x1080.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag
          </video>
        </div>
      </div>
      <div className="">
        <p className="text-center font-bold text-xl pt-5">Disclaimer</p>
        <p className="text-center font-light p-2">
          this website is made for informational and educational purposes only.
          I do not own or affiliate with Dropbox or/and any of its subsidiaries
          in any form. Copyright Disclamer under section 107 of the Copyright
          Act 1976, allowance is made for &quot;fair use&quot; of this website
          for showcasing skills of building nice websites
        </p>
      </div>
    </main>
  );
}
