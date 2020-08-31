

import React from "react";
import {Button} from "reactstrap"

class List extends React.Component{
 

    render(){
        return(
            <>
            <div>
                <input type ="text" placeholder = "Enter list title ..."/>
                <Button outline color="secondary"/>
            </div>
            
            </>
        )
    }
}