import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col,Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye,faCheck,faUserTag,faPlusCircle,faBan} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm } from "react-hook-form";
import baseUrl from '../../helpers/BaseUrl';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

function MyVerticallyCenteredModal(props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const updateSupplierData = (data) => {
        axios.patch(`/permission/1}`,{data}).then(
            alert('Updated')
        );
    }
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
        <Form> 
            <Form.Row>
                <Form.Group as={Col} controlId="permission-id" hidden>
                    <Form.Label>Permission</Form.Label>
                    <Form.Control type="text" placeholder="Enter Permission" value={props.permissionId} {...register("permission-id")} />
                </Form.Group>
                <Form.Group as={Col} controlId="permission-edit">
                    <Form.Label>Permission</Form.Label>
                    <Form.Control type="text" placeholder="Permission" value={props.permission} {...register("permission-edit")} />
                </Form.Group>
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


function Permission() {
    const [modalShow, setModalShow] = useState(false);
    const [hideAddSupplier, setHideAddSupplier] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [hideSupplierTable, setHideAddSupplierTable] = useState(false);
    const [customAlert, setCustomAlert] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
   
    let test;
    const buttonStyle ={
        display:"flex",
        justifyContent:"flex-end",
        marginBottom:"1rem"
    };
   
    const fetchPermission =  async () => {
       await axios
        .get('/fetch/permission', {
    
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
        fetchPermission();
    },[]);
    
    const hideAlert = () => {
        setCustomAlert(null)
        hideTableShowAddSupplier(false)
    }
    
    const onSubmit = (data) => {
        axios
        .post('/supplier', {
           data
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
                title={supplierInfo.name}
                permissionId={supplierInfo.id}
                permission={supplierInfo.name}
                onHide={() => setModalShow(null)}
            />
        );
    }
    
    
    return (
        
        <div>
            {customAlert}
            <Container fluid hidden={hideSupplierTable}>
                <div style={buttonStyle}>
                    <Button variant="success" size="sm" style={{marginRight:"0.5rem"}} onClick={() =>hideTableShowAddSupplier(true)}>
                        <FontAwesomeIcon icon={faPlusSquare} className="icon-space" />
                        Add Permission   
                    </Button>
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Permission ID</th>
                        <th>Permission</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tableData.map((data,index) => (
                        <tr>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
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
                        <h4 className="mb-4"><FontAwesomeIcon icon={faUserTag} className="icon-space"/>Add Permission</h4>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="supplier">
                                    <Form.Label>Permission</Form.Label>
                                    <Form.Control type="text" placeholder="Permission" {...register("supplier",{required:true})} isInvalid={errors.supplier} />
                                    <Form.Control.Feedback type="invalid">Supplier is required</Form.Control.Feedback>
                                </Form.Group>
                                
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

export default Permission;

if (document.getElementById('permission')) {
    ReactDOM.render(<Permission />, document.getElementById('permission'));
}
