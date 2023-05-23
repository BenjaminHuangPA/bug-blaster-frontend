import { Button, ButtonGroup, Typography, Stack, Card, TextField, Grid, CardContent, AlertTitle } from '@mui/material';
import { createTheme } from '@mui/system';
import {common, red } from "@mui/material/colors"
import { Link } from 'react-router-dom';

import React, { useState } from 'react';
import env from "react-dotenv";

const theme = createTheme({
  palette: {
    primary: {
      main: common["black"],
    },
    secondary: {
      main: red[900],
    }
  }
})
  
var n_servers = 0;
const MAX_SERVERS = 6;
  
var lobby_ids = {}


function createNewGame(){
  console.log("New game called");
  /*
  if(n_servers < MAX_SERVERS){
    let new_id = crypto.randomUUID().toString("hex").substring(0, 8);
    console.log("Generated lobby code " + new_id);
    lobby_ids[new_id] = {
      "status": SERVER_EMPTY,
    };
    n_servers += 1;
  } else {
    alert("All servers are currently in use. Please join an existing server or wait for one to become available.");
  }
  */

  /*
  fetch("http://localhost:3050/newgame", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({"hello": "world"})
  }).then((res) => res.json())
  .then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log("There was an error");
    alert("All available servers are currently full, please try again later.");
  });
  */
}
  
function getPods(){
  fetch("http://" + env.API_SERVER + "/getpods", {  
  //fetch("http://localhost:3050/getpods", {
    method: "GET",
    headers: { "Content-Type": "application/json"}
  }).then((res) => res.json())
  .then((res) => {
    console.log(res.data);
  }).catch((err) => {
    alert("There was a fuckup somewhere: " + err);
  })
}
  
  
  
  
function helloWorld(){
  
  console.log("Hello world!");
  console.log(lobby_ids);
  var input = document.getElementById("lobby-code-input").value;
  var player_name = document.getElementById("player-name-input").value;
  if(player_name.length > 15){
    alert("Error: Please enter a name less than 15 characters long");
    return;
  } else if (player_name.length == 0){
    alert("Name cannot be empty");
    return;
  }
  console.log("Inputted passcode " + input);
  fetch("http://" + env.API_SERVER + "/joinGame/validatePasscode", {
  //fetch("http://localhost:3050/joinGame/validatePasscode", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({
      passcode: input,
      player_name: player_name
    })
  }).then((res) => res.json())
  .then((res) => {
    console.log(res);
    if(res.status == "success"){
      console.log("Passcode accepted");
      let server_address = res.data.ip;
      window.location.replace(server_address);
    } else {
      alert(res.message);
    }
  }).catch((err) => {
    alert("There was an unspecified error.");
  })
  
}


const Home = () => {



  return(
    <div className="App">

      <Stack spacing={2} direction="column" justifycont="center" alignItems="center"> 
        <Typography variant="h1" gutterBottom>
          Bug Blaster
        </Typography>

        <img id="logo" src="logo (1).png" alt="">
        </img>
        <Card>
          <CardContent>
            <Grid>
              <Grid item xs={8}>
                <Typography variant="h6" gutterBottom>
                  Enter Lobby Code
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField variant="outlined" id="lobby-code-input">
                </TextField>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6" gutterBottom>
                  Enter Your Name
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField variant="outlined" id="player-name-input">
                </TextField>
              </Grid>
              <Grid item xs={8}>
                  <Button variant="outlined" onClick={helloWorld}>
                    Submit
                  </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Link to="/loading">
          <Button variant="outlined" key="host-game" color="secondary" onClick={createNewGame}>Host Game</Button>
        </Link>
        <Link to="/how-to-play">
          <Button variant="outlined" key="options">Options/How To Play</Button>
        </Link>
        <Link to="/about-game">
          <Button variant="outlined" key="about-game">About Game</Button>
        </Link>
        <Button variant="outlined" key="get-pods" onClick={getPods}>Get Pods</Button>
      </Stack>
    </div>
  );  
}

export default Home;