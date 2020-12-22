import { Card,CardContent,CardMedia, Grid, Typography,Paper, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import pokemons from "./mockData";
import firstAlpha from "./functions";

const useStyle = makeStyles({
  cardStyle: {
    margin: "auto",
  },
  GridStyle: {
      justifyItems: 'center',
      alignItems: "center"
  }
});

function Pokemon(props) {
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;

  const [pokemon, setPokemon] = useState(pokemons[`${pokemonId}`]);
  console.log(pokemon);
  const { name, id, species, height, weight, types, sprites } = pokemon;
  const url = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
  const { front_default } = sprites;

    const Classes = useStyle();


  return (
    <>
      {pokemon ? (
        <>
          <Grid container xs={12} className={Classes.GridStyle}>
            <Grid item>
              <Typography variant="h1">
                {`${id}. ${firstAlpha(name)}`} <img src={front_default} />
              </Typography>
              <Card component={Paper} className={Classes.cardStyle}>
                <CardMedia
                  image={url}
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
        </>
      ) : (
        <h1>Request page not found</h1>
      )}
    </>
  );
}
export default Pokemon;
