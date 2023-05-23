import { Stack, Box, Paper, Typography, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const HowToPlay = () => {
    return (
        <Box>
            <Stack direction="column" justifycont="center" alignItems="center" spacing={3}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography>
                            Use the W, A, S, and D keys to move
                        </Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography>
                            Use the left mouse button to shoot
                        </Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography>
                            Scroll to change weapons
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>
        </Box>
    )
}

export default HowToPlay;