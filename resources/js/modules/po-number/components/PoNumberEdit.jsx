import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col,Form,Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThList,faCheck,faWindowClose} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm } from "react-hook-form";

function PoNumberEdit(props) {
    const [modalShow,setModalShow] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [alert,setAlert] = useState(null);
    const [range,setRange] = useState(null);
    
    const updatePONumber = (end_range) => {
        axios
        .patch(`/poNumber/${props.id}`, {
           end_range: range
        })
        .then((response) => {
            console.log(response);
            setAlert(  <Alert  variant="success">
             Succesfully Updated
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
            <FontAwesomeIcon icon={faThList} className="icon-space"/> Edit PO Number
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert}
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="end-range">
                    <Form.Label>End Range</Form.Label>
                    <Form.Control type="number" {...register("end_range", { required: true, min: props.range + 1 })} defaultValue={props.range} isInvalid={errors.end_range} onChange={(e) => setRange(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">Should be higher than the current range</Form.Control.Feedback>
                </Form.Group>
            </Form.Row> 
        </Form>
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="secondary" size="sm" onClick={props.onHide}>
            <FontAwesomeIcon icon={faWindowClose} className="icon-space" />Close
          </Button>
          <Button variant="success" size="sm" onClick={() => updatePONumber()}>
            <FontAwesomeIcon icon={faCheck} className="icon-space" />Save Changes
          </Button>
          
        </Modal.Footer>
      </Modal>
      
    );
}

export default PoNumberEdit;