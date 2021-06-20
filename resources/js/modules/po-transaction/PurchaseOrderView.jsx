
import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col,Form,Badge} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye,faCheck,faUserTag,faPlusCircle,faBan,faThList,faMoneyCheck,faCartPlus} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm,useFieldArray,useWatch} from "react-hook-form";
import { data } from 'jquery';

function PurchaseOrderView(props) {
    const [header,setHeader] = useState([]);
    const [detail,setDetail] = useState([]);
    const [supplier,setSupplier] = useState([]);
    const [terms,setTerms] = useState([]);
    const [users,setUsers] = useState([]);
    const PO_STATUS = {'F' :'Pending','A':'Approved','C': 'Cancelled'};
    const VARIANT = {'F' :'warning','A':'success','C': 'danger'};
    const PAYMENT_TYPE = {'C' :'Cash','H':'Check'};
    const fetchPoData =  async () => {
        await axios
         .get(`/fetch/purchase_order/${props.tsid}}`, {
     
         })
         .then((response) => {
             //get the object of supplier data to load to a table
             setHeader(response.data.po_header[0]);
             setDetail(response.data.po_detail);
             setSupplier(response.data.supplier);
             setTerms(response.data.terms);
             setUsers(response.data.users);
         })
         .catch((err) => {
             alert(err);
         });
    }

    const calculateTotalAmount = () => {
        let total = 0;
        detail.map((data,index) => {
            if(data.status == 0){
                total= total + (data.quantity * data.per_unit)
            }
        })
        return total;
    }

     useEffect(() => {
        fetchPoData();
    },[]);
  
    return (    

        <div>
             {<Container fluid>
                <Card className="border-wrapper">
                    <Card.Body>
                        <h4 className="mb-4" style={{display:'inline-block'}}><FontAwesomeIcon icon={faMoneyCheck} className="icon-space"/>PO# {header.po_number}</h4>
                        <Badge variant={VARIANT[header.status]} className="badge-wrapper" style={{marginLeft:"1rem"}}>{PO_STATUS[header.status]}</Badge>{' '}
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="supplier">
                                    <Form.Label>Supplier</Form.Label>
                                    <Form.Control size="sm" as="select" value={header.supplier_id} readOnly>
                                        <option value=''>Select Supplier</option>
                                        {supplier.map((data,index) => (
                                             <option key={index} value={data.supplier_id}>{data.supplier}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="payment_type">
                                    <Form.Label>Payment Type</Form.Label>
                                    <Form.Control size="sm" as="select" value={header.payment_type} readOnly>
                                        <option value=''>Select Payment Type</option>
                                        <option value='C'>Cash</option>
                                        <option  value='H'>Check</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            
                           <Form.Group controlId="supplier_address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="Supplier Address" value={header.supplier_address} readOnly/>
                            </Form.Group>
                            <fieldset className="fieldset-wrapper" >
                                    <legend className="legend-wrapper"><h6>Items</h6></legend>
                            <Container className="item-wrapper" fluid>
                                {detail.map((data,index) => (
                                    <Form.Row key={index}>
                                        <Form.Group as={Col} xs={1} >
                                            <Form.Control style={{borderColor: data.status != 0 ? "red" : "e9ecef"}} type="number"  placeholder="QTY" value={data.quantity} readOnly/>
                                        </Form.Group>
                                        <Form.Group as={Col} xs={1} >
                                            <Form.Control  style={{borderColor: data.status != 0 ? "red" : "e9ecef"}} placeholder="Unit" value={data.unit} readOnly/>
                                        </Form.Group>
                                        <Form.Group as={Col} xs={3}>
                                            <Form.Control  style={{borderColor: data.status != 0 ? "red" : "e9ecef"}} placeholder="Item Desc" value={data.item} readOnly/>
                                        </Form.Group>
                                        <Form.Group as={Col} xs={2} >
                                            <Form.Control  style={{borderColor: data.status != 0 ? "red" : "e9ecef"}}   placeholder="Brand" value={data.brand} readOnly/>
                                        </Form.Group>
                                        <Form.Group as={Col} xs={2} >
                                             <Form.Control  style={{borderColor: data.status != 0 ? "red" : "e9ecef"}}   placeholder="Model" value={data.model} readOnly/>
                                        </Form.Group >
                                        <Form.Group as={Col} xs={1} >
                                            <Form.Control  style={{borderColor: data.status != 0 ? "red" : "e9ecef"}} type="number"  placeholder="Per Unit"  value={data.per_unit} readOnly/>
                                        </Form.Group>
                                        <Form.Group as={Col} xs={1} >
                                            <Form.Control  style={{borderColor: data.status != 0 ? "red" : "e9ecef"}} type="number"  placeholder="Price"  value={data.quantity * data.per_unit} readOnly/>
                                        </Form.Group>
                                    </Form.Row>
                                ))}
                                <Form.Row xs={1} className="flex-row-reverse">
                                    <div style={{marginRight:'8rem'}} id="amount-span">
                                        <Badge style={{borderRadius:'0',padding:'0.5rem',fontSize:'0.9em'}} variant="info">Total: {calculateTotalAmount()} </Badge>
                                    </div>
                                </Form.Row>
                             </Container>
                            </fieldset>

                             { 
                               header.payment_type === 'H' && (
        
                                <fieldset className="fieldset-wrapper" >
                                    <legend className="legend-wrapper"><h6>Terms</h6></legend>
                                    {terms.map((data,index) => (
                                        <Form.Row key={index}>
                                            <Form.Group as={Col} >
                                                <Form.Control  placeholder="Terms" value={data.terms} readOnly />
                                            </Form.Group>
                                            <Form.Group as={Col} xs={3} >
                                                <Form.Control  placeholder="Description" value={data.terms_description} readOnly />
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Form.Control   placeholder="Due" value={data.terms_due} readOnly />
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Form.Control  placeholder="Type of Bank"  value={data.terms_bank} readOnly />
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Form.Control  placeholder="%" value={data.terms_percent} readOnly />
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Form.Control  placeholder="Amount" value={data.terms_amount} readOnly />
                                            </Form.Group>
                                        </Form.Row>
                                    ))}
                                </fieldset>
                               )
                            }
 
                             <Form.Row>
                                <Form.Group as={Col} controlId="project_name">
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control  placeholder="Project Name" value={header.project_name} readOnly />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="requested_by">
                                    <Form.Label>Requested By</Form.Label>
                                    <Form.Control size="sm" value={header.requested_by} readOnly >
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="canvassed_by">
                                    <Form.Label>Canvassed By</Form.Label>
                                    <Form.Control size="sm" value={header.canvassed_by} readOnly >
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="encoded_by">
                                    <Form.Label>Encoded By</Form.Label>
                                    <Form.Control size="sm" as="select" value={header.encoded_by} readOnly >
                                        <option value=''> --  Encoded By --</option>
                                        {users.map((data,index) => (
                                             <option key={index} value={data.id}>{data.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="approved_by">
                                    <Form.Label>Approved By</Form.Label>
                                    <Form.Control size="sm" as="select" value={header.approved_by} readOnly >
                                        <option value=''> -- Approved By --</option>
                                        {users.map((data,index) => (
                                             <option key={index} value={data.id}>{data.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                       
                    </Card.Body>
                </Card>
            </Container> }
        </div>
    );
}

export default PurchaseOrderView;

if (document.getElementById('view-po')) {
    const element = document.getElementById('view-po')
      
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<PurchaseOrderView {...props}/>, document.getElementById('view-po'));
}
