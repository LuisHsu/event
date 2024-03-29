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