import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/Logo.png";
import ControlButton from "@/components/ControlButton";
import UserButtonWithTheme from "./UserButtonWithTheme";

export default function Sidebar() {
  return (
    <main>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-darkmode-200 dark:bg-darkmode-800 dark:border-darkmode-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 w-full">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center justify-between w-full rtl:justify-end">
              <ControlButton />
              <Link href="/" className="flex ms-2 md:me-24">
                <Image
                  src={Logo}
                  alt="Logo"
                  width={50}
                  height={50}
                  className="mr-3"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Imagineer
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className="fixed flex flex-col justify-between top-0 left-0 z-40 w-64 flex min-h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-darkmode-200 sm:translate-x-0 dark:bg-darkmode-800 dark:border-darkmode-700"
        aria-label="Sidebar"
      >
        <div className="h-full  justify-between px-3 pb-4 overflow-y-auto bg-white dark:bg-darkmode-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-darkmode-900 rounded dark:text-white hover:bg-darkmode-100 dark:hover:bg-darkmode-700 group"
              >
                <svg
                  className="w-5 h-5 text-darkmode-500 transition duration-75 dark:text-darkmode-400 group-hover:text-darkmode-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="ms-3">Home</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-darkmode-900 rounded dark:text-white hover:bg-darkmode-100 dark:hover:bg-darkmode-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-darkmode-500 transition duration-75 dark:text-darkmode-400 group-hover:text-darkmode-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 11.5h13m-13 0V18a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-6.5m-13 0V9a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v2.5M9 5h11a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-1"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Image restore
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-darkmode-900 rounded dark:text-white hover:bg-darkmode-100 dark:hover:bg-darkmode-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-darkmode-500 transition duration-75 dark:text-darkmode-400 group-hover:text-darkmode-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm0 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5Zm12 0a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2Zm0-12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2Z" />
                  <path
                    fillRule="evenodd"
                    d="M10 6.5a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1ZM10 18a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Zm-4-4a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Zm12 0a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Generative fill
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-darkmode-900 rounded dark:text-white hover:bg-darkmode-100 dark:hover:bg-darkmode-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-darkmode-500 transition duration-75 dark:text-darkmode-400 group-hover:text-darkmode-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Object remove
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-darkmode-900 rounded dark:text-white hover:bg-darkmode-100 dark:hover:bg-darkmode-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-darkmode-500 transition duration-75 dark:text-darkmode-400 group-hover:text-darkmode-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Object recolor
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
    className="flex items-center p-2 text-darkmode-900 rounded dark:text-white hover:bg-gradient-to-r from-sky-300 to-blue-400 hover:text-white dark dark:hover:bg-darkmode-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-darkmode-500 transition duration-75 dark:text-darkmode-400 group-hover:text-darkmode-100 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Background remove
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className="h-full  justify-between px-3 pb-4 overflow-y-auto bg-white dark:bg-darkmode-800">
          <ul className="space-y-2 font-medium">
            <li>
              <UserButtonWithTheme buttonClass={"flex items-center justify-center p-2 text-darkmode-900 rounded dark:text-white hover:bg-darkmode-100 dark:hover:bg-darkmode-700 group"} />
                          </li>
          </ul>
        </div>
      </aside>
    </main>
  );
}
