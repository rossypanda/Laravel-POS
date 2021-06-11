import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col,Form,Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye,faCheck,faUserTag,faPlusCircle,faBan} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm } from "react-hook-form";
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import TagsInput from './components/TagsInput';
import Tags from './components/Tags';

function MyVerticallyCenteredModal(props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [tags,setTags] = useState([]);
    const selected = tags => setTags(tags);
    const updateSupplierData = (data) => {
        axios.patch(`/supplier/1}`,{data}).then(
            setAlert(  <Alert  variant="success">
            Data Updated
           </Alert>)
        );
    }
    const [alert,setAlert] = useState(null);
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="modal-color">
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {alert}
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="supplier-edit" hidden>
                    <Form.Label>Supplier</Form.Label>
                    <Form.Control type="text" placeholder="Enter Supplier" value={props.supplierId} {...register("supplier-id")} />
                </Form.Group>
                <Form.Group as={Col} controlId="supplier-edit">
                    <Form.Label>Supplier</Form.Label>
                    <Form.Control type="text" placeholder="Enter Supplier" defaultValue={props.supplier} {...register("supplier-edit")} />
                </Form.Group>
                <Form.Group as={Col} controlId="contact-person-edit">
                    <Form.Label>Contact Person</Form.Label>
                    <Form.Control type="text" placeholder="Enter Contact Person" defaultValue={props.contactPerson} {...register("contact-person-edit")} />
                </Form.Group>
            </Form.Row> 
            <Form.Row>
                <Form.Group as={Col} controlId="address-edit">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Address" defaultValue={props.address} {...register("address-edit")} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="email-edit">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter Email" defaultValue={props.email} {...register("email-edit")} />
                </Form.Group>
                <Form.Group as={Col} controlId="number-edit">
                    <Form.Label>Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Address" defaultValue={props.number} {...register("number-edit")} />
                </Form.Group>
            </Form.Row>  
            <Form.Row>
                <Form.Group as={Col} controlId="fax-edit">
                    <Form.Label>Fax</Form.Label>
                    <Form.Control type="text" placeholder="Enter Email" defaultValue={props.fax} {...register("fax-edit")} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="date-edit">
                    <Form.Label>Date Added</Form.Label>
                    <Form.Control type="text" defaultValue={props.date} readOnly/>
                </Form.Group>
                <Form.Group as={Col} controlId="encoded-edit">
                    <Form.Label>Encoded By</Form.Label>
                    <Form.Control type="text" defaultValue={props.encoded} readOnly/>
                </Form.Group>
            </Form.Row>  
            <Form.Row>
                    <Form.Label>Material Tags</Form.Label>
                    <TagsInput selected={selected} tags={props.tags ? props.tags.split(',') : []}/>
            </Form.Row>
        </Form>
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="success" size="sm" onClick={handleSubmit(updateSupplierData)}>
            <FontAwesomeIcon icon={faCheck} className="icon-space" />Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
}


function Supplier() {
    const [modalShow, setModalShow] = useState(false);
    const [hideAddSupplier, setHideAddSupplier] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [hideSupplierTable, setHideAddSupplierTable] = useState(false);
    const [customAlert, setCustomAlert] = useState(null);
    const [tags,setTags] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const selected = tags => setTags(tags);
    const buttonStyle ={
        display:"flex",
        justifyContent:"flex-end",
        marginBottom:"1rem"
    };
   
    const fetchSupplier =  async () => {
       await axios
        .get('/fetch/supplier', {
    
        })
        .then((response) => {
            //get the object of supplier data to load to a table
            console.log(response.data);
            setTableData(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchSupplier();
    },[]);
    
    const hideAlert = () => {
        setCustomAlert(null)
        hideTableShowAddSupplier(false)
    }
    
    const onSubmit = (data) => {
        axios
        .post('/supplier', {
           data:data,
           tags:tags.join()
        })
        .then((response) => {
            console.log(response);
                setCustomAlert(<SweetAlert
                success
                title="Success!"
                onConfirm={() =>hideAlert()}
                >
                New Supplier Added
                </SweetAlert>);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const deleteSupplier = (id) => {
        axios.delete(`/supplier/${id}`, { data: id }).then(
           setCustomAlert(null)
        );
    }
    
    const removeSupplierConfirmation = (id) => {
        setCustomAlert(
        <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={() =>deleteSupplier(id)}
            onCancel={() => setCustomAlert(null)}
            focusCancelBtn
          >
            This Supplier data will be deleted
          </SweetAlert>
          )
       
    }

   const hideTableShowAddSupplier = (isCurrentlyHidden) => {
        if(isCurrentlyHidden){
            setHideAddSupplier(false);
            setHideAddSupplierTable(true);
        }
        else{
            setHideAddSupplier(true);
            setHideAddSupplierTable(false);
        }
        
    }

    
   const showModalSupplierData = (id) => {
      let supplierInfo = tableData[id];
      console.log(supplierInfo)
        setModalShow(
            <MyVerticallyCenteredModal
                show={true}
                title={supplierInfo.supplier}
                supplierId={supplierInfo.supplier_id}
                supplier={supplierInfo.supplier}
                contactPerson={supplierInfo.contact_person}
                address={supplierInfo.address}
                email={supplierInfo.email}
                number={supplierInfo.contact_no}
                fax={supplierInfo.fax_no}
                bank={supplierInfo.bankaccount_no}
                date={supplierInfo.date_added}
                encoded={supplierInfo.encoded_by}
                tags={supplierInfo.tags}
                onHide={() => setModalShow(null)}
            />
        );
    }

    //  const explodeTagsString = (tags) => {
    //         <tags className="spli"></tags>
    //   }
    
    
    return (
        
        <div>
            {customAlert}
            <Container fluid hidden={hideSupplierTable}>
                <div style={buttonStyle}>
                    <Button variant="success" size="sm" style={{marginRight:"0.5rem"}} onClick={() =>hideTableShowAddSupplier(true)}>
                        <FontAwesomeIcon icon={faPlusSquare} className="icon-space" />
                        Add Supplier   
                    </Button>
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Supplier</th>
                        <th>Contact Person</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                        <th>Tags</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tableData.map((data,index) => (
                        <tr>
                        <td>{data.supplier}</td>
                        <td>{data.contact_person}</td>
                        <td>{data.contact_no}</td>
                        <td>{data.email}</td>
                        <td><Tags tags={data.tags   ? data.tags.split(',') : [] }/></td>
                        <td> 
                            <Button variant="outline-info" size="sm" onClick={() => showModalSupplierData(index)}>
                            <FontAwesomeIcon icon={faEye} className="icon-space"/>View</Button>
                            <Button variant="outline-danger" size="sm" onClick={() => removeSupplierConfirmation(data.supplier_id)}>
                                <FontAwesomeIcon icon={faTrashAlt}  className="icon-space" />Delete
                            </Button>
                        </td>
                        </tr>
                   ))}
                    </tbody>
                </Table>
            </Container>

            <Container fluid hidden={hideAddSupplier}>
                <Card className="border-wrapper">
                    <Card.Body>
                        <h4 className="mb-4"><FontAwesomeIcon icon={faUserTag} className="icon-space"/>Add Supplier</h4>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="supplier">
                                    <Form.Label>Supplier *</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Supplier" {...register("supplier",{required:true})} isInvalid={errors.supplier} />
                                    <Form.Control.Feedback type="invalid">Supplier is required</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="contact-person">
                                    <Form.Label>Contact Person *</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Contact Person" {...register("contactPerson",{required:true})} isInvalid={errors.contactPerson} />
                                    <Form.Control.Feedback type="invalid">Contact person is required</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            
                            <Form.Group controlId="supplier-address">
                                <Form.Label>Address *</Form.Label>
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

                            <Form.Row style={{marginBottom:"0.5rem"}}>
                              <Form.Label>Material Tags *</Form.Label>
                              <TagsInput selected={selected} tags={[]}/>
                            </Form.Row>

                        </Form>
                        <div style={buttonStyle}>
                            <Button variant="success" size="sm" style={{marginRight:"0.5rem"}} onClick={handleSubmit(onSubmit)} >
                            <FontAwesomeIcon icon={faPlusCircle} className="icon-space" />
                             Add    
                            </Button>
                            <Button variant="danger" size="sm" style={{marginRight:"0.5rem"}} onClick={() =>hideTableShowAddSupplier(false)} >
                            <FontAwesomeIcon icon={faBan} className="icon-space"/>
                                Cancel
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
            {modalShow}
        </div>
       
    );
}

export default Supplier;

if (document.getElementById('supplier')) {
    ReactDOM.render(<Supplier />, document.getElementById('supplier'));
}
