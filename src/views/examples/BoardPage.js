

import React from "react";
import "tachyons"
// import CreateListButton from "./CreateListButton"
import Modal from "react-modal"
import { Button } from "reactstrap"
import CardList from "./CardList"
import Card from "./Card"
import "../../style.css"
import Carf from "reactstrap"
// import "../../index.css"
import Scroll from "./Scroll"



class BoardPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
            input: "",
            lists: [],
            cardTitles: [],
            cardTitle: ""

        }
    }

    // lists[
    //     {title:"", 
    //     cards[title1, title2]
    //     }
    // ]

    //{listtite: []}
    //
    //

    openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }

    inputOnChange = (event) => {
        this.setState({ input: event.target.value })
    }

    addList = () => {
        this.setState({ modalIsOpen: false })
        if (this.state.input.length > 0) {
            const list = {
                title: this.state.input,
                cards: []
            }
            this.setState(prevState => {
                prevState.lists.push(list)
                this.setState({ lists: prevState.lists })
            })
            this.setState({ input: "" })
        }
    }


    //  addList =() =>{
    //     this.setState({modalIsOpen: false})
    //        if(this.state.input.length >0){
    //            this.setState(prevState =>{
    //                 prevState.lists.input = []
    //                 this.setState({lists:prevState.lists})
    //            })
    //        }
    //        this.setState({input:""})       
    //  }



    // lists[
    //     {listTitle:"", 
    //     cards[title1, title2]
    //     }
    // ]

    cardTitleOnChange = (event) => {
         this.setState({ cardTitle: event.target.value })
        
    }


    addCard = (listTitle) => {
        if(this.state.cardTitle.length >0) {
            this.setState(prevState =>{
                prevState.lists.map((list, i )=>{
                    if(list.title === listTitle){
                        list.cards.push(prevState.cardTitle)
                    }
                    
                })
                this.setState({lists:prevState.lists})
            })
        }
        
     this.setState({cardTitle: ""})
       
    }

    edit =() =>{
        alert("hello")
    }

    render() {

        return (
            <div className = "all">
                
                <nav className="dt w-100 border-box pa3 ph5-ns b--white-10">
                    <a className="dtc v-mid mid-gray link dim w-25" href="#" title="Home">
                        <img src="http://tachyons.io/img/logo.jpg" className="dib w2 h2 br-100" alt="Site Name" />
                    </a>
                    <div className="dtc v-mid w-75 tr">
                        <a className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="#" title="About">Boards</a>
                        <a className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="#" title="Store">Home</a>
                        <a className="link dim dark-gray f6 f5-ns dib" href="#" title="Contact">Join Us</a>
                    </div>
                </nav>

                <div className = "board-header">

                </div>

                {/* <div>{this.props.title}</div> */}
                {/* <CreateListButton  createList = {this.openModal}/> */}
                <Button variant="primary" onClick={this.openModal}>
                    + Add another list
                 </Button>
        
         <Modal isOpen={this.state.modalIsOpen} onHide={this.closeModal} className="center mw5 mw6-ns hidden ba mv4 pa3 bt">
                    {/* <h2>Board title</h2> */}
                    <input
                        id="name"
                        className="input-reset ba b--black-20 pa2 mb2 db w-100"
                        type="text" aria-describedby="name-desc"
                        placeholder="Enter list title..."
                        onChange={this.inputOnChange}
                    />
                    <Button variant="primary" onClick={this.addList}>
                        Add list
                  </Button>
                    <Button variant="primary" onClick={this.closeModal}>
                        X
                  </Button>
          </Modal>
                {this.state.lists.map(list => {
                    return <div className = "list"> 
                        <CardList title={list.title} className = "cardListName" edit = {this.edit}/>
                        <Scroll className ="">
                        {
                            list.cards.map(card =>{
                           return  <div className = "f5 lh-copy measure-narrow card" onClick = {this.edit}>{card}</div>
                            })
                        }
                        </Scroll>
                        <div>
                            <div>
                            <input 
                            type="text" 
                            placeholder="enter card title..." 
                            onChange={this.cardTitleOnChange} 
                            className="mw-100 w-20 w5-ns f5 input-reset ba b--black-20 pv3 ph4 border-box"
                        />
                        <Button variant="primary" onClick={() => this.addCard(list.title)}>add card</Button>
                            </div>
                        </div>                             
                    </div>      
                })}
                

            </div>
        )

    }
}


export default BoardPage

