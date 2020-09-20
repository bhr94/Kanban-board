 import React from "react"
import {Button} from "reactstrap"
import "tachyons"
import "../../style.css"


 class CardList extends React.Component {
     render() {
         return(   
            // <div className ="center mw5 mw6-ns hidden ba mv4 pa3 bt">
            <div className = "f5 f4-ns mv0 list-header" onClick = {this.props.changeListEditMode}>{this.props.title}</div>
            // {/* <div onDrop ={this.props.dropCard} onDragOver = {this.props.dragOver1} >
            //     {this.props.children}
            // </div>      */}
         )
     }
 }

 export default CardList;