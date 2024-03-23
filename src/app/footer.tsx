import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/Logo.png";

export default function Footer() {
  return (
    <footer className="w-full z-0 border-t border-zinc-100 dark:border-border bg-white dark:bg-background">
      <div className="py-4 mx-auto max-w-screen-xl text-center">
        <a
          href="#"
          className="flex justify-center items-center text-2xl font-semibold text-darkmode-900 dark:text-white"
        >
          <Image
            src={Logo}
            alt="Logo"
            className="mr-3"
            width={50}
            height={50}
          />
          Imagineer
        </a>
        <p className="my-6 text-darkmode-500 dark:text-darkmode-400">
          AI-powered image generator with advanced features.
        </p>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-darkmode-900 dark:text-white">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              FAQs
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Contact
            </a>
          </li>
        </ul>
        <span className="text-sm text-darkmode-500 sm:text-center dark:text-darkmode-400">
          © 2024{" "}
          <Link href="/" className="hover:underline">
            Imagineer
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
