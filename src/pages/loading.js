import { useEffect, useState, useRef } from "react";
import env from "react-dotenv";
import { Button, ButtonGroup, Typography, Stack, Card, TextField, Grid, CardContent, AlertTitle } from '@mui/material';



const Loading = () => {

    const count = useRef(0);
    const [foundServer, setFoundServer] = useState(false);
    const [serverName, setServerName] = useState("");
    const [serverAddress, setServerAddress] = useState("");
    const [serverPasscode, setServerPasscode] = useState("");
    const [playerName, setPlayerName] = useState("Bilbo Baggins");

    function getNewElement(props){
        return(
            <h1>New element!</h1>
        );
    }

    useEffect(() => {
        console.log(count.current);
        if(count.current === 1){
            console.log("Trying to start a new game...");
            fetch("http://" + env.API_SERVER + "/hostGame", {            
            //fetch("http://localhost:3050/hostGame", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then((res) => res.json())
            .then((res) => {
                if(res.status === "success"){
                    console.log("Successfully found a server!");
                    console.log(res);
                    let server_name = res.data.server_name;
                    let port_number = res.data.port;
                    let passcode = res.data.server_passcode;
                    if("hostname" in res.data && res.data.hostname !== undefined){
                        //if there is a hostname availabe, use it
                        let hostname = res.data.hostname;
                        setFoundServer(true);
                        setServerName(server_name);
                        setServerAddress("http://" + hostname + ":" + port_number);
                        setServerPasscode(passcode);
                    } else {
                        //otherwise use the IP
                        setFoundServer(true);
                        setServerName(server_name);
                        setServerAddress("http://" + res.data.ip + ":" + port_number);
                        setServerPasscode(passcode);
                    }
                } else {
                    alert("No servers available!");
                };
                
            }).catch((err) => {

            });

        }
        count.current = count.current + 1;      
    }, [serverName]);

    function clickQuitCallback(){
        let confirmation = window.confirm("Are you sure? You may not be able to rejoin this game.");
        if(confirmation && serverAddress != ""){
            console.log(env.API_SERVER);
            fetch("http://" + env.API_SERVER + "/frontendIP", {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            }).then((res) => res.json())
            .then((res) => {
                console.log(res);
                if(res.status == "success"){
                    window.location.replace("http://" + res.data.host + ":" + res.data.port);
                }
            })
        }
    }

    async function clickJoinCallback(){

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
                        server_passcode: serverPasscode,
                        player_name: input
                    })
                });
                window.location.replace(serverAddress);
            }   
        }

    }


    return (

        <Stack spacing={2} direction="column" justifycont="center" alignItems="center">
            <Card>
                <CardContent>
                    <Typography variant="h3">
                        Looking for a server...
                    </Typography>
                    <Typography variant="h5">
                        Please be patient
                    </Typography>
                </CardContent>
            </Card>
            {foundServer && 
                <Card>
                    <CardContent>
                        <Typography variant="h5">
                            Found a server!
                        </Typography>
                        <Typography variant="h5">
                            {"Passcode: " + serverPasscode}
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
                            <Button onClick={clickQuitCallback}>
                                Quit
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            
            }
        </Stack>
        /*
        <div>
            <h1>Looking for a server...</h1>
            <h2>Please be patient</h2>
            {foundServer && 
                
                <div>
                    <div>
                        <h3>{"Found server: " + serverName}</h3>
                        <h3>{"Passcode: " + serverPasscode}</h3>
                    </div>
                    <button onClick={clickJoinCallback}>Join</button>
                    <button onClick={clickQuitCallback}>Quit</button>
                </div>
            }
        </div>
        */
    )
}

export default Loading;