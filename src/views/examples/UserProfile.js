

import React from "react"
import "tachyons"
import Modal from "react-modal";
import history from '../../history'
import { connect } from "react-redux"
import createBoardAction from "../../redux/actions/createBoardAction"
import "../../style.css"
import { Redirect } from "react-router-dom"
import loadBoardsAction from "../../redux/actions/loadBoardsAction"
import Scroll from "./Scroll"
import { Spinner } from 'reactstrap';



import {
  Button,
  Container,
  Row,
  Card,
  Col
} from "reactstrap";


// import Modal from 'react-bootstrap/Modal'


Modal.setAppElement("#root")

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      setModalIsOpen: true,
      inputValue: "",
      user: {
        id: "",
        name: ""
      }
    }
  }

  componentDidMount() {
      this.props.loadBoards(this.props.user.userId, this.props.user.idToken);
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  inputOnChange = (event) => {
    this.setState({ inputValue: event.target.value })
  }


  handleClick = () => {
    this.setState({ modalIsOpen: false })
    let bodyContent = JSON.stringify({
      boardTitle: this.state.inputValue,
      userId: this.props.user.userId
    })

    if (this.state.inputValue.length > 0) {
      fetch('http://localhost:3001/createBoard',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": this.props.user.idToken
          },
          body: bodyContent
        })
        .then(response => {
          return response.json()
        })
        .then(data => {
          if (data) {
            this.props.createBoard(data.boardname, data.boardid)
            history.push(`/board-page/${data.boardid}`)
          }
          else {
            alert("failed to create a board")
          }
        })
    }
    else {
      alert("please add a board name")
      this.setState({ modalIsOpen: true })
    }

  }



  goToBoard = (boardId) => {
    history.push(`/board-page/${boardId}`)
  }

  render() {
    const { boards } = this.props
    if (this.props.user.userId) {
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
          {/* <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div> */}
          <div className = "boardTitle">Welcome {this.props.user.userName} </div>
          <section className="section section-lg">

            <Container className="py-lg-md d-flex" >
              <div className="col px-0">
                <Row>
                  <main ref="main">
                    <div className="position-relative">
                      {/* shape Hero */}
                    </div>
                  </main>
                  <Button variant="primary" onClick={this.openModal}>
                    + Create a board
                </Button>


                  <Modal isOpen={this.state.modalIsOpen} onHide={this.closeModal} className="center mw5 mw6-ns hidden ba mv4 pa3 bt">
                    {/* <h2>Board title</h2> */}
                    <input
                      id="name"
                      className="input-reset ba b--black-20 pa2 mb2 db w-100"
                      type="text" aria-describedby="name-desc"
                      placeholder="Board title"
                      onChange={this.inputOnChange}
                    />
                    <p>Board body</p>
                    <Button variant="primary" onClick={this.closeModal}>
                      Close
                  </Button>
                    <Button variant="primary" onClick={this.handleClick}>
                      Create a board
                </Button>
                  </Modal>
                </Row>
              </div>
            </Container>
          </section>
          
          {this.props.isBoardsPending?
          <div>
            <h1>Loading</h1>
            <Spinner color="warning" />
          </div>
          :
          <Scroll>
             <Row className ="cardContainer">
               
          {boards.length > 0 ?
            boards.map((board, i) => {
              return (
                <Card className="text-center cardImg cards cardTitle" key={i} onClick={() => this.goToBoard(board.boardId)}>
                  {board.boardTitle}
                </Card>
              )
            }) :
            null
          }
        </Row>
        </Scroll> 
          }     
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

const mapStateToProps = (state) => {
  return {
    boards: state.boards,
    user: state.user,
    isBoardsPending: state.isBoardsPending,
    boardsLoadError: state.boardsLoadError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createBoard: (boardTitle, boardId) => dispatch(createBoardAction(boardTitle, boardId)),
    loadBoards: (userId, idToken) => dispatch(loadBoardsAction(userId, idToken))
    // loadCards:(listId, boardId, idToken) =>dispatch(loadCardsAction(listId,boardId, idToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);