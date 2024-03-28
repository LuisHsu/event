import Guest from "./model/guest.js";

function GuestAPI(io, app){
    app.post("/login", (req, res) => {
        Guest.findOne({
            where: {id: req.body.id}
        })
        .then(entry => {
            if(entry !== null){
                const {id, name} = entry;
                res.end(JSON.stringify({
                    id,
                    name,
                }));
            }else{
                res.end(JSON.stringify(null))
            }
        })
    })
}

export default GuestAPI;