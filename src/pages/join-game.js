import { useEffect, useState, useRef } from "react";
import env from "react-dotenv";
import { Button, Typography, Stack, TextField } from '@mui/material';
import { useLocation, Link } from "react-router-dom";


const JoinGame = () => {
    //let { passcode } = useParams();
    console.log("RENDERING!!!!!!")
    let loc = useLocation();

    let passcode = loc.state.lobbyID;
    console.log(loc);
    const count = useRef(0);
    const [foundServer, setFoundServer] = useState(false);
    const [serverName, setServerName] = useState("");
    const [serverAddress, setServerAddress] = useState("");
    //console.log("Hello!!!!!!!!");

    
    
    useEffect(() => {
        
        if(count.current === 1){
            fetch("http://" + env.API_SERVER + "/joinGame/validatePasscode", {
            //fetch("http://localhost:3050/joinGame/validatePasscode", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                passcode: passcode
                })
            }).then((res) => res.json())
            .then((res) => {
                console.log(res);
                if(res.status == "success"){
                    console.log("Passcode accepted");
                    let server_address = res.data.ip;
                    console.log("Server address: " + server_address);
                    setFoundServer(true);
                    setServerName(res.data.name);
                    //window.location.replace(server_address);
                }
            }).catch((err) => {
                alert("There was an unspecified error.");
            })
            
        }
        count.current = count.current + 1;
        
    }, [])
    
    

    

    async function clickJoinCallback(){
        console.log(env.API_SERVER);
        
        var input = document.getElementById("player-name-input").value;
        
        if(input.length > 15){
            alert("Error: Please enter a name less than 15 characters long");
        } else if (input.length == 0){
            alert("Name cannot be empty");
        } else {
            if(foundServer){
                await fetch("http://" + env.API_SERVER + "/name/putname", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        server_passcode: passcode,
                        player_name: input
                    })
                });
                console.log("SERVER ADDRESS: " + serverAddress);
                //window.history.replaceState({}, document.title)

                window.location.replace(serverAddress);
                
            }   
        }
    }
    

    return (
        
        <div>
            
            {foundServer &&
                <Stack spacing={2} direction="column" justifycont="center" alignItems="center">
                    <Typography variant="h3">
                        {`You're on your way to: ${serverName}` }
                    </Typography>
                    <Typography variant="h6">
                        Please enter a name to use:
                    </Typography>
                    <TextField required variant="standard" id="player-name-input">
                    </TextField>
                    <div>
                        <Button onClick={clickJoinCallback}>
                            Join
                        </Button>
                        <Link to="/">
                            <Button>
                                Quit
                            </Button>
                        </Link>
                    </div>
                </Stack>
            }
            {!foundServer && 
                <Stack>
                    <Typography variant="h3">
                        No server with that passcode found!
                    </Typography>
                    <Link to="/">
                        <Button>
                            Back to the lobby
                        </Button>
                    </Link>
                </Stack>
            }
        </div>
        
    )
}

export default JoinGame;