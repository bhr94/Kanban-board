

import React from "react";
import "tachyons"
// import CreateListButton from "./CreateListButton"
import Modal from "react-modal"
import { Button, Spinner } from "reactstrap"
import CardList from "./CardList"
import Card from "./Card"
import "../../style.css"
// import "../../index.css"
import Scroll from "./Scroll"
import { connect } from "react-redux"
import createListAction from "../../redux/actions/createListAction"
import createCardAction from "../../redux/actions/createCardAction"
import { Redirect } from "react-router-dom";
import loadListsAction from "../../redux/actions/loadListsAction"
import { Row } from "reactstrap";
import loadCardsAction from "../../redux/actions/loadCardsAction";
import UserData from './UserData';
import loadCurrentBoardAction from "../../redux/actions/loadCurrentBoardAction"
import loadCurrentBoardListAction from "../../redux/actions/loadCurrentBoardListAction"
import { Form, FormGroup, Label, Input } from 'reactstrap';

// constructor
// render
// componentdidMount
//render



//constructor
//render
//constructor
//render

class BoardPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
            input: "",
            cardTitle: "",
            cardModalIdOpen: false,
            list: false,
            isInEditMode: false,
            value:'',
            lists:[]
        }

    }

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    

    updateComponentValue = () => {
        this.setState({
            isInEditMode: false,
        })
        UserData.updateCurrentBoardTitle(this.state.value)
        const bodyContent = JSON.stringify({
            boardId: UserData.getCurrentBoardId(),
            newTitle: this.state.value
        })

        fetch('http://localhost:3001/updateBoardTitle',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": UserData.getToken()
            },
            body: bodyContent
        })
        .then(response => {
            return response.json()
        })
        .then(data =>{
            if(data){
                UserData.updateCurrentBoardTitle(data.boardname)
            }
        })
        .catch(error =>{
            console.log(error)
        })
    }



    renderEditView = () => {
        return <div>
            <input
                type="text"
                defaultValue={UserData.getCurrentBoardTitle()}
                ref="theTextInput"
                onChange ={this.newValue}
            />
            <button onClick={this.changeEditMode}>X</button>
            <button onClick={this.updateComponentValue}>✔</button>
        </div>
    }


    newValue =(e)=>{
       this.setState({value: e.target.value})
    }


    renderDefaultView = () => {
        return <div onClick={this.changeEditMode} className="boardTitle">
            {UserData.getCurrentBoardTitle()}
        </div>
    }

    openCardModal = () => {
        this.setState({ cardModalIdOpen: true })
    }

    closeCardModal = () => {
        this.setState({ cardModalIdOpen: false })
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
                boardId: UserData.getCurrentBoardId(),
                listTitle: this.state.input
            })
            fetch('http://localhost:3001/createList',
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": UserData.getToken()
                    },
                    body: bodyContent
                }
            )
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if (data) { 
                        // if (this.props.boards.length > 0) {
                        //     alert("cimbre1")
                        //     this.props.createList(data.listtitle, UserData.getCurrentBoardId(), data.listid)
                        // }

                        let newList = {
                            "listId": data.listid,
                            "listTitle": data.listtitle,
                            "cards": []
                        }
                        let boardLists = UserData.getCurrentBoardLists();
                        boardLists.push(newList)
                        UserData.setCurrentBoardLists(boardLists);
                        this.setState({ list: true })
                    }
                })
                .catch(error =>{
                    console.log(error)
                })
        }
        else {
            alert("please enter a list title...")
            this.setState({ modalIsOpen: true })
        }
        this.setState({ input: "" })
    }

    componentDidMount() {
        if (this.props.boards.length > 0 && this.props.board.lists.length === 0) {
            this.props.loadLists(this.props.board.boardId, UserData.getToken());
            this.setState({ list: true })
        }
        this.setState({ list: true })

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
                        "Authorization": UserData.getToken()
                    },
                    body: bodyContent

                }
            )
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    this.props.createCard(data.cardcontent, data.listid, UserData.getCurrentBoardId(), data.cardid)
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
        if (this.props.boards.length > 0 && this.props.board.boardId) {
            UserData.setCurrentBoardLists(this.props.board.lists);
        }
        let lists = UserData.getCurrentBoardLists();
        if (UserData.getToken()) {
            return (
                <>
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
                    {/* <div className="board-header">
                    </div>    */}
                    {this.state.isInEditMode ?
                        this.renderEditView() :
                        this.renderDefaultView()
                    }
                    {/* <div className="boardTitle" onClick ={this.updateBoardTitle}>{UserData.getCurrentBoardTitle()} </div> */}
                    <section className="section section-lg">
                        {this.state.modalIsOpen ?
                            <div isOpen={this.state.modalIsOpen} className="mw5 mw6-ns hidden ba mv4 pa3 bt">
                                <input
                                    id="name"
                                    className="input-reset ba b--black-20 pa2 mb2 db w-20"
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
                            </div> :
                            <Button variant="primary" onClick={this.openModal}>
                                + Add another list
                                 </Button>
                            //  this.props.isListsPending?
                        }
                    </section>
                    <Scroll className="cardContainer">
                        <Row>
                            {!this.state.list ?
                                <div>
                                    <h1>Loading...</h1>
                                    <Spinner color="secondary" />
                                </div> :
                                lists.map((list, i) => {
                                    return <div className="list" >
                                        <CardList
                                            title={list.listTitle}
                                            id={list.listId}
                                            key={list.listId}
                                            className="cardListName"
                                            dropCard={this.dropCard}
                                            dragOver1={this.dragOver1}
                                        // openCardModal={this.openCardModal}
                                        >
                                            <Scroll>
                                                {
                                                    list.cards.map(card => {
                                                        return <div
                                                            draggable={true}
                                                            className="f5 lh-copy measure-narrow card"
                                                            value={this.state.cardTitle}
                                                            id={card.cardId}
                                                            key={card.cardId}
                                                            onDragStart={this.dragStart}
                                                            onDragOver={this.dragOver2}
                                                        >
                                                            {card.cardcontent}
                                                        </div>
                                                    })
                                                }
                                            </Scroll>
                                        </CardList>
                                        <input
                                            type="text"
                                            placeholder="enter card title..."
                                            onChange={this.cardTitleOnChange}
                                            className="mw-100 w-20 w5-ns f5 input-reset ba b--black-20 pv3 ph4 border-box"
                                        />
                                        <Button variant="primary" onClick={() => this.addCard(i)}>add card</Button>
                                        <Button variant="secondary" onClick={() => this.closeCardModal}>X</Button>
                                    </div>
                                })
                            }
                        </Row>
                    </Scroll>
                </>
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
    let boardId = parseInt(ownProps.match.params.boardId);

    return {
        boards: state.boards,
        board: state.boards.find(board => board.boardId === boardId),
        user: state.user,
        boardId: boardId,
        isListsPending: state.isListsPending,
        listsLoadError: state.listsLoadError,
        isBoardsPending: state.isBoardsPending,
        currentBoard: state.currentBoard,
        isCurrentBoardListPending: state.isCurrentBoardListPending
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createList: (listTitle, boardId, listId) => dispatch(createListAction(listTitle, boardId, listId)),
        createCard: (cardContent, listId, boardId, cardId) => dispatch(createCardAction(cardContent, listId, boardId, cardId)),
        loadLists: (boardId, idToken) => dispatch(loadListsAction(boardId, idToken)),
        loadCards: (listId, boardId, idToken) => dispatch(loadCardsAction(listId, boardId, idToken)),
        loadCurrentBoard: (boardId, token) => dispatch(loadCurrentBoardAction(boardId, token)),
        loadCurrentBoardList: (boardId, idToken) => dispatch(loadCurrentBoardListAction(boardId, idToken))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)

