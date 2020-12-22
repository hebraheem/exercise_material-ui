import { AppBar, Toolbar, Grid, Card, CardContent, CardMedia, Typography} from "@material-ui/core";
import {makeStyles } from '@material-ui/core/styles'
import React, {useEffect, useState} from "react";
import axios from 'axios'
import firstAlpha from './functions'

const useStyles = makeStyles({
    bodyContainer: {
        paddingTop: '20px',
        paddingLeft: "50px",
        paddingRight: '50px'
    },
    cardMedia: {
        margin: 'auto'
    },
    cardContent: {
        textAlign: 'center'
    }
})



function Pokedex({history}) {
    const [pokemonData, setPokemons] = useState({})
    const Classes = useStyles()

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
        .then((response)=>{
            const {data} = response;
            const {results} = data;
            const PokemonData ={};
            results.forEach((pokemon, index)=>{
                PokemonData[index + 1] = {
                  id: index + 1,
                  name: pokemon.name,
                  sprites: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
                };
            }
        )
        setPokemons(PokemonData)
    })
    },[])

  return (
    <>
      <AppBar position="static">
        <Toolbar></Toolbar>
      </AppBar>
      {pokemonData ? (
      <Grid container spacing={2} className={Classes.bodyContainer}>
        {Object.keys(pokemonData).map(pokemonId =>{
            const {id, name} = pokemonData[`${pokemonId}`] 
            const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            return (
                <Grid item xs={6} sm={4} md={3} key={id}>
                    <Card onClick={()=>history.push(`/${pokemonId}`)}>
                    <CardMedia
                        style={{width:'130px', height: '130px'}}
                        image={sprite}
                        alt={name}
                        className={Classes.cardMedia}
                    />
                        <CardContent>
                            <Typography className={Classes.cardContent}>{`${id}. ${firstAlpha(name)}`}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )
        })}
      </Grid>
      ) : <h1>Request source not found</h1>}

    </>
  );
}

export default Pokedex;