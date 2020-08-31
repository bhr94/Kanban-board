 import React from "react"
import {Button} from "reactstrap"
import "tachyons"
import "../../style.css"


 class CardList extends React.Component {
     render() {
         return(   
            // <div className ="center mw5 mw6-ns hidden ba mv4 pa3 bt">
            <div>
            <div className = "f5 f4-ns mv0" onClick = {this.props.edit}>{this.props.title}</div>
            {/* <input 
                    id="name" 
                    className="input-reset ba b--black-20 pa2 mb2 db w-100" 
                    type="text" aria-describedby="name-desc" 
                    placeholder ="Enter a title for this card..."
                    onChange = {this.props.cardTitleOnChange}
                />      
                <Button variant="primary" onClick = {this.props.addCard}>
                    ADD
                </Button>
                <Button variant="primary">
                    X
                </Button> */}
            {/* <Button variant="primary">
                X
            </Button> */}
            
        </div>
         )
     }
 }

 export default CardList;