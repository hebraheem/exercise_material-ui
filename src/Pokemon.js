import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Paper,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import firstAlpha from "./functions";

const useStyle = makeStyles({
  cardStyle: {
    margin: "auto",
  },
  GridStyle: {
    justifyItems: "center",
    alignItems: "center",
  },
});

function Pokemon(props) {
  const [pokemon, setPokemon] = useState(undefined);
  const { history, match } = props;
  const { params } = match;
  const { pokemonId } = params;

  const fetchData = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
    );
    const data = await response.json();
    return setPokemon(data);
  };

  useEffect(() => {
    fetchData();
  }, [pokemonId]);
  const getPokemon = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const url = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <Grid container className={Classes.GridStyle}>
        <Grid item xs={12}>
          <Typography variant="h1">
            {`${id}. ${firstAlpha(name)}`} <img src={front_default} />
          </Typography>
          <Card component={Paper} className={Classes.cardStyle}>
            <CardMedia
              image={url}
              alt=""
              style={{ width: "300px", height: "300px" }}
            />
            <CardContent>
              <Typography variant="h3"> Pokemon info</Typography>
              <Typography variant="h6">
                species: <a href={species.url}>{species.name}</a>{" "}
              </Typography>
              <Typography variant="h6"> weight: {weight}</Typography>
              <Typography variant="h6"> height: {height}</Typography>
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

  const Classes = useStyle();

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && getPokemon()}
      {pokemon === false && (
        <Typography variant="h3">Pokemon not found</Typography>
      )}
    </>
  );
}
export default Pokemon;
