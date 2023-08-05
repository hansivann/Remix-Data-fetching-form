import {
  useLoaderData,
  Form,
  useNavigation,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { fetch, redirect } from "@remix-run/node";
import { getSource } from "../api/source";
import { getSession, commitSession } from "../sessions";

export const meta = () => {
  return [
    { title: "Sign Up Form" },
    { name: "Form Exercise", content: "Form Exercise" },
  ];
};

//server side
//loader
export async function loader() {
  return getSource();
}
//action
export async function action({ request }) {
  let formData = await request.formData();
  const value = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: formData.get("name"),
      body: formData.get("description"),
      username: formData.get("username"),
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(async (data) => {
      
      console.log(data.title, data.body, data.id, data.userId, data.username);

      // put session
      //session
      const title = data.title;
      const body = data.body;
      const id = data.id;
      const username = data.username;

      const session = await getSession(request.headers.get("Cookie"));

      session.set("title", title);
      session.set("body", body);
      session.set("id", id);
      session.set("username", username);

      return redirect("/profile", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    });
  return value;
}

//render
export default function Formm() {
  const data = useLoaderData();
  let navigation = useNavigation();
  let busy =
    navigation.state === "submitting"
      ? "Submitting.."
      : navigation.state === "idle"
      ? "Submit"
      : "";

  return (
    <div className="mt-56 sm:mx-auto sm:w-full sm:max-w-md ">
      <div className=" bg-gradient-to-b from-orange-200 to-orange-100 py-8 px-6 shadow rounded-lg sm:px-10">
        <Form method="post" className="mb-0 space-y-6">
          <b className="mb-16 mt-8 font-medium text-2xl">Sign Up Form</b> <br />
          <label className="block text-sm font-medium text-gray-700">
            Name <br />
            <div className="mt-1">
              <input
                name="name"
                type="text"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-300 focus-ring-1 focus:ring-orange-300 "
              />
            </div>
          </label>
          <p>
            <label className="block text-sm font-medium text-gray-700">
              Body <br />
              <input
                name="description"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-300 focus-ring-1 focus:ring-orange-300"
              />
            </label>
          </p>
          <p>
            <label className="block text-sm font-medium text-gray-700">
              Username <br />
              <select
                name="username"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-300 focus-ring-1 focus:ring-orange-300"
              >
                <option value="">Please select</option>
                {data.map((user) => {
                  return (
                    <option name="username" key={user.id}>
                      {user.username}
                    </option>
                  );
                })}
              </select>
            </label>
          </p>
          <p className="flex items-center">
            <input
              type="checkbox"
              name="human"
              value="true"
              required
              className="mr-1 rounded border-gray-300 focus:ring-orange-500"
            />
            <label className="ml-1 block text-sm text-gray-900">
              I am Human
            </label>
          </p>
          <p>
            <button
              type="submit"
              className="bg-orange-400 hover:bg-orange-500 text-white font-medium text-sm py-2 px-4 rounded focus:ring-4 "
            >
              {busy}
            </button>
          </p>
        </Form>
      </div>
    </div>
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
    <div className="m-8 text-2xl ">
      <h1 className="mb-4">Oops..</h1>
      <p className=" pb-11 ">Something went wrong..</p>
      <div className=" sm:mx-auto">
        <pre className=" flex-auto  mt-11 p-4 rounded shadow-lg border w-fit bg-rose-100 border-rose-600">
          {errorMessage}
        </pre>
      </div>
    </div>
  );
}
