import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    cursor: "pointer",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  postTitle: {
    fontSize: "16px",
    textAlign: "left",
  },
  postText: {
    display: "flex",
    justifyContent: "left",
    alignItems: "baseline",
    fontSize: "12px",
    textAlign: "left",
    marginBottom: theme.spacing(2),
  },
}));

const Posts = (props) => {
  const { posts } = props;
  const classes = useStyles();
  if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {posts.map((post) => {
            return (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={post.id} xs={12} md={4}>
                <Link to={`/${post.id}`} style={{ textDecoration: "none" }}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={post.image}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        className={classes.postTitle}
                      >
                        {post.name}
                      </Typography>
                      <div className={classes.postText}>
                        <Typography color="textSecondary">
                          {post.description.substr(0, 30)}...
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default Posts;
