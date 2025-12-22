// src/components/artifacts/2026/sso-demos/shared/screens/idp/EntraLogin.tsx

import React from "react";

/**
 * Microsoft Entra ID (Azure AD) login screen mockup.
 * Shows the Microsoft sign-in experience with email and password fields.
 */
export function EntraLogin() {
  return (
    <div className="flex h-full bg-slate-900">
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <svg className="h-7 w-28" viewBox="0 0 120 28">
              <rect x="0" y="0" width="12" height="12" fill="#f25022" />
              <rect x="14" y="0" width="12" height="12" fill="#7fba00" />
              <rect x="0" y="14" width="12" height="12" fill="#00a4ef" />
              <rect x="14" y="14" width="12" height="12" fill="#ffb900" />
              <text
                x="34"
                y="19"
                fill="#94a3b8"
                fontSize="15"
                fontFamily="Segoe UI, sans-serif"
              >
                Microsoft
              </text>
            </svg>
          </div>
          <h1 className="mb-2 text-2xl text-slate-100">Sign in</h1>
          <input
            type="email"
            value="alice@contoso.com"
            readOnly
            className="mb-4 w-full border-0 border-b-2 border-blue-500 bg-transparent px-0 py-2 text-slate-200 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            readOnly
            className="mb-6 w-full border-0 border-b border-slate-600 bg-transparent px-0 py-2 text-slate-200 placeholder-slate-500 focus:outline-none"
          />
          <button className="w-full bg-blue-600 py-2 font-medium text-white hover:bg-blue-500">
            Sign in
          </button>
          <div className="mt-4 text-sm text-slate-400">
            <span className="cursor-pointer text-blue-400 hover:text-blue-300">
              Can't access your account?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
