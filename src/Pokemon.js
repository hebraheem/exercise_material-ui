import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import pokemons from "./mockData";
import firstAlpha from "./functions";

function Pokemon(props) {
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;

  const [pokemon, setPokemon] = useState(pokemons[`${pokemonId}`]);
  console.log(pokemon);
  const { name, id, species, height, weight, types, sprites } = pokemon;
  const url = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
  const { front_default } = sprites;

  console.log(front_default)

  return (
    <>
      {pokemon ? (
        <>
          <Typography variant="h2">
            {`${id}. ${firstAlpha(name)}`} <img src={front_default} />
          </Typography>
          <img src={url} alt="" style={{ width: "300px", height: "300px" }} />
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
        </>
      ) : (
        <h1>Request page not found</h1>
      )}
    </>
  );
}
export default Pokemon;
