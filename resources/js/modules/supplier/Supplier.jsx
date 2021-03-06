import React,{useState,useEffect,useContext} from 'react';
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
import Permission from '../../helpers/PermissionComponent';
import PermissionContext from '../../helpers/PermissionContext';





function Supplier() {
    const [modalShow, setModalShow] = useState(false);
    const [hideAddSupplier, setHideAddSupplier] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [hideSupplierTable, setHideAddSupplierTable] = useState(false);
    const [customAlert, setCustomAlert] = useState(null);
    const [tags,setTags] = useState([]);
    const [filter,setFilter] = useState('');
    const [users,setUsers] = useState([]);
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();
    const selected = tags => setTags(tags);
    const permission = useContext(PermissionContext);
    const buttonStyle ={
        display:"flex",
        justifyContent:"space-between",
        marginBottom:"1rem"
    };
   
const MyVerticallyCenteredModal = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [tags,setTags] = useState([]);
    const selected = tags => setTags(tags);
    const updateSupplierData = (data) => {
        axios.patch(`/supplier/1}`,{data:data,tags:tags.join()}).then(() => {
            setAlert(  <Alert  variant="success">
            Data Updated
           </Alert>)
          fetchSupplier();
           console.log('refetch');
        })
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
                    <Form.Control type="text" placeholder="Enter Supplier" value={props.supplierid} {...register("supplier-id")} />
                </Form.Group>
                <Form.Group as={Col} controlId="supplier-edit">
                    <Form.Label>Supplier</Form.Label>
                    <Form.Control type="text" placeholder="Enter Supplier" defaultValue={props.supplier} {...register("supplier-edit")} />
                </Form.Group>
                <Form.Group as={Col} controlId="contact-person-edit">
                    <Form.Label>Contact Person</Form.Label>
                    <Form.Control type="text" placeholder="Enter Contact Person" defaultValue={props.contactperson} {...register("contact-person-edit")} />
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
    const fetchSupplier =  async () => {
       await axios
        .get('/fetch/supplier', {
    
        })
        .then((response) => {
            //get the object of supplier data to load to a table
            console.log(response.data);
            setTableData(response.data.supplier);
            setUsers(response.data.users);
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
                setCustomAlert(<SweetAlert
                success
                title="Success!"
                onConfirm={() =>hideAlert()}
                >
                New Supplier Added
                </SweetAlert>);
                reset();
                fetchSupplier();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const deleteSupplier = (id) => {
        axios.delete(`/supplier/${id}`, { data: id }).then((response) => {
            setCustomAlert(null);
            fetchSupplier();
        });
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

    const search = (rows) => {
       const columns = rows[0] && Object.keys(rows[0]);
       return rows.filter((row) => 
                columns.some(
                    (column) =>
                    (row[column] ? row[column] : '').toString().toLowerCase().indexOf(filter.toLowerCase()) > -1
                )
           
       );
    }


    
   const showModalSupplierData = (id) => {
      let supplierInfo = tableData[id];
      console.log(supplierInfo);
        setModalShow(
            <MyVerticallyCenteredModal
                show={true}
                title={supplierInfo.supplier}
                supplierid={supplierInfo.supplier_id}
                supplier={supplierInfo.supplier}
                contactperson={supplierInfo.contact_person}
                address={supplierInfo.address}
                email={supplierInfo.email}
                number={supplierInfo.contact_no}
                fax={supplierInfo.fax_no}
                bank={supplierInfo.bankaccount_no}
                date={supplierInfo.date_added}
                encoded={users[supplierInfo.encoded_by]}
                tags={supplierInfo.tags}
                onHide={() => setModalShow(null)}
            />
        );
    }

    //  const explodeTagsString = (tags) => {
    //         <tags className="spli"></tags>
    //   }
    
    
    return (

        <Permission>
            <div>
                    {customAlert}
                    <Container fluid hidden={hideSupplierTable}>
                        <div style={buttonStyle}>
                        <Form.Control type="text" placeholder="Search" style={{width:"15%",borderRadius:"0.5rem"}} value={filter} onChange={(e) => setFilter(e.target.value)} />
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
                                <th >Tags</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {search(tableData).map((data,index) => (
                                <tr key={index}>
                                <td>{data.supplier}</td>
                                <td>{data.contact_person}</td>
                                <td>{data.contact_no}</td>
                                <td>{data.email}</td>
                                <td ><Tags tags={data.tags   ? data.tags.split(',') : [] }/></td>
                                <td> 
                                    <Button variant="outline-info" size="sm" onClick={() => showModalSupplierData(index)}>
                                    <FontAwesomeIcon icon={faEye} className="icon-space"/>View</Button>
                                    { permission.indexOf('delete.supplier') !== -1 ? 
                                        <Button variant="outline-danger" size="sm" onClick={() => removeSupplierConfirmation(data.supplier_id)}>
                                            <FontAwesomeIcon icon={faTrashAlt}  className="icon-space" />Delete
                                        </Button>
                                        :
                                        null
                                    }
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
                   
            </div>
            {modalShow}
        </Permission>
    
       
    );
}

export default Supplier;

if (document.getElementById('supplier')) {
    ReactDOM.render(<Supplier />, document.getElementById('supplier'));
}
