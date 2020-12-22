import { AppBar, Toolbar, Grid, Card, CardContent, CardMedia, Typography} from "@material-ui/core";
import {makeStyles } from '@material-ui/core/styles'
import React, {useState} from "react";
import pokemons from './mockData'
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
    const [pokemonData, setPokemons] = useState(pokemons)
    const Classes = useStyles()

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


// const GetPokemonCard = (pokemonId)=>{
//     return(
//         <Grid item xs={6} sm={4} md={3}>
//             <Card>
//                 <CardContent>hello</CardContent>
//             </Card>
//         </Grid>
//     )
// }