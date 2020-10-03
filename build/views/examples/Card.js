import React from "react";
import {Button} from "reactstrap"





class Card extends React.Component{
    // constructor(){
    //     this.state ={
    //         input:"",
    //         cards:[]
    //     }
    // }

    // cardTitleOnChange = (event) =>{
    //     if(event.target.value.length >0){
    //         this.setState({input:event.target.value})
    //     }
       
    // }

    // addCard = () =>{
    //     this.setState(prevState =>{
    //         prevState.cards.push(prevState.input)
    //         this.setState({cards:prevState.cards})
    //     })
    //  }

    render() {
        return(
            <>
                <input 
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
                </Button>
            </>
        );
    }
}
export default Card;

           