//import { useLoaderData } from "@remix-run/react"

// export async function loader(){

//}


export default function Profile(){
//const data = useLoaderData()

    return (
        <>
            <h1>Profile Page Values</h1>
            <div>
            {/* {data.map((user) => {
                return (
                    <>
                    <p key={user.id}>Name = {user.title} , {user.body}</p>
                    </>
                )
            })} */}
                <p>Name = </p>
                 <p>Body = </p>
                <p>username = </p>
            </div>
        </>
    )
}