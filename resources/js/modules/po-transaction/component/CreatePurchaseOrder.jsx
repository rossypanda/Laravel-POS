import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col,Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye,faCheck,faUserTag,faPlusCircle,faBan,faThList,faMoneyCheck} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm } from "react-hook-form";



function CreatePurchaseOrder() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();



    return (
        <div>
            <Container fluid >
                <Card className="border-wrapper">
                    <Card.Body>
                        <h4 className="mb-4"><FontAwesomeIcon icon={faMoneyCheck} className="icon-space"/>Create Purchase Order</h4>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="supplier">
                                    <Form.Label>Supplier</Form.Label>
                                    <Form.Control size="sm" as="select" {...register("invoiceType",{required:true})} isInvalid={errors.invoiceType} >
                                        <option value=''>Select Supplier</option>
                                        <option value='1'>Bacolod China Mart</option>
                                        <option value='2'>Bacolod Steel</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">Supplier is required</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="contact-person">
                                    <Form.Label>Contact Person</Form.Label>
                                    <Form.Control size="sm" as="select" {...register("invoiceType",{required:true})} isInvalid={errors.invoiceType} >
                                        <option value=''>Select Payment Type</option>
                                        <option value='C'>Cash</option>
                                        <option value='H'>Check</option>
                                    </Form.Control>
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
                        <div >
                            <Button variant="success" size="sm" style={{marginRight:"0.5rem"}}>
                            <FontAwesomeIcon icon={faPlusCircle} className="icon-space" />
                            Add    
                            </Button>
                            <Button variant="danger" size="sm" style={{marginRight:"0.5rem"}}>
                            <FontAwesomeIcon icon={faBan} className="icon-space"/>
                                Cancel
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default CreatePurchaseOrder;
