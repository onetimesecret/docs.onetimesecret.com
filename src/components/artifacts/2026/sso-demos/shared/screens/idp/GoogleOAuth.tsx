// src/components/artifacts/2026/sso-demos/shared/screens/idp/GoogleOAuth.tsx

/**
 * Google OAuth consent screen mockup.
 * Shows the Google account picker and permission grant UI.
 */
export function GoogleOAuth() {
  return (
    <div className="flex h-full items-center justify-center bg-white p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        {/* Google logo */}
        <div className="mb-6 flex justify-center">
          <svg className="h-6 w-24" viewBox="0 0 272 92">
            <path
              fill="#4285F4"
              d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
            />
            <path
              fill="#EA4335"
              d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
            />
            <path
              fill="#FBBC05"
              d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
            />
            <path fill="#4285F4" d="M225 3v65h-9.5V3h9.5z" />
            <path
              fill="#34A853"
              d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
            />
            <path
              fill="#EA4335"
              d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"
            />
          </svg>
        </div>

        <div className="text-center">
          <h1 className="mb-2 text-xl text-gray-800">Choose an account</h1>
          <p className="mb-6 text-sm text-gray-600">
            to continue to <span className="font-medium">OTS</span>
          </p>
        </div>

        {/* Account option */}
        <div className="space-y-2">
          <button className="flex w-full items-center gap-4 rounded-lg border border-gray-200 p-4 text-left hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-lg font-medium text-white">
              A
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Alice Smith</div>
              <div className="text-sm text-gray-500">alice@contoso.com</div>
            </div>
          </button>

          <button className="flex w-full items-center gap-4 rounded-lg border border-gray-200 p-4 text-left hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
              <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="font-medium text-gray-700">Use another account</div>
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>
            To continue, Google will share your name, email address, and
            profile picture with OTS.
          </p>
        </div>
      </div>
    </div>
  );
}
