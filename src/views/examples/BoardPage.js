

import React from "react";
import "tachyons"
import Modal from "react-modal"
import { Button, Spinner } from "reactstrap"
import CardList from "./CardList"
import Card from "./Card"
import "../../style.css"
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
import updateListTitleAction from "../../redux/actions/updateListTitleAction"
import updateCardContentAction from "../../redux/actions/updateCardContentAction"
import "pattern.css";
import 'bootstrap/dist/css/bootstrap.css';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import updateListAction from "../../redux/actions/updateListAction";
import deleteCardFromPreviousListAction from "../../redux/actions/deleteCardFromPreviousListAction"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';




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
                isAddCardOpen: false,
            },
            editCardMode: {
                cardId: null,
                isEditCardOpen: false
            },
            newCardContent: '',
            dropDownOpen: false,
            lists: {}

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
            <Button variant="primary" className="addCardButton" onClick={this.changeEditMode}>X</Button>
            <Button variant="primary" className="cancelButton" onClick={this.updateComponentValue}>✔</Button>
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


    closeCardModal = (i) => {
        this.setState(prevState => ({
            addCardMode: {                   // object that we want to update
                ...prevState.addCardMode,    // keep all other key-value pairs
                listId: i,
                isAddCardOpen: !prevState.addCardMode.isAddCardOpen
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
                    this.props.addCurrentBoardCard(data, this.props.currentBoard.lists[i].listid)
                    this.setState({ cardTitle: "" })
                })

            this.setState(prevState => ({
                addCardMode: {
                    ...prevState.addCardMode,
                    listId: i,
                    isAddCardOpen: !prevState.addCardMode.isAddCardOpen
                }
            }))
        }
        else {
            alert("enter card content")
            this.setState({ cardTitle: "" })
        }

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
                listEditMode: !prevState.listEdit.listEditMode,
            }
        }))
        if (this.state.newListTitle.length > 0) {
            const bodyContent = JSON.stringify({
                listId: listId,
                newTitle: this.state.newListTitle
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
                        this.props.updateListTitle(listId, data)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }

        this.setState({ newListTitle: '' })
    }

    onListTitleChange = (e) => {
        this.setState({ newListTitle: e.target.value })

    }

    openCardEditMode = (cardId) => {
        this.setState(prevState => ({
            editCardMode: {
                ...prevState.editCardMode,
                cardId: cardId,
                isEditCardOpen: !prevState.editCardMode.isEditCardOpen                       // update the value of specific key
            }
        }))

    }

    updateCard = (cardId) => {
        this.setState(prevState => ({
            editCardMode: {                   // object that we want to update
                ...prevState.editCardMode,    // keep all other key-value pairs
                cardId: cardId,
                isEditCardOpen: !prevState.editCardMode.isEditCardOpen                       // update the value of specific key
            }
        }))

        if (this.state.newCardContent.length > 0) {
            const bodyContent = JSON.stringify({
                cardId: cardId,
                newCardContent: this.state.newCardContent
            })

            fetch('http://localhost:3001/updateCardContent',
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
                        this.props.updateCardContent(cardId, data)
                        this.setState({ newCardContent: '' })
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    cardEditOnChange = (e) => {
        this.setState({ newCardContent: e.target.value })
    }


    openDropDown = () => {
        this.setState({ dropDownOpen: !this.state.dropDownOpen })
    }


    // ------------- Drag and Drop part 

    onDragEnd = (result, lists) => {
        console.log(lists)
        if (!result.destination) return;
        const { source, destination } = result;
        console.log("result " + JSON.stringify(result.source))
        if (source.droppableId !== destination.droppableId) {
            const sourceList = lists[source.droppableId];
            const destList = lists[destination.droppableId];
            const sourceCards = [...sourceList.cards];
            const destCards = [...destList.cards];
            const [removed] = sourceCards.splice(source.index, 1);
            destCards.splice(destination.index, 0, removed);
            let cardId = destCards[destination.index].cardid;

            const bodyContent = JSON.stringify({
                cardId: cardId,
                listId: destList.listid
            })

            fetch('http://localhost:3001/dragCard',
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
                        this.props.updateList(data)
                        this.props.deleteCardFromList(sourceList.listid, data)
                        Object.assign(this.state.lists, this.props.currentBoard.lists);
                    }
                })
                .catch(error => {
                    console.log(error)
                })


            this.setState({
                ...lists,
                [source.droppableId]: {
                    ...sourceList,
                    cards: sourceCards
                },
                [destination.droppableId]: {
                    ...destList,
                    cards: destCards
                }

            })
        } else {
            const list = lists[source.droppableId];
            const copiedCards = [...list.cards];
            const [removed] = copiedCards.splice(source.index, 1);
            copiedCards.splice(destination.index, 0, removed);
            this.setState({
                ...lists,
                [source.droppableId]: {
                    ...list,
                    cards: copiedCards
                }
            });
        }

    };





    render() {
        let lists = [];

        if (!this.props.isCurrentBoardListPending) {
            lists = this.props.currentBoard.lists;
            Object.assign(this.state.lists, this.props.currentBoard.lists);

            console.log("render  this.state.lists " + JSON.stringify(this.state.lists))
        }

        if (UserData.getToken()) {
            return (
                <>
                    <nav className="dt w-100 border-box ph5-ns b--white-10">
                        <a className="dtc v-mid mid-gray link dim w-25" href="#" title="Home">
                            <img src="http://tachyons.io/img/logo.jpg" className="dib w2 h2 br-100" alt="Site Name" />
                        </a>
                        <div className="dtc v-mid w-75 tr">
                            <a className="link dim white f6 f5-ns dib mr3 mr4-ns" href='/user-profile' title="Boards">Boards</a>
                            <a className="link dim white f6 f5-ns dib mr3 mr4-ns" href ='/landing-page' title="Home">Home</a>
                        </div>
                    </nav>
                    {/* <div className="board-header">
                    </div>    */}
                    <div className="board-header-btn mod-board-name">
                        {this.state.isInEditMode ?
                            this.renderEditView() :
                            this.renderDefaultView()
                        }
                    </div>
                    {/* </section> */}
                    <DndProvider backend={HTML5Backend}>
                        <DragDropContext onDragEnd={(result) => this.onDragEnd(result, this.state.lists)} >
                            <div className="board-canvas board pattern-dots-lg">
                                <div className="js-no-higher-edits js-list-sortable ">
                                    {this.props.isCurrentBoardListPending ?
                                        <div>
                                            <h1>Loading...</h1>
                                            <Spinner color="secondary" />
                                        </div> :
                                        lists.map((list, i) => {
                                            return <div className="list list-wrapper" >
                                                {this.state.listEdit.listEditMode && this.state.listEdit.listId === list.listid ?
                                                    <div>
                                                        <input
                                                            type="text"
                                                            defaultValue={list.listtitle}
                                                            ref="theTextInput"
                                                            onChange={this.onListTitleChange}
                                                            className="flist-name-input"
                                                        />
                                                        <Button variant="primary" className="addCardButton" onClick={() => this.changeListEditMode(list.listid)}>X</Button>
                                                        <Button variant="primary" className="cancelButton" onClick={() => this.updateListTitle(list.listid)}>✔</Button>
                                                    </div> :
                                                    <div>
                                                        <CardList
                                                            title={list.listtitle}
                                                            id={list.listid}
                                                            key={list.listid}
                                                            changeListEditMode={() => this.changeListEditMode(list.listid)}
                                                        // openCardModal={this.openCardModal}
                                                        />
                                                        {/* <Button variant="secondary" className="deleteButton" onClick={this.openDropDown}>X</Button> */}
                                                        {/* <Button id="UncontrolledPopover" type="top">
                                                        Delete List
                                                         </Button> */}
                                                        {/* <UncontrolledPopover placement="right" target="UncontrolledPopover">
                                                            <PopoverHeader>Popover Title</PopoverHeader>
                                                            <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                                                        </UncontrolledPopover> */}
                                                    </div>
                                                }
                                                <Droppable droppableId={i.toString()} key={list.listid} >
                                                    {(provided, snapshot) => (
                                                        <div className="list list-wrapper"
                                                            {...provided.droppableProps}
                                                            ref={provided.innerRef}
                                                            inputRef={React.createRef(null)}
                                                            style={{
                                                                background: snapshot.isDraggingOver
                                                                    ? "yellow"
                                                                    : null
                                                            }}
                                                        >
                                                            <div className="u-clearfix list-cards">

                                                                {
                                                                    list.cards.map((card, index) => {
                                                                        return <Draggable
                                                                            key={card.cardid}
                                                                            draggableId={card.cardid.toString()}
                                                                            index={index}
                                                                        >
                                                                            {(provided, snapshot) => (
                                                                                <div
                                                                                    // style={{
                                                                                    //     userSelect: "none",
                                                                                    //     margin: "0 0 8px 0",
                                                                                    //     minHeight: "50px",
                                                                                    //     backgroundColor: snapshot.isDragging
                                                                                    //         ? "#263B4A"
                                                                                    //         : "#456C86",
                                                                                    //     ...provided.draggableProps.style
                                                                                    // }}
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                >
                                                                                    {this.state.editCardMode.isEditCardOpen && this.state.editCardMode.cardId === card.cardid ?
                                                                                        <div>
                                                                                            <textarea
                                                                                                type="text"
                                                                                                defaultValue={card.cardcontent}
                                                                                                // ref="theTextInput"
                                                                                                onChange={this.cardEditOnChange}
                                                                                                className="add-item"
                                                                                            />
                                                                                            <Button variant="primary" className="addCardButton" onClick={() => this.openCardEditMode(card.cardid)}>X</Button>
                                                                                            <Button variant="primary" className="cancelButton" onClick={() => this.updateCard(card.cardid)}>✔</Button>
                                                                                        </div> :
                                                                                            <div
                                                                                                className="f5 lh-copy measure-narrow list-card"
                                                                                                id={card.cardId}
                                                                                                key={card.cardId}
                                                                                                onClick={() => this.openCardEditMode(card.cardid)}
                                                                                            >

                                                                                                {card.cardcontent}

                                                                                            </div>
                                                                                    }
                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    })}
                                                            </div>
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>

                                                {/* ==== */}
                                                {
                                                    this.state.addCardMode.isAddCardOpen && this.state.addCardMode.listId === i ?
                                                        <div>
                                                            <textarea
                                                                type="text"
                                                                placeholder="enter card title..."
                                                                onChange={this.cardTitleOnChange}
                                                                className="add-item"
                                                            />
                                                            <Button variant="primary" className="addCardButton" onClick={() => this.addCard(i)} type="submit">add card</Button>
                                                            <Button variant="secondary" className="cancelButton" onClick={() => this.closeCardModal(i)}>X</Button>
                                                        </div> :

                                                        <div className="card-composer-container js-card-composer-container dark-background-hover" onClick={() => this.closeCardModal(i)} type="submit">
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


                                                {/* ====== */}
                                            </div>


                                        })}



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
                        </DragDropContext>
                    </DndProvider>

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
        state: state,
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
        addCurrentBoardCard: (data, listId) => dispatch(addCurrentBoardCardAction(data, listId)),
        updateListTitle: (listId, data) => dispatch(updateListTitleAction(listId, data)),
        updateCardContent: (cardId, data) => dispatch(updateCardContentAction(cardId, data)),
        updateList: (data) => dispatch(updateListAction(data)),
        deleteCardFromList: (sourceListId, data) => dispatch(deleteCardFromPreviousListAction(sourceListId, data))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)

