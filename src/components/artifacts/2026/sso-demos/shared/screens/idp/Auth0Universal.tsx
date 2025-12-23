// src/components/artifacts/2026/sso-demos/shared/screens/idp/Auth0Universal.tsx

import React from "react";

/**
 * Auth0 Universal Login screen mockup.
 * Shows the Auth0 Lock widget style authentication UI.
 */
export function Auth0Universal() {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-xl">
        {/* Header with logo */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white font-bold text-orange-500">
            a0
          </div>
          <h2 className="text-lg font-semibold text-white">
            Sign in to OTS
          </h2>
        </div>

        <div className="p-8">
          <div className="space-y-4">
            {/* Social logins */}
            <button className="flex w-full items-center justify-center gap-3 rounded border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <button className="flex w-full items-center justify-center gap-3 rounded border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            {/* Email/password */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label htmlFor="auth0-email" className="sr-only">
                  Email
                </label>
                <input
                  id="auth0-email"
                  type="email"
                  value="alice@contoso.com"
                  readOnly
                  className="w-full rounded border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label htmlFor="auth0-password" className="sr-only">
                  Password
                </label>
                <input
                  id="auth0-password"
                  type="password"
                  placeholder="Password"
                  readOnly
                  className="w-full rounded border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <button type="submit" className="w-full rounded bg-orange-500 py-2.5 font-medium text-white hover:bg-orange-600">
                Continue
              </button>
            </form>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="#" className="text-orange-500 hover:text-orange-600">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
