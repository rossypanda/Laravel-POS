import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col,Form,Badge} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye,faCheck,faUserTag,faPlusCircle,faBan,faThList,faMoneyCheck,faCartPlus} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm,useFieldArray,useWatch} from "react-hook-form";
import Items from './Items';
import Terms from './Terms';
import SweetAlert from 'react-bootstrap-sweetalert';
import Select from 'react-select';




function CreatePurchaseOrder() {
    const { register,control,handleSubmit, watch,reset,setValue, formState: { errors } } = useForm();
    const watchPaymentType = watch("payment_type", 'C');
    const [supplier,setSupplier] = useState([]);
    const [users,setUsers] = useState([]);
    const [supplierId,setSupplierId] = useState(null);
    const { fields: itemFields, append:appendItem, remove:removeItem} = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "items", // unique name for your Field Array
        // keyName: "id", default to "id", you can change the key name
    });
    const { fields: termFields, append:appendTerms, remove:removeTerms} = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "terms", // unique name for your Field Array
        // keyName: "id", default to "id", you can change the key name
    });
    const [customAlert, setCustomAlert] = useState(null);
    window.supplierAddress;
    window.totalAmount;

    const fetchPODropdown =  async () => {
        await axios
         .get('/fetch/po_dropdown', {
     
         })
         .then((response) => {
            console.log(response.data);
            window.supplierAddress = response.data.supplier_address;
            setSupplier(response.data.supplier);
            setUsers(response.data.user)
           
         })
         .catch((err) => {
             console.log(err);
         });
     }

    
    useEffect(() => {
        appendItem({});
        appendTerms([0,1]);
        fetchPODropdown();
    },[]);

      
    const onSubmit = (data,e) => {
        axios
        .post('/purchaseOrder', {
           data:data,
           supplier : supplierId
        })
        .then((response) => {
            console.log(response.data);
           if(!response.data){
            setCustomAlert(
                <SweetAlert danger title="Oops!" onConfirm={() => setCustomAlert(null)} >
                    There are currently no open PO number
                </SweetAlert>
            );
           }else{
          reset({});
          appendItem({});
            setCustomAlert(
                <SweetAlert
                success
                title={`PO# ` + response.data }
                onConfirm={() =>setCustomAlert(null)}
                >
                Purchase Order Succesfully Created
                </SweetAlert>
            );
           }
        })
        .catch((err) => {
            //do something
        });
    }

    const PriceTotal =  ({control,register}) => {
        let totalPrice = 0;
        const value = useWatch({
            control,
            name:`items`,
            defaultValue:0 
        })
        if(typeof value !== 'undefined'){
            for(let x=0; x < value.length; x++){
                totalPrice = totalPrice + (Number(value[x].quantity) * Number(value[x].per_unit));
            }
        }
        
        return (
            <div style={{marginRight:'5rem'}} id="amount-span">
                    <Badge style={{borderRadius:'0',padding:'0.5rem',fontSize:'0.9em'}} variant="info">Total: {totalPrice}</Badge>
            </div>
        );
    }
    
    const PriceUnit =  ({control,index,register}) => {
        let unitPrice = 0;
        const value = useWatch({
            control,
            name:`items[${index}]`,
            defaultValue:0
        })
        if(typeof value !== 'undefined'){
            unitPrice = Number(value.quantity) * Number(value.per_unit);
        }
        return (
            <Form.Group as={Col} xs={1} >
                <Form.Control  placeholder="Amount"  value={isNaN(unitPrice) ? 0 : unitPrice} {...register} readOnly  />
            </Form.Group>
        );
    }

    const handleChange = (supplier_id) => {
        setSupplierId(supplier_id);
       setValue("address",window.supplierAddress[supplier_id]);
    }
    

    return (
        
        <div>
            {customAlert}
            <Container fluid>
                <Card className="border-wrapper">
                    <Card.Body>
                        <h4 className="mb-4"><FontAwesomeIcon icon={faMoneyCheck} className="icon-space"/>Create Purchase Order</h4>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="supplier">
                                    <Form.Label>Supplier*</Form.Label>
                                    <Select
                                        onChange={(e) => handleChange(e.value)}
                                        options={supplier}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="payment_type">
                                    <Form.Label>Payment Type*</Form.Label>
                                    <Form.Control size="sm" as="select" {...register("payment_type",{required:true})} isInvalid={errors.payment_type} >
                                        <option value=''>Select Payment Type</option>
                                        <option value='C'>Cash</option>
                                        <option value='H'>Check</option>
                                        <option value='A'>Cash/Check</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">Payment type is required</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            
                            <Form.Group controlId="supplier_address">
                                <Form.Label>Address*</Form.Label>
                                <Form.Control placeholder="Supplier Address"  {...register("address",{required:true})} />
                                <Form.Control.Feedback type="invalid">Address is required</Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="info" size="sm" style={{marginRight:"0.5rem"}} onClick={() => appendItem({})}>
                                <FontAwesomeIcon icon={faCartPlus} className="icon-space" />
                                Add Items
                            </Button>
                            <Container className="item-wrapper" fluid>
                                {itemFields.map(({id},index) => (
                                    <Form.Row key={id}>
                                        <Form.Group as={Col} xs={1} >
                                            <Form.Control type="number" {...register(`items[${index}].quantity`)} placeholder="QTY"/>
                                        </Form.Group>
                                        <Form.Group as={Col} xs={1} >
                                            <Form.Control {...register(`items[${index}].unit`)}  placeholder="Unit"/>
                                        </Form.Group>
                                        <Form.Group as={Col} xs={3}>
                                            <Form.Control  {...register(`items[${index}].description`)} placeholder="Item Desc"/>
                                        </Form.Group>
                                        <Form.Group as={Col} xs={2} >
                                            <Form.Control {...register(`items[${index}].brand`)}   placeholder="Brand" />
                                        </Form.Group>
                                        <Form.Group as={Col} xs={2} >
                                            <Form.Control {...register(`items[${index}].model`)} placeholder="Model"  />
                                        </Form.Group >
                                        <Form.Group as={Col} xs={1} >
                                            <Form.Control type="number" {...register(`items[${index}].per_unit`)} placeholder="Per Unit"  />
                                        </Form.Group>
                                        <PriceUnit type="number" control={control} index={index} register={{...register(`items[${index}].amount`)}} />
                                        <Form.Group as={Col} xs={1} >
                                            <Button variant="outline-danger" size="sm" onClick={() => removeItem(index)}>
                                                <FontAwesomeIcon icon={faTrashAlt} className="icon-space" />
                                            </Button>
                                        </Form.Group>
                                    </Form.Row>

            
                                ))}
                            <Form.Row xs={1} className="flex-row-reverse">
                               <PriceTotal control={control}/> 
                            </Form.Row>
                             </Container>

                             {
                               watchPaymentType === 'H' && (
        
                                <fieldset className="fieldset-wrapper" >
                                    <legend className="legend-wrapper"><h6>Terms</h6></legend>
                                    {termFields.map(({id},index) => (
                                        <Terms key={id} 
                                            terms={{...register(`terms[${index}].terms`)}}
                                            termsDescription={{...register(`terms[${index}].terms_description`)}}
                                            termsDue={{...register(`terms[${index}].terms_due`)}}
                                            termsBank={{...register(`terms[${index}].terms_bank`)}}
                                            termsPercent={{...register(`terms[${index}].terms_percent`)}}
                                            termsAmount={{...register(`terms[${index}].terms_amount`)}}
                                        />
                                    ))}
                                </fieldset>
                               )
                            }
                            {
                               watchPaymentType === 'A' && (
                                <div>
                                     <Form.Row>
                                        <Form.Group as={Col} controlId="money_received">
                                            <Form.Label>Money Received*</Form.Label>
                                            <Form.Control type="number" placeholder="Money Received" {...register("money_received",{required:true})} isInvalid={errors.money_received}/>
                                            <Form.Control.Feedback type="invalid">Money received is required</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <fieldset className="fieldset-wrapper" >
                                        <legend className="legend-wrapper"><h6>Terms</h6></legend>
                                        {termFields.map(({id},index) => (
                                            <Terms key={id} 
                                                terms={{...register(`terms[${index}].terms`)}}
                                                termsDescription={{...register(`terms[${index}].terms_description`)}}
                                                termsDue={{...register(`terms[${index}].terms_due`)}}
                                                termsBank={{...register(`terms[${index}].terms_bank`)}}
                                                termsPercent={{...register(`terms[${index}].terms_percent`)}}
                                                termsAmount={{...register(`terms[${index}].terms_amount`)}}
                                            />
                                        ))}
                                    </fieldset>
                                   
                                </div>
                               )
                            }

                             <Form.Row>
                                <Form.Group as={Col} controlId="project_name">
                                    <Form.Label>Project Name*</Form.Label>
                                    <Form.Control  placeholder="Project Name" {...register("project_name",{required:true})} isInvalid={errors.project_name}/>
                                    <Form.Control.Feedback type="invalid">Project name is required</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="requested_by">
                                    <Form.Label>Requested By*</Form.Label>
                                    <Form.Control size="sm" placeholder="Requested By" {...register("requested_by",{required:true})} isInvalid={errors.requested_by} />
                                    <Form.Control.Feedback type="invalid">Requested By is required</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="canvassed_by">
                                    <Form.Label>Canvassed By*</Form.Label>
                                    <Form.Control size="sm" placeholder="Canvassed By" {...register("canvassed_by",{required:true})} isInvalid={errors.canvassed_by} />
                                    <Form.Control.Feedback type="invalid">Canvassed By is required</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="project_name">
                                    <Form.Label>Description*</Form.Label>
                                    <Form.Control  placeholder="Description" {...register("description",{required:true})} isInvalid={errors.description}/>
                                    <Form.Control.Feedback type="invalid">Description is required</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                        <div >
                            
                        </div>
                       
                        <Button id="create" variant="success" size="sm" style={{marginRight:"0.5rem"}} onClick={handleSubmit(onSubmit)}>
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
