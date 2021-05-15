import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col,Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye,faCheck,faUserTag,faPlusCircle,faBan,faThList,faMoneyCheck,faCartPlus} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm,useFieldArray} from "react-hook-form";
import Items from './Items';
import Terms from './Terms';



function CreatePurchaseOrder() {
    const { control,register,handleSubmit, watch, formState: { errors } } = useForm();
    const { fields: itemFields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "items", // unique name for your Field Array
        // keyName: "id", default to "id", you can change the key name
    });
    

    const [items,setItems] = useState([]);




    
    const addItems = (item) => {
        //Do something here
        setItems([...items,{...item}])
    }

    const removeItems = (removeItems) => {
        //Do something here
      setItems(
        items.filter((item) => item !== removeItems)
      )
    }

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
                                <Form.Group as={Col} controlId="payment_type">
                                    <Form.Label>Payment Type</Form.Label>
                                    <Form.Control size="sm" as="select" {...register("payment_type",{required:true})} isInvalid={errors.invoiceType} >
                                        <option value=''>Select Payment Type</option>
                                        <option value='C'>Cash</option>
                                        <option value='H'>Check</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">Payment type is required</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            
                            <Form.Group controlId="supplier_address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="Supplier Address" {...register("address",{required:true})} isInvalid={errors.address}/>
                                <Form.Control.Feedback type="invalid">Address is required</Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="info" size="sm" style={{marginRight:"0.5rem"}} onClick={() => append({})}>
                                <FontAwesomeIcon icon={faCartPlus} className="icon-space" />
                                Add Items
                            </Button>
                            <Container className="item-wrapper" fluid>
                                {itemFields.map(({id},index) => (
                                    <Items key={id} 
                                    onClick={() => remove(index)}
                                    quantityName={{...register(`items[${index}].quantity`)}}
                                    unitName={{...register(`items[${index}].unit`)}}
                                    descName={{...register(`items[${index}].description`)}}
                                    brandName={{...register(`items[${index}].brand`)}}
                                    modelName={{...register(`items[${index}].model`)}}
                                    perUnitName={{...register(`items[${index}].per_unit`)}}
                                    amountName={{...register(`items[${index}].amount`)}}
                                    />
                                ))}
                             </Container>
                             <Terms />
                            <Form.Row>
                                <Form.Group as={Col} controlId="requested_by">
                                    <Form.Label>Requested</Form.Label>
                                    <Form.Control  placeholder="Requested By" {...register("requested_by")} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="canvassed_by">
                                    <Form.Label>Canvassed By</Form.Label>
                                    <Form.Control placeholder="Canvassed by" {...register("canvassed_by")} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="approved_by">
                                    <Form.Label>Approved By</Form.Label>
                                    <Form.Control placeholder="approved_by" {...register("Approved By")}/>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                        <div >
                            
                        </div>
                       
                        <Button variant="success" size="sm" style={{marginRight:"0.5rem"}} onClick={handleSubmit(console.log)}>
                            <FontAwesomeIcon icon={faPlusSquare} className="icon-space" />
                                Create Purchase Order
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default CreatePurchaseOrder;
