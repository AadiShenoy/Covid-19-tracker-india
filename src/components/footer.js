import React from "react";
import {BottomNavigation,Typography} from "@material-ui/core";

const Footer = () =>{
    return(
       
        <BottomNavigation style={{backgroundColor:"rgba(35, 43, 37,0.5)",marginTop:"10%"}}>
            <Typography style={{margin:"auto",color:"tan",fontWeight:"bold"}}>
              Developed By Adithya S Shenoy
              <span role="img" aria-label="heart">❤️</span>
            </Typography>
        </BottomNavigation>
        

    )
}
export default Footer;