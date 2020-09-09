

import React from "react";
import "tachyons"
// import CreateListButton from "./CreateListButton"
import Modal from "react-modal"
import { Button } from "reactstrap"
import CardList from "./CardList"
import Card from "./Card"
import "../../style.css"
// import "../../index.css"
import Scroll from "./Scroll"
import { connect } from "react-redux"
import createListAction from "../../redux/actions/createListAction"
import createCardAction from "../../redux/actions/createCardAction"
import { Redirect } from "react-router-dom";
import { post } from "jquery";



class BoardPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
            input: "",
            cardTitle: ""

        }
    }


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
            const bodyContent = JSON.stringify({
                boardId: this.props.board.boardId,
                listTitle: this.state.input
            })
            fetch('http://localhost:3001/createList',
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": this.props.user.idToken
                    },
                    body: bodyContent
                }
            )
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if (data) {
                        this.props.createList(data.listtitle, this.props.board.boardId, data.listid)
                    }
                })
        }
        else {
            alert("please enter a list title...")
            this.setState({ modalIsOpen: true })
        }
        this.setState({ input: "" })
    }


    cardTitleOnChange = (event) => {
        this.setState({ cardTitle: event.target.value })

    }

    addCard = (i) => {
        if (this.state.cardTitle.length > 0) {
            const bodyContent = JSON.stringify({
                listId: this.props.board.lists[i].listId,
                cardContent: this.state.cardTitle
            })

            fetch('http://localhost:3001/createCard',
                {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": this.props.user.idToken
                    },
                    body: bodyContent

                }
            )
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    this.props.createCard(data.cardcontent, data.listid, this.props.board.boardId, data.cardid)
                })
            this.setState({ cardTitle: "" })
        }
        else {
            alert("enter card content")
            this.setState({ cardTitle: "" })
        }

    }

    dropCard = (e) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("cardId");
        const card = document.getElementById(cardId);
        e.target.appendChild(card);

    }

    dragOver1 = (e) => {
        e.preventDefault()
    }


    dragStart = (e) => {
        const target = e.target;
        e.dataTransfer.setData("cardId", target.id)

        // setTimeout(()=>{
        //     target.style.display ="none";
        // },0)
    }

    dragOver2 = (e) => {
        e.stopPropagation();
    }

    render() {
        if (this.props.boards.length > 0) {
            return (
                <div className="all">
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
                    <div className="board-header">

                    </div>
                    <div>{this.props.board.boardTitle} </div>
                    <Button variant="primary" onClick={this.openModal}>
                        + Add another list
                    </Button>

                    <Modal isOpen={this.state.modalIsOpen} onHide={this.closeModal} className="center mw5 mw6-ns hidden ba mv4 pa3 bt">
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
                    {this.props.board.lists.map((list, i) => {
                        return <div className="list" >
                            <CardList
                                title={list.listTitle}
                                id={list.listId}
                                className="cardListName"
                                dropCard={this.dropCard}
                                dragOver1={this.dragOver1}
                            >
                                <Scroll>
                                    {
                                        list.cards.map(card => {
                                            return <div
                                                draggable={true}
                                                className="f5 lh-copy measure-narrow card"
                                                value={this.state.cardTitle}
                                                id={card.cardId}
                                                onDragStart={this.dragStart}
                                                onDragOver={this.dragOver2}
                                            >
                                                {card.cardContent}
                                            </div>
                                        })
                                    }
                                </Scroll>
                            </CardList>
                            <div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="enter card title..."
                                        onChange={this.cardTitleOnChange}
                                        className="mw-100 w-20 w5-ns f5 input-reset ba b--black-20 pv3 ph4 border-box"
                                    />
                                    <Button variant="primary" onClick={() => this.addCard(i)}>add card</Button>
                                </div>
                            </div>
                        </div>
                    })
                    }
                </div>

            )
        }
        else {
            return (
                <Redirect to="/landing-page" />
            )

        }


    }
}


const mapStateToProps = (state, ownProps) => {
    let boardTitle = ownProps.match.params.boardTitle;

    console.log("The state is:" + JSON.stringify(state));
    return {
        boards: state.boards,
        board: state.boards.find(board => board.boardTitle === boardTitle),
        user:state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createList: (listTitle, boardId, listId) => dispatch(createListAction(listTitle, boardId, listId)),
        createCard: (cardContent, listId, boardId, cardId) => dispatch(createCardAction(cardContent, listId, boardId, cardId))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)

