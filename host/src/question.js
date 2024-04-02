import { host_token, http_server } from "./constants.mjs";

export function get_questions(){
    return fetch(`${http_server}/questions`, {
        method: "GET",
        headers: {
            "Authorization": `Basic ${host_token}`
        },
        mode: "cors"
    })
    .then(res => res.json())
}

export function add_question(data){
    return fetch(`${http_server}/question`, {
        method: "PUT",
        headers: {
            "Authorization": `Basic ${host_token}`,
            "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify(data)
    })
}

export function delete_question(id){
    return fetch(`${http_server}/question`, {
        method: "DELETE",
        headers: {
            "Authorization": `Basic ${host_token}`,
            "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify({id})
    })
}