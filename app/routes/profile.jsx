import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { commitSession, getSession } from "../sessions";

export const meta = () => {
  return [
    { title: "Profile Page" },
    { name: "Form Exercise", content: "Form Exercise" },
  ];
};

export async function loader({ request }) {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    const title = session.get("title");
    const body = session.get("body");
    const id = session.get("id");
    const username = session.get("username");

    const data = { title, body, id, username };

    return json(data, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export default function Profile() {
  const data = useLoaderData();
  return (
    <>
      <div className="mt-56 sm:mx-auto sm:w-full sm:max-w-md">
        <div className=" bg-gradient-to-b from-orange-200 to-orange-100 py-8 px-6 shadow rounded-lg sm:px-10">
          <h1 className="mb-16 mt-8 font-medium text-5xl">Profile</h1>
          <div>
            <form>
              <p name="title" key={data.id}>
                Name: {data.title}
              </p>
              <p name="body">Body: {data.body} </p>
              <p name="username">Username: {data.username}</p>
              <div className="mt-4">
                <Link
                  className="border border-gray-400 bg-gray-200 text-black hover:bg-gray-400 font-medium text-sm py-2 px-4 rounded focus:ring-4"
                  to="/form"
                >
                  Back
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <head>
          <title>Page does not exist</title>
        </head>
        <body className=" m-11">
          <h1 className="  text-3xl ">Oops . . .</h1>
          <div className="ml-11 mt-11 p-4 rounded shadow-lg border bg-rose-100 border-rose-600">
            <p>Sorry, the page you are looking for does not exist</p>
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
    <>
      <div className=" md:flex-wrap flex flex-wrap mt-56 sm:mx-auto sm:w-full sm:max-w-md">
        <div className=" bg-gradient-to-b from-orange-200 to-orange-100 py-8 px-6 shadow rounded-lg sm:px-10">
          <h1 className="mb-16 mt-8 font-medium text-5xl">Profile</h1>
          <div>
            <p>Oops..</p>
            <p>Something went wrong..</p>
            <pre className=" mt-4 ml-4 text-rose-400 text-sm">
              {errorMessage}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
