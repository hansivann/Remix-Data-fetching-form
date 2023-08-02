//import { cssBundleHref } from "@remix-run/css-bundle";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./tailwind.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
      </head>
      <body>
        <div className="mb-3">
          <div className="p-4 rounded shadow-lg border bg-rose-200">
            <div className="text-gray-600 font-bold text-xl mb-2">
              <p>Oops.. Something went wrong..</p>
            </div>
            <p>
              {error.message}
              {error.stack}
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}