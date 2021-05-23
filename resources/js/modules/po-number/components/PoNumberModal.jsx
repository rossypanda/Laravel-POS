import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col,Form,Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThList,faCheck,faWindowClose} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm } from "react-hook-form";

function PoNumberModal(props) {
    const [modalShow,setModalShow] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [alert,setAlert] = useState(null);
    const addNewPONumber = (data) => {
        axios
        .post('/poNumber', {
           data
        })
        .then((response) => {
            console.log(response);
            setAlert(  <Alert  variant="success">
             Succesfully Added
            </Alert>);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="modal-color">
          <Modal.Title id="contained-modal-title-vcenter">
            <FontAwesomeIcon icon={faThList} className="icon-space"/> Add PO Number
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert}
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="invoice-type">
                    <Form.Label>Invoice Type</Form.Label>
                    <Form.Control size="sm" as="select" {...register("invoiceType",{required:true})} isInvalid={errors.invoiceType} >
                        <option value=''>Select Type</option>
                        <option value='C'>Cash</option>
                        <option value='H'>Check</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">Invoice type is required</Form.Control.Feedback>
                </Form.Group>
            </Form.Row> 
            <Form.Row>
                <Form.Group as={Col} controlId="start-range">
                    <Form.Label>Start Range</Form.Label>
                    <Form.Control type="number" {...register("startRange",{required:true})} isInvalid={errors.startRange}/>
                    <Form.Control.Feedback type="invalid">Start range is required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="end-range">
                    <Form.Label>End Range</Form.Label>
                    <Form.Control type="number" {...register("endRange",{required:true})} isInvalid={errors.endRange}/>
                    <Form.Control.Feedback type="invalid">End range is required</Form.Control.Feedback>
                </Form.Group>
            </Form.Row> 
        </Form>
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="secondary" size="sm" onClick={props.onHide}>
            <FontAwesomeIcon icon={faWindowClose} className="icon-space" />Close
          </Button>
          <Button variant="success" size="sm" onClick={handleSubmit(addNewPONumber)}>
            <FontAwesomeIcon icon={faCheck} className="icon-space" />Save Changes
          </Button>
          
        </Modal.Footer>
      </Modal>
      
    );
}

export default PoNumberModal;