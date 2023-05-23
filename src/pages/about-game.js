import { Stack, Card, CardContent, Typography } from "@mui/material"

const AboutGame = () => {
    return (
        <Stack spacing={3}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3">
                        Bug Blaster was built by Benjamin Huang for his CS 35100 project.
                    </Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant="body">
                        It is hosted in the Google Cloud.
                        It runs in Docker containers and uses the Google Kubernetes Engine for orchestration.
                    </Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant="body">
                        The frontend was built using React.js. The game uses an API server (running as a separate deployment)
                        running Express.js.
                    </Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant="body">
                        The game servers use Phaser.js as the game engine. Multiplayer functionality is 
                        achieved using Socket.io.
                    </Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant="body">
                        All artwork was done by me using Aseprite.
                    </Typography>
                </CardContent>
            </Card>
        </Stack>
    )
}

export default AboutGame