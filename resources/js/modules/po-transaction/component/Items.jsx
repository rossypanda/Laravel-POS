import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col,Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye,faCheck,faUserTag,faPlusCircle,faBan,faThList,faMoneyCheck,faCartPlus} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm,useFieldArray } from "react-hook-form";



function Items(props) {
const [amount,setAmount] = useState(0);
const [quantity,setQuantity] = useState(0);
const [perUnit,setPerUnit] = useState(0);


const handleChange = (value) => {
    setPerUnit(value);
    setAmount(
        Number(quantity) * Number(value) 
    );
}


const quantityChange = (value) => {
    setQuantity(value);
    setAmount(
        Number(value) * Number(perUnit) 
    );
}



    return (
      <div>
           <Form.Row>
                <Form.Group as={Col} xs={1} >
                    <Form.Control {...props.quantityName} placeholder="QTY" onChange={() => quantityChange(event.target.value)}   />
                </Form.Group>
                <Form.Group as={Col} xs={1} >
                    <Form.Control  placeholder="Unit"  {...props.unitName} />
                </Form.Group>
                <Form.Group as={Col} xs={3}>
                    <Form.Control  placeholder="Item Desc"  {...props.descName} />
                </Form.Group>
                <Form.Group as={Col} xs={2} >
                    <Form.Control  placeholder="Brand"  {...props.brandName} />
                </Form.Group>
                <Form.Group as={Col} xs={2} >
                    <Form.Control  placeholder="Model"  {...props.modelName} />
                </Form.Group >
                <Form.Group as={Col} xs={1} >
                    <Form.Control {...props.perUnitName} placeholder="Per Unit" onChange={() => handleChange(event.target.value)}  />
                </Form.Group>
                <Form.Group as={Col} xs={1} >
                    <Form.Control  {...props.amount} placeholder="Amount" readOnly value={amount}  />
                </Form.Group>
                <Form.Group as={Col}  >
                    <Button variant="outline-danger" size="sm" onClick={props.onClick}>
                        <FontAwesomeIcon icon={faTrashAlt} className="icon-space" />
                    </Button>
                </Form.Group>
            </Form.Row>
        </div>
    );
}

export default Items;
