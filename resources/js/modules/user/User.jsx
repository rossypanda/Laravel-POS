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
        axios.patch(`/user/1}`,{data}).then(
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
    const [hideAddUser, setHideAddUser] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [hideUserTable, setHideAddUserTable] = useState(false);
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
            //get the object of user data to load to a table
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
        hideTableShowAddUser(false)
    }
    
    const onSubmit = (data) => {
        axios
        .post('/user', {
           data
        })
        .then((response) => {
            console.log(response);
                setCustomAlert(<SweetAlert
                success
                title="Success!"
                onConfirm={() =>hideAlert()}
                >
                New User Added
                </SweetAlert>);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const deleteUser = (id) => {
        axios.delete(`/user/${id}`, { data: id }).then(
           setCustomAlert(null)
        );
    }
    
    const removeUserConfirmation = (id) => {
        setCustomAlert(
        <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={() =>deleteUser(id)}
            onCancel={() => setCustomAlert(null)}
            focusCancelBtn
          >
            This User data will be deleted
          </SweetAlert>
          )
       
    }

   const hideTableShowAddUser = (isCurrentlyHidden) => {
        if(isCurrentlyHidden){
            setHideAddUser(false);
            setHideAddUserTable(true);
        }
        else{
            setHideAddUser(true);
            setHideAddUserTable(false);
        }
        
    }

    
   const showModalUserData = (id) => {
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
            <Container fluid hidden={hideUserTable}>
                <div style={buttonStyle}>
                    <Button variant="success" size="sm" style={{marginRight:"0.5rem"}} onClick={() =>hideTableShowAddUser(true)}>
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
                            <Button variant="outline-info" size="sm" onClick={() => showModalUserData(index)}>
                            <FontAwesomeIcon icon={faEye} className="icon-space"/>View</Button>
                            <Button variant="outline-danger" size="sm" onClick={() => removeUserConfirmation(data.id)}>
                                <FontAwesomeIcon icon={faTrashAlt}  className="icon-space" />Delete
                            </Button>
                        </td>
                        </tr>
                   ))}
                    </tbody>
                </Table>
            </Container>

            <Container fluid hidden={hideAddUser}>
                <Card className="border-wrapper">
                    <Card.Body>
                        <h4 className="mb-4"><FontAwesomeIcon icon={faUserTag} className="icon-space"/>Add User</h4>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="user">
                                    <Form.Label>User</Form.Label>
                                    <Form.Control type="text" placeholder="Enter User" {...register("user",{required:true})} isInvalid={errors.user} />
                                    <Form.Control.Feedback type="invalid">User's name is required</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="user-email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" {...register("userEmail",{required:true})} isInvalid={errors.userEmail} />
                                    <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="user-password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" {...register("userPassword",{required:true})} isInvalid={errors.userPassword} />
                                    <Form.Control.Feedback type="invalid">User's name is required</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="confirm-password">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="text" placeholder="Password" {...register("confirmPassword",{required:true})} isInvalid={errors.confirmPassword} />
                                    <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="user-role">
                                <Form.Label>Role</Form.Label>
                                <Form.Control placeholder="Role" {...register("userRole",{required:true})} isInvalid={errors.userRole}/>
                                <Form.Control.Feedback type="invalid">Role is required</Form.Control.Feedback>
                            </Form.Group>

                        </Form>
                        <div style={buttonStyle}>
                            <Button variant="success" size="sm" style={{marginRight:"0.5rem"}} onClick={handleSubmit(onSubmit)} >
                            <FontAwesomeIcon icon={faPlusCircle} className="icon-space" />
                             Add    
                            </Button>
                            <Button variant="danger" size="sm" style={{marginRight:"0.5rem"}} onClick={() =>hideTableShowAddUser(false)} >
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
