

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
import { Row } from "reactstrap";
import loadCardsAction from "../../redux/actions/loadCardsAction";
import UserData from './UserData';
import loadCurrentBoardAction from "../../redux/actions/loadCurrentBoardAction"
import loadCurrentBoardListAction from "../../redux/actions/loadCurrentBoardListAction"
import addCurrentBoardlistAction from "../../redux/actions/addCurrentBoardListAction"
import addCurrentBoardCardAction from "../../redux/actions/addCurrentBoardCardAction"

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
            list: false,
            isInEditMode: false,
            value: UserData.getCurrentBoardTitle(),
            lists: [],
            listEdit: {
                listId: null,
                listEditMode: false
            },
            newListTitle: '',
            addCardMode: {
                listId: null,
                isAddCardOpen: false
            }
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
            .then(data => {
                if (data) {
                    UserData.updateCurrentBoardTitle(data.boardname)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }



    renderEditView = () => {
        return <div>
            <input
                type="text"
                defaultValue={UserData.getCurrentBoardTitle()}
                ref="theTextInput"
                onChange={this.newValue}
            />
            <button onClick={this.changeEditMode}>X</button>
            <button onClick={this.updateComponentValue}>✔</button>
        </div>
    }




    newValue = (e) => {
        this.setState({ value: e.target.value })
    }


    renderDefaultView = () => {
        return <div onClick={this.changeEditMode} className="boardTitle">
            {UserData.getCurrentBoardTitle()}
        </div>
    }

    // openCardModal = () => {
    //     this.setState({ cardModalIdOpen: true })
    // }

    closeCardModal = (i) => {
        this.setState(prevState => ({
            addCardMode: {                   // object that we want to update
                ...prevState.addCardMode,    // keep all other key-value pairs
                listId: i,
                isAddCardOpen: !prevState.addCardMode.isAddCardOpen                       // update the value of specific key
            }
        }))
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
                        this.props.addCurrentBoardList(data)
                    }
                })
                .catch(error => {
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
        this.props.loadCurrentBoardList(this.props.match.params.boardId, UserData.getToken())
    }

    cardTitleOnChange = (event) => {
        this.setState({ cardTitle: event.target.value })

    }

    addCard = (i) => {
        if (this.state.cardTitle.length > 0) {
            const bodyContent = JSON.stringify({
                listId: this.props.currentBoard.lists[i].listid,
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

                    // {
                    //     "cardid": 18,
                    //     "listid": "1",
                    //     "cardcontent": "huhuuuuu"
                    // }
                    // this.props.createCard(data.cardcontent, data.listid, UserData.getCurrentBoardId(), data.cardid)
                    this.props.addCurrentBoardCard(data, this.props.currentBoard.lists[i].listid)
                    this.setState({ cardTitle: "" })
                })

                this.setState(prevState => ({
                    addCardMode: {                   // object that we want to update
                        ...prevState.addCardMode,    // keep all other key-value pairs
                        listId: i,
                        isAddCardOpen: !prevState.addCardMode.isAddCardOpen                       // update the value of specific key
                    }
                }))
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

    changeListEditMode = (i) => {
        this.setState(prevState => ({
            listEdit: {                   // object that we want to update
                ...prevState.listEdit,    // keep all other key-value pairs
                listId: i,
                listEditMode: !prevState.listEdit.listEditMode                       // update the value of specific key
            }
        }))
    }

    updateListTitle = (listId) => {
        this.setState(prevState => ({
            listEdit: {                   // object that we want to update
                ...prevState.listEdit,    // keep all other key-value pairs
                listId: listId,
                listEditMode: !prevState.listEdit.listEditMode                       // update the value of specific key
            }
        }))

        const bodyContent = JSON.stringify({
            listId: listId,
            newTitle: this.state.value
        })

        fetch('http://localhost:3001/updateListTitle',
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
            .then(data => {
                if (data) {
                    UserData.updateCurrentBoardTitle(data.boardname)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }


    onListTitleChange = (e) => {
        this.setState({ newListTitle: e.target.value })
    }


    // openAddCardMode = () => {
    //     this.setState({ isAddCardOpen: true })
    // }

    render() {
        let lists = [];

        if (!this.props.isCurrentBoardListPending) {
            lists = this.props.currentBoard.lists;
        }

        if (UserData.getToken()) {
            return (
                <>
                    <nav className="dt w-100 border-box">
                        <a className="dtc v-mid link dim w-25" href="#" title="Home">
                            <img src="http://tachyons.io/img/logo.jpg" className="dib w2 h2 br-100" alt="Site Name" />
                        </a>
                        <div className="dtc v-mid w-75 tr">
                            <a className="link dim white f6 f5-ns dib mr3 mr4-ns" href="#" title="About">Boards</a>
                            <a className="link dim white f6 f5-ns dib mr3 mr4-ns" href="#" title="Store">Home</a>
                        </div>
                    </nav>
                    {/* <div className="board-header">
                    </div>    */}
                    <div className="board-header-btn mod-board-name inline-rename-board js-rename-board">
                        {this.state.isInEditMode ?
                            this.renderEditView() :
                            this.renderDefaultView()
                        }
                    </div>


                    {/* </section> */}
                    <div className="board-canvas board">
                        <div className="js-no-higher-edits js-list-sortable ui-sortable u-fancy-scrollbar">
                            {this.props.isCurrentBoardListPending ?
                                <div>
                                    <h1>Loading...</h1>
                                    <Spinner color="secondary" />
                                </div> :
                                lists.map((list, i) => {
                                    return <div className="list list-wrapper" >
                                        {this.state.listEdit.listEditMode && this.state.listEdit.listId === list.listid ?
                                            <div className="js-list-header u-clearfix is-menu-shown">
                                                <textarea
                                                    type="text"
                                                    defaultValue={list.listtitle}
                                                    ref="theTextInput"
                                                    onChange={this.onListTitleChange}
                                                    className="list-header-name mod-list-name js-list-name-input"
                                                />
                                                <button onClick={() => this.changeListEditMode(list.listid)}>X</button>
                                                <button onClick={()=>this.updateListTitle(list.listid)}>✔</button>
                                            </div> :
                                            <CardList
                                                title={list.listtitle}
                                                id={list.listid}
                                                key={list.listid}
                                                dropCard={this.dropCard}
                                                dragOver1={this.dragOver1}
                                                changeListEditMode={() => this.changeListEditMode(list.listid)}
                                            // openCardModal={this.openCardModal}
                                            />
                                        }

                                        <div className="u-fancy-scrollbar list-cards u-clearfix">
                                            {
                                                list.cards.map(card => {
                                                    return <div
                                                        draggable={true}
                                                        className="f5 lh-copy measure-narrow card list-card"
                                                        id={card.cardId}
                                                        key={card.cardId}
                                                        onDragStart={this.dragStart}
                                                        onDragOver={this.dragOver2}
                                                    >
                                                        {card.cardcontent}
                                                    </div>

                                                })
                                            }
                                        </div>
                                        {
                                            this.state.addCardMode.isAddCardOpen  && this.state.addCardMode.listId === i? /// burani duzwlt
                                                <div>
                                                    <textarea
                                                        type="text"
                                                        placeholder="enter card title..."
                                                        onChange={this.cardTitleOnChange}
                                                        className="list-card-composer-textarea js-card-title list-card"
                                                    />
                                                    <Button variant="primary" onClick={() => this.addCard(i)}>add card</Button>
                                                    <Button variant="secondary" onClick={() => this.closeCardModal(i)}>X</Button>
                                                </div> :

                                                <div className="card-composer-container js-card-composer-container dark-background-hover" onClick={()=>this.closeCardModal(i)}>
                                                    <a className="open-card-composer js-open-card-composer" href="#">
                                                        <span className="icon-sm icon-add">
                                                            +
                                                         </span>
                                                        {/* <span className="js-add-a-card hide">Add a card</span> */}
                                                        <span className="js-add-another-card">  Add another card</span>
                                                    </a>
                                                    <div className="js-card-templates-button card-templates-button-container dark-background-hover">
                                                        <div className="js-react-root">
                                                            <div><a className="_2arBFfwXVxA0AM" role="button" href="#">
                                                                <span className="icon-sm icon-template-card dark-background-hover">
                                                                </span></a></div>
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                })

                            }
                            {this.state.modalIsOpen ?
                                <div isOpen={this.state.modalIsOpen} className="js-add-list list-wrapper mod-add">
                                    <form>
                                        <a class="open-add-list js-open-add-list"
                                            href="#" tabindex="-1">
                                            <span class="placeholder">
                                                <span class="icon-sm icon-add">
                                                </span>Add another list</span>
                                        </a>
                                        <input className="list-name-input"
                                            type="text" name="name"
                                            placeholder="Enter list title..."
                                            autocomplete="off" dir="auto"
                                            maxlength="512"
                                            onChange={this.inputOnChange} />
                                        <div className="list-add-controls u-clearfix" />
                                        <input className="primary mod-list-add-button js-save-edit"
                                            type="submit" value="Add List" onClick={this.addList} />
                                        <a className="icon-lg icon-close dark-hover js-cancel-edit" href="#" onClick={this.closeModal}>
                                            X
                                                    </a>
                                    </form>
                                </div> :
                                <Button onClick={this.openModal}>
                                    + Add another list
                                 </Button>
                                //  this.props.isListsPending?
                            }
                        </div>
                    </div>

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
        isCurrentBoardListPending: state.isCurrentBoardListPending,
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createList: (listTitle, boardId, listId) => dispatch(createListAction(listTitle, boardId, listId)),
        createCard: (cardContent, listId, boardId, cardId) => dispatch(createCardAction(cardContent, listId, boardId, cardId)),
        loadCards: (listId, boardId, idToken) => dispatch(loadCardsAction(listId, boardId, idToken)),
        loadCurrentBoard: (boardId, token) => dispatch(loadCurrentBoardAction(boardId, token)),
        loadCurrentBoardList: (boardId, idToken) => dispatch(loadCurrentBoardListAction(boardId, idToken)),
        addCurrentBoardList: (list) => dispatch(addCurrentBoardlistAction(list)),
        addCurrentBoardCard: (data, listId) => dispatch(addCurrentBoardCardAction(data, listId))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)

