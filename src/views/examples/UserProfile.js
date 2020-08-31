

import React, {Component} from "react"
// import BoardPopup from "./BoardPopup"
import UserNavbar from "components/Navbars/UserNavbar.js";
import Modal from "react-modal";
import {Button} from "reactstrap"
import history from '../../history'
import BoardPage from "./BoardPage";


// import Modal from 'react-bootstrap/Modal'


Modal.setAppElement("#root")

class UserProfile extends React.Component {
   constructor (props){
      super(props)
      this.state = {
          modalIsOpen: false,
          setModalIsOpen: true,
          inputValue: "",
          boards: []
      }
   }
  
     
  // handleModal =() =>{
  //   this.setState({modalIsOpen: !this.state.modalIsOpen})
  // }

  openModal = () =>{
    this.setState({modalIsOpen: true})
  }
  
  closeModal = () =>{
    this.setState({modalIsOpen: false})
  }
  
  inputOnChange =(event) =>{
      this.setState({inputValue:event.target.value })
    
  }


  createBoard =() =>{
    if(this.state.inputValue.length >0){
      const board = {
        title: this.state.inputValuex
      }
      this.state.boards.push(board)
      history.push('/board-page');
    }
    else {
      alert("please add a board name")
    }    
  }

    render() {
      return (
          <div>
          
              <UserNavbar/>
                 <main ref="main">
                 <div className="position-relative">
                {/* shape Hero */}
                 </div>       
             </main>
            {/* <Button variant="primary" onClick={this.openModal}>
              Create a board
            </Button> */}
            <button type="button" class="btn btn-outline-light" onClick={this.openModal}>+ Create a board</button>
            <Modal isOpen = {this.state.modalIsOpen} onHide = {this.closeModal} className ="center mw5 mw6-ns hidden ba mv4 pa3 bt">
                {/* <h2>Board title</h2> */}
                <input 
                    id="name" 
                    className="input-reset ba b--black-20 pa2 mb2 db w-100" 
                    type="text" aria-describedby="name-desc" 
                    placeholder ="Board title"
                    onChange = {this.inputOnChange}
                />      
                    <p>Board body</p>
                  
                  <Button variant="primary" onClick={this.closeModal}>
                     Close 
                  </Button>
                <Button variant="primary" onClick={this.createBoard}>
                  Create a board 
                </Button>
          </Modal>
         {this.state.boards.map(board =>{
            return <button>{board.title}</button>
         })}
          </div>
          
      )
    }
}

export default UserProfile;