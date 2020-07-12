import React,{useState,useEffect} from "react";
import {Line} from 'react-chartjs-2';
import {Grid,Box,Typography,Card,CardContent,Button} from "@material-ui/core";
import Navbar from './navbar';
import CountUp from 'react-countup';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles} from '@material-ui/core/styles';
import Footer from "./footer";


//styles....

const useStyles = makeStyles({
    box:{
        background:"white",
        borderRadius:"12px",
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

 

const Home = () => {
    const classes = useStyles();

    useEffect(() => {
        fetchitem();
    },[]);


    const [loading,setLoading]=useState(false);
    const[items,setItems] = useState([]);
    const [countryitem,setcountryItems] = useState([]);

    const fetchitem = async() => {
        const data = await fetch("https://api.covid19india.org/data.json");
        const jdata = await data.json();
        const overall_data=await fetch ("https://api-covid19-in.herokuapp.com/getdata");
        const joverall_data=await overall_data.json();
        setcountryItems(joverall_data.results);
        setItems(jdata.cases_time_series.slice(jdata.cases_time_series.length-15,jdata.cases_time_series.length));
        setLoading(true);
    }

    

    // To show loading when api is getting fetched

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

    //  Display fetched data from Api
   
   

    return(
        <Box component="div">
            <Navbar/>

             {/* overall_data.... */}

            <Typography variant="h4" className={classes.title}>Overall Data</Typography>
            
            <Grid container>
                <Grid item xs={false} sm={1}/>
                {countryitem.map((ct_item,key) => (

                <Grid item container xs={12} sm={10} justify="center" key={key}>
                     {/* Total classes.... */}
                <Grid item component={Card} xs={5} md={2} style={{margin:"2%",borderBottom:"10px solid orange"}} key={key}>
                   <CardContent>
                       <Typography  variant="h6" gutterBottom style={{color:"orange"}}>Total</Typography>
                       <Typography variant="h5" >
                           <CountUp start={0} end={Number(ct_item.total)} duration={2.5} separator=","/>
                        </Typography>
                   </CardContent> 
                </Grid>

                 {/* Active classes.... */}
                 <Grid item component={Card} xs={5} md={2} style={{margin:"2%",borderBottom:"10px solid blue"}} key={key}>
                 <CardContent>
                     <Typography variant="h6" gutterBottom style={{color:"blue"}}>Active</Typography>
                     <Typography variant="h5" >
                         <CountUp start={0} end={Number(ct_item.active)} duration={2.5} separator=","/>
                      </Typography>
                 </CardContent> 
                 </Grid>

                  {/* Deaths cases....  */}
                 <Grid item component={Card} xs={5} md={2} style={{margin:"2%",borderBottom:"10px solid red"}} key={key}>
                 <CardContent>
                     <Typography variant="h6" gutterBottom style={{color:"red"}}>Deaths</Typography>
                     <Typography variant="h5" >
                         <CountUp start={0} end={Number(ct_item.deaths)} duration={2.5} separator=","/>
                      </Typography>
                 </CardContent> 
                </Grid>
                 
                 {/* Recoveries... */}

                <Grid item component={Card} xs={5} md={2} style={{margin:"2%",borderBottom:"10px solid green"}} key={key}>
                <CardContent>
                    <Typography variant="h6" gutterBottom style={{color:"green"}}>Recoveries</Typography>
                    <Typography variant="h5" >
                        <CountUp start={0} end={Number(ct_item.recoveries)} duration={2.5} separator=","/>
                    </Typography>
                </CardContent> 
                </Grid>
                </Grid>
                ))}

                <Grid item xs={false} sm={1}/>
            </Grid>
            
            

            {/* Daily cases and recoveries...... */}

            <Typography variant="h4" style={{textAlign:"center",color:"white"}}>Daily Confirmed and Recoveries</Typography>

            <Grid container>
                <Grid item xs={false} sm={2}/>
                <Grid item  xs={12} sm={8}> 
                <Box className={classes.box} m={2}>
                    <Line
                    data={{
                    labels:items.map((it) => it.date ),
                    datasets: [{
                            data:items.map((it) => it.dailyconfirmed ),
                            label:"Daily Confirmed",
                            backgroundColor:"rgba(232, 50, 14,0.5)",
                            borderColor:"red",
                            fill:"+1",
                            pointHoverRadius: 8,                            
                            },
                            {
                             data:items.map((it) => it.dailyrecovered),
                             label:"Daily Recovered",
                             backgroundColor:"rgba(14, 232, 21,0.5)",
                             borderColor:"green", 
                             fill:true,
                             pointHoverRadius: 8,                            
                            }
                        ]}} 
                    height={65}
                    width={100}
                    options={{
                        legend:{
                            display:true,
                            position:'top',
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: "black",
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: "black",
                                    fontSize:15
                                }
                            }]
                        }
                    }}/>
                    </Box>
                    </Grid>
                <Grid item xs={false} sm={2}/>
            
            </Grid>
        <Footer/>
        </Box>
    );
}
}

export default Home;