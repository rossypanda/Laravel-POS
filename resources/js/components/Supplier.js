import React from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye} from '@fortawesome/free-solid-svg-icons';

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

function Supplier() {
    const buttonStyle ={
        display:"flex",
        justifyContent:"flex-end",
        marginBottom:"1rem"
    };
    return (
        
        <div>
            <Container fluid>
                <div style={buttonStyle}>
                    <Button variant="success" size="sm" style={{marginRight:"0.5rem"}}>
                        <FontAwesomeIcon icon={faPlusSquare}/>
                        Add Supplier   
                    </Button>
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Supplier ID</th>
                        <th>Supplier</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Jollibee</td>
                        <td>69</td>
                        <td>jabee@manamit.com</td>
                        <td> 
                            <Button variant="outline-info" size="sm">
                            <FontAwesomeIcon icon={faEye}/>View</Button>
                            <Button variant="outline-danger" size="sm">
                                <FontAwesomeIcon icon={faTrashAlt}/>Delete
                            </Button>
                        </td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Mcdonalds</td>
                        <td>163</td>
                        <td>jcdo@jolibee.com</td>
                        <td> 
                            <Button variant="outline-info" size="sm">
                            <FontAwesomeIcon icon={faEye}/>View</Button>
                            <Button variant="outline-danger" size="sm">
                                <FontAwesomeIcon icon={faTrashAlt}/>Delete
                            </Button>
                        </td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Grab</td>
                        <td>123</td>
                        <td>Grab@gmail.com</td>
                        <td> 
                            <Button variant="outline-info" size="sm">
                            <FontAwesomeIcon icon={faEye}/>View</Button>
                            <Button variant="outline-danger" size="sm">
                                <FontAwesomeIcon icon={faTrashAlt}/>Delete
                            </Button>
                        </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
       
    );
}

export default Supplier;

if (document.getElementById('supplier')) {
    ReactDOM.render(<Supplier />, document.getElementById('supplier'));
}
