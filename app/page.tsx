import { ArrowRight } from "lucide-react";

import { motion } from "framer-motion";
import {
  MotionDiv,
  MotionH1,
  MotionLink,
  MotionP,
} from "@/components/FramerMotion";

const container = {
  hidden: { y: 10, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function Home() {
  return (
    <main>
      <div className="flex flex-col lg:flex-row items-center bg-gray-600 dark:bg-slate-800 ">
        <MotionDiv
          variants={container}
          initial="hidden"
          animate="show"
          className="p-10 flex flex-col bg-gray-600 dark:bg-slate-800 text-white"
        >
          <MotionH1 variants={item} className="text-3xl sm:text-5xl font-bold">
            Welcome to Dropbox.
            <br />
            <br />
            Storing everything for you and your buisness needs. All in one place
          </MotionH1>
          <MotionP variants={item} className="py-10">
            Enhance your personal storage with Dropbox, offering a simple and
            efficient way to upload, organize and access files from anywhere.
            Securely store inportant documents and media, and experience the
            convenience of easi file management and sharing in one centralized
            solution
          </MotionP>
          <MotionLink
            variants={item}
            href="/dashboard"
            className="flex cursor-pointer font-bold bg-blue-500 p-5 w-fit group border rounded-xl"
          >
            Try it for free!
            <ArrowRight className="ml-10 group-hover:translate-x-2 duration-200" />
          </MotionLink>
        </MotionDiv>
        <MotionDiv
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-gray-600 dark:bg-slate-800 h-full p-10"
        >
          <video autoPlay loop muted className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/dropbox/dbx1-hero-1920x1080.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag
          </video>
        </MotionDiv>
      </div>
      <MotionDiv
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, ease: "easeOut" }}
      >
        <p className="text-center font-bold text-xl pt-5">Disclaimer</p>
        <p className="text-center font-light p-2">
          this website is made for informational and educational purposes only.
          I do not own or affiliate with Dropbox or/and any of its subsidiaries
          in any form. Copyright Disclamer under section 107 of the Copyright
          Act 1976, allowance is made for &quot;fair use&quot; of this website
          for showcasing skills of building nice websites
        </p>
      </MotionDiv>
    </main>
  );
}
