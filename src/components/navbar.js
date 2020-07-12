import React,{useState} from "react";
import {AppBar,Toolbar,ListItem,IconButton,ListItemText,List,Typography,Box} from "@material-ui/core";
import { makeStyles} from '@material-ui/core/styles';
import Drawer from "@material-ui/core/Drawer";
import {Link} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import HomeIcon from '@material-ui/icons/Home';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
//styles

const useStyles = makeStyles(theme =>({
    menuSliderContainer: {
        width:"100%",
        background:"black",
        height:1000,
    },
    
    listitem: {
        color:"white",
        textAlign:"center",
        marginTop:"3rem"
    },
    hoverButton:{
    '&:hover': {
        backgroundColor:'#474141',
    }
}
}));

const menuItems = [
    {
        listText:" Home",
        listPath:"/",
        listIcon:<HomeIcon fontSize="large"/>
    },
    {
        listText:" State Data",
        listPath:"/statistics",
        listIcon:<EqualizerIcon fontSize="large"/>

    },
    {
        listText:" News",
        listPath:"/news",
        listIcon:<AnnouncementIcon fontSize="large"/>
    },
    {
        listText:" Helpline",
        listPath:"/helpline",
        listIcon:<ContactSupportIcon fontSize="large"/>
    }

]

const Navbar = () => {
    const [state,setState] = useState({
        right:false
    });

    const toggleSlider = (slider,open) => () => {
        setState({...state,[slider]: open});
    };
    const classes = useStyles();
    const slideList = slider => (
        <Box component="div" className={classes.menuSliderContainer} onClick={toggleSlider(slider,false)}>
            <List>
                {menuItems.map((item,key)=>(
                <ListItem button key={key} component={Link} to={item.listPath} className={classes.hoverButton}>
                    <ListItemText className={classes.listitem}>
                        <Typography variant="h4">
                        {item.listIcon}
                        </Typography>
                        <Typography variant="h4">
                        {item.listText}
                        </Typography>
                    </ListItemText>
                </ListItem>
                ))}
            </List>
        </Box>
    );
    
    return(
        <>
        <Box component="nav">
            <AppBar position="static" style={{background:"black"}}>
                <Toolbar>
                    <IconButton onClick={toggleSlider("right",true)}>
                      <MenuIcon  style={{color:"white"}} fontSize="large"/> 
                    </IconButton>
                    <Typography variant="h5"style={{color:'white'}}>
                        Covid-19 India
                    </Typography>
                    <Drawer open={state.right} anchor="top" onClose={toggleSlider("right",false)}>
                        {slideList("right")}
                    </Drawer>
                </Toolbar>
            </AppBar>
        </Box>
        </>
    );
}

export default Navbar;