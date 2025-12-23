// src/components/artifacts/2026/sso-demos/shared/screens/idp/OktaLogin.tsx

import React from "react";

/**
 * Okta login screen mockup.
 * Shows the Okta authentication UI with username/password fields.
 */
export function OktaLogin() {
  return (
    <div className="flex h-full items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          {/* Okta logo placeholder */}
          <div className="mx-auto mb-4 flex h-10 w-24 items-center justify-center rounded bg-blue-600 font-bold text-white">
            okta
          </div>
          <h2 className="text-xl font-medium text-gray-900">
            Sign In
          </h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label htmlFor="okta-email" className="mb-1 block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="okta-email"
              type="text"
              value="alice@contoso.com"
              readOnly
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="okta-password" className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="okta-password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              readOnly
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label htmlFor="okta-remember" className="flex items-center gap-2 text-gray-600">
              <input id="okta-remember" type="checkbox" className="rounded border-gray-300" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Need help signing in?
            </a>
          </div>
          <button type="submit" className="w-full rounded-md bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
