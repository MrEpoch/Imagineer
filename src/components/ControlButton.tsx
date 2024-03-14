'use client';

export default function ControlButton() {
  // It should probaly save some preferences in localstorage

  return (
                <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-darkmode-800 rounded focus:ring-4 focus:ring-darkmode-300 dark:focus:ring-darkmode-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open menu</span>
                    <svg className="w-6 h-6 text-darkmode-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10"/>
</svg>

                  </button>
                </div>
              </div>
            </div>

  )
}
