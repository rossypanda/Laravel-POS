import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col,Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye,faCheck,faUserTag,faPlusCircle,faBan,faThList,faMoneyCheck,faCartPlus} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm } from "react-hook-form";



function Items() {
    
    return (
      <div>
           <Form.Row>
                <Form.Group as={Col} xs={1} controlId="quantity">
                    <Form.Control  placeholder="QTY"/>
                </Form.Group>
                <Form.Group as={Col} xs={1} controlId="unit">
                    <Form.Control  placeholder="Unit"/>
                </Form.Group>
                <Form.Group as={Col} xs={3} controlId="item-description">
                    <Form.Control  placeholder="Item Desc"/>
                </Form.Group>
                <Form.Group as={Col} xs={2}  controlId="brand">
                    <Form.Control  placeholder="Brand"/>
                </Form.Group>
                <Form.Group as={Col} xs={2} controlId="model">
                    <Form.Control  placeholder="Model"/>
                </Form.Group >
                <Form.Group as={Col} xs={1} controlId="price">
                    <Form.Control  placeholder="Per Unit"/>
                </Form.Group>
                <Form.Group as={Col} xs={1} controlId="amount">
                    <Form.Control  placeholder="Amount" readOnly/>
                </Form.Group>
                <Form.Group as={Col}  controlId="test">
                    <Button variant="outline-danger" size="sm">
                        <FontAwesomeIcon icon={faTrashAlt} className="icon-space" />
                    </Button>
                </Form.Group>
        </Form.Row>
        </div>
    );
}

export default Items;
