import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles({
  root: {
    minWidth: 100,
  },
  divroot: {
    overflow: "hidden",
  },
  media: {
    height: 400,
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const NotLoggedHome = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const register = () => history.push("/register");
  const login = () => history.push("/login");
  return (
    <div className={classes.divroot}>
      <Grid container className={classes.gridformat} spacing={2}>
        <Grid item xs={12} sm={12}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                You are not signed in.Sign in or sign up for creating you own
                surveys and check current surveys you did so far.
              </Typography>
              <Typography variant="h5" component="h2">
                Feedback collection web application
              </Typography>
              <Typography variant="body2" component="p">
                Create surveys and get feedback by sending survey link to the
                people of interest.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="inherit" onClick={register}>
                Sign Up
              </Button>
              <Button size="small" color="inherit" onClick={login}>
                Login
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.grid}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="../../../Home.jpg"
                title="Home"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Create new survey
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  or check up your existing surveys
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="../../../NewSurvey.jpg"
                title="placeholder"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  New survey app
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  using modern design
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="../../../Survey.jpg"
                title="placeholder"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Mobile supported
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  both IOS and Android devices
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default NotLoggedHome;
