
// get data from json placeholder
export async function getSource(){
    const user_URL = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(user_URL);
    
    const source = await response.json()

    return source;   
}

