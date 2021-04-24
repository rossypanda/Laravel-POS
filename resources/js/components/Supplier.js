import React from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye,faCheck,faUserTag,faPlusCircle,faBan} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="modal-color">
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
        <Modal.Footer className="modal-color">
         
          <Button variant="success" size="sm" onClick={props.onHide}>
            <FontAwesomeIcon icon={faCheck} className="icon-space" />Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
}


function Supplier() {
    const [modalShow, setModalShow] = React.useState(false);
    const [hideAddSupplier, setHideAddSupplier] = React.useState(true);
    const [hideSupplierTable, setHideAddSupplierTable] = React.useState(false);
   

    const buttonStyle ={
        display:"flex",
        justifyContent:"flex-end",
        marginBottom:"1rem"
    };


   const hideTableShowAddSupplier = (isCurrentlyHidden) => {
        if(isCurrentlyHidden){
            setHideAddSupplier(false);
            setHideAddSupplierTable(true);
        }
        else{
            setHideAddSupplier(true);
            setHideAddSupplierTable(false);
        }
        
    }
    
    return (
        
        <div>
            <Container fluid hidden={hideSupplierTable}>
                <div style={buttonStyle}>
                    <Button variant="success" size="sm" style={{marginRight:"0.5rem"}} onClick={() =>hideTableShowAddSupplier(true)}>
                        <FontAwesomeIcon icon={faPlusSquare} className="icon-space" />
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
                            <Button variant="outline-info" size="sm" onClick={() => setModalShow(true)}>
                            <FontAwesomeIcon icon={faEye} className="icon-space"/>View</Button>
                            <Button variant="outline-danger" size="sm">
                                <FontAwesomeIcon icon={faTrashAlt}  className="icon-space" />Delete
                            </Button>
                        </td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Mcdonalds</td>
                        <td>163</td>
                        <td>jcdo@jolibee.com</td>
                        <td> 
                            <Button variant="outline-info" size="sm" onClick={() => setModalShow(true)}>
                            <FontAwesomeIcon icon={faEye} className="icon-space"/>View</Button>
                            <Button variant="outline-danger" size="sm">
                                <FontAwesomeIcon icon={faTrashAlt} className="icon-space"/>Delete
                            </Button>
                        </td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Grab</td>
                        <td>123</td>
                        <td>Grab@gmail.com</td>
                        <td> 
                            <Button variant="outline-info" size="sm" onClick={() => setModalShow(true)}>
                            <FontAwesomeIcon icon={faEye} className="icon-space"/>View</Button>
                            <Button variant="outline-danger" size="sm">
                                <FontAwesomeIcon icon={faTrashAlt} className="icon-space"/>Delete
                            </Button>
                        </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>

            <Container fluid hidden={hideAddSupplier}>
                <Card className="border-wrapper">
                    <Card.Body>
                        <h4 className="mb-4"><FontAwesomeIcon icon={faUserTag} className="icon-space"/>Add Supplier</h4>
                        <Row>
                            <Col> 
                                <InputGroup  className="mb-3">
                                    <InputGroup.Prepend className="background-wrapper">
                                        <InputGroup.Text id="inputGroup-sizing-sm" >Supplier</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" className="border-wrapper" />
                                </InputGroup>
                            </Col>
                            <Col> 
                                <InputGroup  className="mb-3">
                                    <InputGroup.Prepend className="background-wrapper">
                                        <InputGroup.Text id="inputGroup-sizing-sm" >Address</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" className="border-wrapper" />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col> 
                                <InputGroup  className="mb-3">
                                    <InputGroup.Prepend className="background-wrapper">
                                        <InputGroup.Text id="inputGroup-sizing-sm" >Zip Code</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" className="border-wrapper" />
                                </InputGroup>
                            </Col>
                            <Col> 
                                <InputGroup  className="mb-3">
                                    <InputGroup.Prepend className="background-wrapper">
                                        <InputGroup.Text id="inputGroup-sizing-sm" >Contact #</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" className="border-wrapper" />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col> 
                                <InputGroup  className="mb-3">
                                    <InputGroup.Prepend className="background-wrapper">
                                        <InputGroup.Text id="inputGroup-sizing-sm" >Email</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" className="border-wrapper" />
                                </InputGroup>
                            </Col>
                            <Col> 
                                <InputGroup  className="mb-3">
                                    <InputGroup.Prepend className="background-wrapper">
                                        <InputGroup.Text id="inputGroup-sizing-sm" >Fax #</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" className="border-wrapper" />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col> 
                                <InputGroup  className="mb-3">
                                    <InputGroup.Prepend className="background-wrapper">
                                        <InputGroup.Text id="inputGroup-sizing-sm" >Terms</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" className="border-wrapper" />
                                </InputGroup>
                            </Col>
                            <Col> 
                                <InputGroup  className="mb-3">
                                    <InputGroup.Prepend className="background-wrapper">
                                        <InputGroup.Text id="inputGroup-sizing-sm" >Description</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" className="border-wrapper" />
                                </InputGroup>
                            </Col>
                        </Row>
                        <div style={buttonStyle}>
                            <Button variant="success" size="sm" style={{marginRight:"0.5rem"}} >
                            <FontAwesomeIcon icon={faPlusCircle} className="icon-space" />
                             Add    
                            </Button>
                            <Button variant="danger" size="sm" style={{marginRight:"0.5rem"}} onClick={() =>hideTableShowAddSupplier(false)} >
                            <FontAwesomeIcon icon={faBan} className="icon-space"/>
                                Cancel
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
       
    );
}

export default Supplier;

if (document.getElementById('supplier')) {
    ReactDOM.render(<Supplier />, document.getElementById('supplier'));
}
