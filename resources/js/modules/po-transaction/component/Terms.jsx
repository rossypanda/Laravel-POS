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
                <Form.Group as={Col} >
                    <Form.Control {...props.terms} placeholder="Terms" />
                </Form.Group>
                <Form.Group as={Col} xs={3} >
                    <Form.Control  {...props.termsDescription} placeholder="Description"  />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Control {...props.termsDue}  placeholder="Due Date" />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Control {...props.termsBank} placeholder="Type of Bank" />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Control {...props.termsPercent} placeholder="%" />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Control {...props.termsAmount} placeholder="Amount" />
                </Form.Group>
            </Form.Row>
            
        </div>
    );
}

export default Terms;
