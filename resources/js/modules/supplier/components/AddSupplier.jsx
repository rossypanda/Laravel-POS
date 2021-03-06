import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col,Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye,faCheck,faUserTag,faPlusCircle,faBan} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm } from "react-hook-form";
import baseUrl from '../helpers/BaseUrl';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

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
    const [customAlert, setCustomAlert] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
   

    const buttonStyle ={
        display:"flex",
        justifyContent:"flex-end",
        marginBottom:"1rem"
    };

    const hideAlert = () => {
        setCustomAlert(null)
        hideTableShowAddSupplier(false)
    }
    
    const onSubmit = (data) => {
        axios
        .post('/supplier', {
           data
        })
        .then((response) => {
            console.log(response);
                setCustomAlert(<SweetAlert
                success
                title="Success!"
                onConfirm={() =>hideAlert()}
                >
                New Supplier Added
                </SweetAlert>);
        })
        .catch((err) => {
            console.log(err);
        });
    }

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
                {customAlert}
                <Card className="border-wrapper">
                    <Card.Body>
                        <h4 className="mb-4"><FontAwesomeIcon icon={faUserTag} className="icon-space"/>Add Supplier</h4>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="supplier">
                                    <Form.Label>Supplier</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Supplier" {...register("supplier",{required:true})} isInvalid={errors.supplier} />
                                    <Form.Control.Feedback type="invalid">Supplier is required</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="contact-person">
                                    <Form.Label>Contact Person</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Contact Person" {...register("contactPerson",{required:true})} isInvalid={errors.contactPerson} />
                                    <Form.Control.Feedback type="invalid">Contact person is required</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            
                            <Form.Group controlId="supplier-address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="Supplier Address" {...register("address",{required:true})} isInvalid={errors.address}/>
                                <Form.Control.Feedback type="invalid">Address is required</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="supplier-email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control  placeholder="Supplier email" {...register("email")} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="supplier-number">
                                    <Form.Label>Number</Form.Label>
                                    <Form.Control placeholder="Supplier number" {...register("number")} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="supplier-fax">
                                    <Form.Label>Fax No.</Form.Label>
                                    <Form.Control placeholder="Supplier Fax" {...register("fax")}/>
                                </Form.Group>

                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="supplier-bank">
                                    <Form.Label>Bank Account</Form.Label>
                                    <Form.Control placeholder="Supplier bank account" {...register("bank")}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="supplier-description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control placeholder="Optional" {...register("description")}/>
                                </Form.Group>
                            </Form.Row>

                        </Form>
                        <div style={buttonStyle}>
                            <Button variant="success" size="sm" style={{marginRight:"0.5rem"}} onClick={handleSubmit(onSubmit)} >
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
