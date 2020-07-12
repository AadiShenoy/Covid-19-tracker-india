import React,{useState,useEffect} from 'react';
import {Box,Grid,Typography,Card,CardContent,InputAdornment,TextField,BottomNavigation,BottomNavigationAction,Button} from "@material-ui/core"
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Navbar from "./navbar";
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import Aos from "aos";
import "aos/dist/aos.css";


//styles....

const useStyles = makeStyles({
    searchFiled:{
        width:"50%",
        margin:"20px auto",
        fontSize:"20px",
        minWidth:"280px"
    },
    title:{
        display: "flex", 
        alignItems: "center",
        color:"white",
        justifyContent:"center",
        marginTop:"10px"
    },
    loader:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"250px"
    },
    root:{
        "& .MuiSvgIcon-root":{
            fill:"black",
        }
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

//  Main function......


const Helpline = () => {
    const classes = useStyles();

    useEffect( () => {
        fetchitems();
        Aos.init({duration:1000});
    },[]);


    const [loading,setLoading]=useState(false);
    const [items,setItems] = useState([]);
    const [search,setSearch] = useState('');
    const [overall,setOverall] = useState({});
    const [filtered_items,setfiltered_Items] = useState([]);
    const [isListening, setIsListening] = useState(false);
        
    useEffect(() => {
        handleListen()
      }, [isListening])
    

    const fetchitems = async() => {
    const help_data= await fetch("https://api.rootnet.in/covid19-in/contacts");
    const jhelp_data= await help_data.json();
    setItems(jhelp_data.data.contacts.regional);
    setOverall(jhelp_data.data.contacts.primary);
    setLoading(true);
    }

    useEffect(() => {
        setfiltered_Items(
            items.filter(fitem => {
                return fitem.loc.toLowerCase().includes(search.toLowerCase());
       
             })
        );
    },[search,items]);

    
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
              
            setSearch(transcript)

              mic.onerror = event => {
                console.log(event.error)
              }
            }
          }
        
          const handleclick = () => {
              setSearch('');
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
        <div className={classes.title}>
            <Typography variant="h4" >Helpline</Typography>
            <ContactSupportIcon fontSize="large"/>
        </div> 
        <Grid container justify="center" style={{marginTop:"10px"}} data-aos="zoom-in">
            <BottomNavigation className={classes.root} style={{borderRadius:"8px"}}>
                <BottomNavigationAction style={{padding:0}} icon={<PhoneIcon fontSize="large"/>} className={classes.root}  href="tel:+1075"/>
                <BottomNavigationAction style={{padding:0}} icon={<EmailIcon fontSize="large"/>} className={classes.root}  href={"mailto:"+overall.email}/>
                <BottomNavigationAction style={{padding:0}} icon={<TwitterIcon fontSize="large"/>} className={classes.root}  href={overall.twitter}/>
                <BottomNavigationAction style={{padding:0}} icon={<FacebookIcon fontSize="large"/>} className={classes.root} href={overall.facebook}/>
            </BottomNavigation>
        </Grid>

        <Grid container justify="center" alignItems="center">
            <Grid item xs={0} sm={2} md={3}/>
            <Grid item container justify="center">
                    <InputField
                    className={classes.searchFiled}
                    autoComplete="off"
                    id="outlined-basic" 
                    label="Search State.." 
                    variant="outlined" 
                    onChange={ e => setSearch(e.target.value)}
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

            {filtered_items.map((item,it) => (
                <Grid item component={Card} xs={10} sm={8} md={6} key={it} style={{margin:"2%"}} data-aos="zoom-in" >
                    <CardContent>
                        <Typography variant="h5" gutterBottom style={{fontWeight:"bold"}}>
                            {item.loc}
                        </Typography>
                        <a href={"tel:+"+item.number}>{item.number}</a>
                    </CardContent>
                </Grid>
            ))}

             </Grid> 
            <Grid item xs={0} sm={2} md={3}/>
        </Grid>
        </Box>  

    );
}
}
export default Helpline;