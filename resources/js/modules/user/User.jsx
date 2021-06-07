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
    const updateUserData = (data) => {
        axios.patch(`/supplier/1}`,{data}).then(
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
                <Form.Group as={Col} controlId="user-edit" hidden>
                    <Form.Label>User</Form.Label>
                    <Form.Control type="text" placeholder="Enter User" value={props.userId} {...register("user-id")} />
                </Form.Group>
                <Form.Group as={Col} controlId="user-edit">
                    <Form.Label>User</Form.Label>
                    <Form.Control type="text" placeholder="Enter User" value={props.userName} {...register("user-edit")} />
                </Form.Group>
                <Form.Group as={Col} controlId="user-email-edit">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter Email" value={props.userEmail} {...register("user-email-edit")} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="user-password-edit">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Password" value={props.userPassword} {...register("user-password-edit")} />
                </Form.Group>
                <Form.Group as={Col} controlId="user-password-edit">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Password" value={props.userPassword} {...register("user-password-edit")} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="role-edit">
                    <Form.Label>Role</Form.Label>
                    <Form.Control type="text" placeholder="Role" value={props.description} {...register("role-edit")} />
                </Form.Group>
            </Form.Row>
        </Form>
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="success" size="sm" onClick={handleSubmit(updateUserData)}>
            <FontAwesomeIcon icon={faCheck} className="icon-space" />Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
}


function User() {
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
   
    const fetchUser =  async () => {
       await axios
        .get('/fetch/user', {
    
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
        fetchUser();
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
      let userInfo = tableData[id];
      console.log(userInfo)
        setModalShow(
            <MyVerticallyCenteredModal
                show={true}
                title={userInfo.name}
                userId={userInfo.id}
                userName={userInfo.name}
                userEmail={userInfo.email}
                userPassword={userInfo.password}
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
                        Add User   
                    </Button>
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>User ID</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tableData.map((data,index) => (
                        <tr>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.email}</td>
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
                        <h4 className="mb-4"><FontAwesomeIcon icon={faUserTag} className="icon-space"/>Add User</h4>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="supplier">
                                    <Form.Label>User</Form.Label>
                                    <Form.Control type="text" placeholder="Enter User" {...register("supplier",{required:true})} isInvalid={errors.supplier} />
                                    <Form.Control.Feedback type="invalid">User's name is required</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="contact-person">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" {...register("contactPerson",{required:true})} isInvalid={errors.contactPerson} />
                                    <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="supplier">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" {...register("supplier",{required:true})} isInvalid={errors.supplier} />
                                    <Form.Control.Feedback type="invalid">User's name is required</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="contact-person">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="text" placeholder="Password" {...register("contactPerson",{required:true})} isInvalid={errors.contactPerson} />
                                    <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="supplier-address">
                                <Form.Label>Role</Form.Label>
                                <Form.Control placeholder="Role" {...register("address",{required:true})} isInvalid={errors.address}/>
                                <Form.Control.Feedback type="invalid">Role is required</Form.Control.Feedback>
                            </Form.Group>

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

export default User;

if (document.getElementById('user')) {
    ReactDOM.render(<User />, document.getElementById('user'));
}
