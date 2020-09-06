

import React from "react"
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Modal from "react-modal";
import history from '../../history'
import { connect } from "react-redux"
import createBoardAction from "../../redux/actions/createBoardAction"


import {
  Button,
  Container,
  Row
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
    if (this.state.inputValue.length > 0) {
      this.props.createBoard(this.state.inputValue)
      history.push(`/board-page/${this.state.inputValue}`)
    }
    else {
      alert("please add a board name")
      this.setState({ modalIsOpen: true })
    }
  }

  goToBoard = (boardTitle) => {
    history.push(`/board-page/${boardTitle}`)
  }

  render() {
    const { boards } = this.props
    return (
      <div>
        <DemoNavbar />
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
        <section className="section section-lg section-shaped">

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
              </Row>
              <Row>
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
        <Row className="py-lg-md d-flex">
                {boards.length > 0 ?
                  boards.map((board, i) => {
                    return <button key={i} onCLick={() => this.goToBoard(board.boardTitle)}>{board.boardTitle}</button>
                  }) :
                  null
                }
              </Row>

      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    boards: state.boards
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createBoard: (boardTitle) => dispatch(createBoardAction(boardTitle))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);