import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col,Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye,faCheck,faUserTag,faPlusCircle,faBan,faThList,faMoneyCheck,faCartPlus} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm,useFieldArray } from "react-hook-form";



function Terms(props) {



    return (
      <div>
           <Form.Row>
                <Form.Group as={Col} controlId="terms">
                    <Form.Label>Terms</Form.Label>
                    <Form.Control  placeholder="Terms" />
                </Form.Group>
                <Form.Group as={Col} controlId="terms_description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control placeholder="Canvassed by"  />
                </Form.Group>
                <Form.Group as={Col} controlId="terms_due">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control placeholder="approved_by" />
                </Form.Group>
                <Form.Group as={Col} controlId="terms_bank">
                    <Form.Label>Type Of Bank</Form.Label>
                    <Form.Control placeholder="approved_by" />
                </Form.Group>
                <Form.Group as={Col} controlId="terms_percentage">
                    <Form.Label>%</Form.Label>
                    <Form.Control placeholder="%" />
                </Form.Group>
                <Form.Group as={Col} controlId="terms_amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control placeholder="%" />
                </Form.Group>
            </Form.Row>
            
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Control />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Control />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Control />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Control />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Control />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Control />
                </Form.Group>
            </Form.Row>
        </div>
    );
}

export default Terms;
