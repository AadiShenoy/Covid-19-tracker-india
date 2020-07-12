import React,{useState,useEffect} from "react";
import {Doughnut} from 'react-chartjs-2';
import {Grid,Box,InputAdornment,TextField,Typography,Button} from '@material-ui/core'
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Navbar from './navbar';
import '../App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import Aos from "aos";
import "aos/dist/aos.css";
import Footer from "./footer";


//styles....

const useStyles = makeStyles({
    mainContainer:{
     background:"#233",
     height:"100vh"
    },
    box:{
        background:"white",
        borderRadius:"12px"
    },
    searchFiled:{
        width:"70%",
        margin:"20px auto",
        fontSize:"20px",
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

//textField styles...

const InputField = withStyles({
    root:{
        "& label.Mui-focused":{
            color:"white"
        },
        "& label":{
            color:"white"
        },
        "& .MuiOutlinedInput-root":{
            "& fieldset":{
                borderColor:"white"
            },
            "&:hover fieldset":{
                borderColor:"white"
            },
            "&.Mui-focused fieldset":{
                borderColor:"white"
            }
        }
    }
})(TextField)

//Speech recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
  const mic = new SpeechRecognition()

    mic.continuous = false
    mic.interimResults = false
    mic.lang = 'en-US'

//Main function....

const Statistics = () => {
    const classes = useStyles();

    useEffect(() =>{
        fetchitem();
        Aos.init({duration:1000});
      },[]);


    const [loading,setLoading]=useState(false);
    const [items,setItems] = useState([]);
    const [search,setsearch] = useState('');
    const [filteredStates,setFilterdStates]=useState([]);
    const [isListening, setIsListening] = useState(false);
        
    useEffect(() => {
        handleListen()
      }, [isListening])
    
    const fetchitem = async() => {
        const state_data=await fetch ("https://api-covid19-in.herokuapp.com/getdata?state=all&sortkey=active_des");
        const jstate_data=await state_data.json();
        setItems(jstate_data.results);
        setLoading(true);
        }

        useEffect(() => {
            setFilterdStates(
                items.filter(fillstate => {
                    return fillstate.state.toLowerCase().includes(search.toLowerCase())
                 })

            )
        },[search,items])
         


        //handling speech recognition
        const handleListen = () => {
            if (isListening) {
              mic.start()
            } 
            else {
              mic.stop()
            }
        
            mic.onresult = event => {
              const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
              
            setsearch(transcript)

              mic.onerror = event => {
                console.log(event.error)
              }
            }
          }
        
          const handleclick = () => {
              setsearch('');
              setIsListening(prevState => !prevState)
              setTimeout(() => {
                setIsListening(false);
              }, 5000);
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
        <Box component="div" className={classes.mainContainer}>
            <Navbar/>
            {/* state data...... */}
            <Typography variant="h4" className={classes.title}>State Data</Typography>
            <Grid container>
                <Grid item xs={0} sm={1}/>
                <Grid item container xs={12} sm={10}>
                    <Grid container justify="center">
                    <Grid item container justify="center">
                    <InputField
                    autoComplete="off"
                    id="outlined-basic" 
                    label="Search State.." 
                    variant="outlined" 
                    onChange={ e => setsearch(e.target.value)}
                    className={classes.searchFiled}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="large"/>
                          </InputAdornment>
                        ),
                        endAdornment:(
                            <InputAdornment position="end">
                             <Button onClick={handleclick} >
                            {isListening ? <MicIcon  style={{color:"white"}}/> : <MicOffIcon  style={{color:"white"}}/>}
                            </Button>
                            </InputAdornment>
                        ),
                        style:{color:"white"}
                      }}
                      />
                    </Grid> 
                    {filteredStates.map((it,idx) => (
                    <Grid item  xs={12} sm={6} md={4} key={idx} data-aos="zoom-in"> 
                    <Box border={1} m={3} className={classes.box}>
                    <Doughnut data={{labels:['active','deaths','recoveries'],
                    datasets: [{
                            data:[it.active,it.deaths,it.recoveries],
                            backgroundColor:['#26211f','#d45c28','#66280d'],
                            }]}} 
                    height={70}
                    width={100}
                    options={{
                        title:{
                            display:true,
                            text:it.state,
                            fontSize:25,
                            fontColor:'black'
                        },
                        legend:{
                            display:true,
                            position:'bottom'}
                    }}/>
                    </Box>
                    </Grid>
                    ))}
                    </Grid>
                </Grid>
                <Grid item xs={0} sm={1}/>
            </Grid>
            <Footer/>            
        </Box>
    );
}
}


export default Statistics;