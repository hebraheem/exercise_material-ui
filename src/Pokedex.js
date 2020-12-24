import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import axios from "axios";
import firstAlpha from "./functions";

const useStyles = makeStyles((theme) => ({
  bodyContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  media: {
    margin: "auto",
  },
  card: {
    cursor: "pointer",
    transitionProperty: "transform",
    transitionDuration: "1s", 
    '&:hover': {
        transform: 'scale(1.05)',
        transition: "1s"
    }
  },
  cardContent: {
    textAlign: "center",
  },
  buttonStyle: {
    margin: "50px 45%",
  },
  Container: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    padding: "0 15px",
    margin: "5px 0",
    marginLeft: "20px",
    width: "300px"
  },
  SearchIcon: {
    alignSelf: "flex-end",
    marginBottom: "10px"
  },
  searchInput: {
    width: '200px',
    margin: "5px"
  },
}));

function Pokedex({ history }) {
  const [pokemonData, setPokemons] = useState({});
  const [filter, setFilter] = useState('')
  const Classes = useStyles();

  const handleSearch=(e)=>{
      setFilter(e.target.value)
  }

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then((response) => {
        const { data } = response;
        const { results } = data;
        const PokemonData = {};
        results.forEach((pokemon, index) => {
          PokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprites: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemons(PokemonData);
      });
  }, []);

  return (
    <>
      <AppBar position="static">
        <div className={Classes.Container}>
          <Toolbar>
            <SearchIcon className={Classes.SearchIcon} />
            <TextField
              onChange={handleSearch}
              type="text"
              label="Pokemon"
              variant="standard"
              className={Classes.searchInput}
            />
          </Toolbar>
        </div>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={Classes.bodyContainer}>
          {Object.keys(pokemonData).map((pokemonId) => {
            let searchfilter = pokemonData[pokemonId].name.includes(filter.toLowerCase());
            const { id, name } = pokemonData[`${pokemonId}`];
            const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            return (
              (searchfilter) && (
                <Grid item xs={6} sm={4} md={3} key={id}>
                  <Card onClick={() => history.push(`/${pokemonId}`)} className={Classes.card}>
                    <CardMedia
                      style={{ width: "130px", height: "130px" }}
                      image={sprite}
                      alt={name}
                      className={Classes.media}
                    />
                    <CardContent>
                      <Typography
                        className={Classes.cardContent}
                      >{`${id}. ${firstAlpha(name)}`}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            );
        })}
        </Grid>
      ) : (
        <h1>Request source not found</h1>
      )}
    </>
  );
}

export default Pokedex;
