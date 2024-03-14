import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/Logo.png";

export default function Footer() {
  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-darkmode-900">
      {/* divider */}
      <hr className="my-6 sm:mx-16 border-darkmode-200 dark:border-darkmode-700" />
      <div className="mx-auto max-w-screen-xl text-center">
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
