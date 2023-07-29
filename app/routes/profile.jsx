import {getProfile} from "../api/create"

export async function loader(){
   const loadProfile = getProfile()

   console.log(loadProfile)
    return loadProfile;
}

export default function Profile(){
//add loader data here

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