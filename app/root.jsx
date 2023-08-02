import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
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

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <head>
        <title>Oh no</title>
          <Meta />
        </head>
          <Links />
        <body className=" m-11">
            <h1 className="  text-3xl ">Oops . . .</h1>
          <div className="ml-11 mt-11 p-4 rounded shadow-lg border bg-rose-100 border-rose-600">
            <p>Sorry something went wrong!</p>
            <p>Status: {error.status} </p>
            <p>{error.data.message}</p>
          </div>
          </body>
      </>
    );
  }

  let errorMessage = "Unknown error";
  if (error) {
    errorMessage = error.message;
  }

  return (
    <div className="m-8 text-2xl ">
      <h1 className="mb-4">Oops..</h1>
      <p className=" pb-11 ">Something went wrong..</p>
      <div className=" mt-4 sm:mx-auto sm:w-full sm:max-w-md ">
        <pre className=" mt-4 ml-4 text-rose-400 text-sm">{errorMessage}</pre>
      </div>
    </div>
  );
}
