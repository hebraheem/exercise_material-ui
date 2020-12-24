import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Paper,
  makeStyles,
  CircularProgress,
  Button,
  Link,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import firstAlpha from "./functions";

const useStyle = makeStyles({
  cardStyle: {
    margin: "auto",
  },
  root: {
    margin: "50px 45%",
  },
  media: {
    width: "300px",
    height: "300px",
    margin: "auto",
    marginTop: "20px"
  }
});

function Pokemon(props) {
  const [pokemon, setPokemon] = useState(undefined);
  const { history, match } = props;
  const { params } = match;
  const { pokemonId } = params;

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then((response) => {
        const { data } = response;
        setPokemon(data);
      })
      .catch((err) => {
        console.log(err);
        setPokemon(false);
      });
  }, [pokemonId]);

  const getPokemon = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const url = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item xs={12} md={6}>
          <Typography variant="h1">
            {`${id}. ${firstAlpha(name)}`} <img src={front_default} alt="" />
          </Typography>
          <Card component={Paper} className={classes.cardStyle}>
            <CardMedia
              image={url}
              alt=""
              className={classes.media}
            //   style={{ width: "300px", height: "300px" }}
            />
            <CardContent>
              <Typography variant="h3"> Pokemon info</Typography>
              <Typography variant="h6">
                species: <a href={species.url}>{species.name}</a>
              </Typography>
              <Typography variant="h6"> weight: {weight}kg</Typography>
              <Typography variant="h6"> height: {height}m</Typography>
              <Typography variant="h6"> Types: </Typography>
              {types.map((typeInfo) => {
                const { type } = typeInfo;
                const { name } = type;
                return (
                  <Typography variant="h6" key={name}>
                    {name}
                  </Typography>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const classes = useStyle();

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && (
        <>
          {getPokemon()}
          <Link to="/">
            <Button
              variant="contained"
              color="primary"
              className={classes.root}
              onClick={() => history.push("/")}
            >
              Back home
            </Button>
          </Link>
        </>
      )}
      {pokemon === false && (
        <>
          <Typography variant="h3">Pokemon not found</Typography>
          <Link to="/">
            <Button onClick={() => history.push("/")} variant="outlined">
              Back home
            </Button>
          </Link>
        </>
      )}
    </>
  );
}
export default Pokemon;
