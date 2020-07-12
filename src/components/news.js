import React,{useState,useEffect} from "react";
import {Grid,Box,Card,CardActionArea,CardContent,CardMedia,Typography} from '@material-ui/core'
import { makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from './navbar';
import Aos from "aos";
import "aos/dist/aos.css";
import Footer from "./footer";

const useStyles = makeStyles({
    mainContainer:{
        background:"#233",
        height:"100%"
       },
       box:{
        background:"white",
        borderRadius:"12px"
    },
    cardContainer:{
        margin:"1.5rem auto",
        borderRadius:"12px",
        border:"3px solid white",
        backgroundColor:"black"
    },
    title:{
        textAlign:"center",
        color:"white",
        marginTop:"10px"
    },
    loader:{
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        marginTop:"250px"
    }
    
});

const News = () => {
    const classes = useStyles();

    useEffect(()=>{
        fetchitem();
        Aos.init({duration:1000});
    },[])
    const [loading,setLoading] = useState(false);
    const [news,setNews] = useState([]);
    
    const fetchitem = async() => {
        const data=await fetch ("https://api-covid19-in.herokuapp.com/news");
        const jdata=await data.json();
        setNews(jdata.results);
        setLoading(true);
        }

        if(loading === false)
        {
            return(
                <div>
                    <Navbar/>
                <div className={classes.loader}>
                    <CircularProgress size="5rem" style={{color:"white"}}/>
                </div>
                </div>   
            );
            
        }
        else{

        return(
            <Box component="div" className={classes.mainContainer}>
            <Navbar/>
            <Typography variant="h4" className={classes.title}>Latest News</Typography>
            <Grid container>
                <Grid item xs={2} />
                <Grid item container xs={12} sm={8}  justify="center" alignItems="center" >
                    
                    {news.map((it,idx) => (
                    <Grid item container key={idx} xs={10} justify="center"> 
                    <Card className={classes.cardContainer}  data-aos="zoom-in" >
                    <CardActionArea href={it.news_link}>
                        <Grid container>
                            <Grid item xs={12} md={4}>
                            <CardContent>
                            <CardMedia component="img" alt="News image"
                            image={it.image} style={{borderRadius:"8px"}}/>
                            </CardContent>
                            </Grid>
                            <Grid item xs={12} md={8} >
                            <CardContent>
                            <Typography  gutterBottom style={{fontWeight:"bold",color:"orange"}}>
                                {it.title}
                            </Typography>
                            <Typography variant="body2" style={{color:"white"}} component="p">
                                {it.snippet}
                            </Typography>
                            </CardContent>
                            </Grid>
                         </Grid> 
                        
                    </CardActionArea>
                    </Card>
                    </Grid>
                    ))}
                </Grid> 
                <Grid item xs={2}/>
                </Grid>
                <Footer/>
            </Box>
            );
        }
}


export default News;