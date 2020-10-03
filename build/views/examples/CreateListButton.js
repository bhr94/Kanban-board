

import React from "react"
import {Button} from "reactstrap"


class CreateListButton extends React.Component{
   
    
    
    render() {
        return(
                <Button 
                    outline color="secondary" 
                    onClick = {this.props.createList}>
                    <div>+</div>Add List
                </Button>
                

            
        )
    }
}

export default CreateListButton;