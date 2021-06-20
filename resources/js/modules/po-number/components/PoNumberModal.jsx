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
            if(response.data){
            setAlert(  <Alert  variant="success">
             Succesfully Added
            </Alert>);
            props.fetchData();
            }else{
              setAlert(  <Alert  variant="danger">
              There is a current open PO
             </Alert>);
            }
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
                <Form.Group as={Col} controlId="start-range">
                    <Form.Label>Start Range</Form.Label>
                    <Form.Control type="number" {...register("startRange",{required:true})} isInvalid={errors.startRange} value={props.range}/>
                    <Form.Control.Feedback type="invalid">Start range is required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="end-range">
                    <Form.Label>End Range</Form.Label>
                    <Form.Control type="number" {...register("endRange",{required:true,min:Number(props.range) + 1})} isInvalid={errors.endRange}/>
                    <Form.Control.Feedback type="invalid">End range is required / Should be greater than start range</Form.Control.Feedback>
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