import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
const NotPermitted = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Typography variant="h1">403</Typography>
              <Typography variant="h6">
                Sorry, you are not authorized to access this page.
              </Typography>
              <Button variant="contained">Back Home</Button>
            </Grid>
            <Grid xs={6}>
              <img
                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                alt=""
                width={500}
                height={250}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default NotPermitted;