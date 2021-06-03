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
    const updateRoleData = (data) => {
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
                <Form.Group as={Col} controlId="role-name-edit">
                    <Form.Label>Role Name</Form.Label>
                    <Form.Control type="text" placeholder="Role Name" value={props.contactPerson} {...register("contact-person-edit")} />
                </Form.Group>
            </Form.Row> 
            <Form.Row>
                <Form.Group as={Col} controlId="role-name-edit">
                    <Form.Label>Permission</Form.Label>
                    <Form.Control type="text" placeholder="Permission" value={props.contactPerson} {...register("contact-person-edit")} />
                </Form.Group>
            </Form.Row>   
        </Form>
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="success" size="sm" onClick={handleSubmit(updateRoleData)}>
            <FontAwesomeIcon icon={faCheck} className="icon-space" />Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
}


function Role() {
    const [modalShow, setModalShow] = useState(false);
    const [hideAddRole, setHideAddRole] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [hideRoleTable, setHideAddRoleTable] = useState(false);
    const [customAlert, setCustomAlert] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
   
    let test;
    const buttonStyle ={
        display:"flex",
        justifyContent:"flex-end",
        marginBottom:"1rem"
    };
   
    const fetchRole =  async () => {
       await axios
        .get('/fetch/role', {
    
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
        fetchRole();
    },[]);
    
    const hideAlert = () => {
        setCustomAlert(null)
        hideTableShowAddRole(false)
    }
    
    const onSubmit = (data) => {
        axios
        .post('/role', {
           data
        })
        .then((response) => {
            console.log(response);
                setCustomAlert(<SweetAlert
                success
                title="Success!"
                onConfirm={() =>hideAlert()}
                >
                New Role Added
                </SweetAlert>);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const deleteRole = (id) => {
        axios.delete(`/role/${id}`, { data: id }).then(
           setCustomAlert(null)
        );
    }
    
    const removeRoleConfirmation = (id) => {
        setCustomAlert(
        <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={() =>deleteRole(id)}
            onCancel={() => setCustomAlert(null)}
            focusCancelBtn
          >
            This Role data will be deleted
          </SweetAlert>
          )
       
    }

   const hideTableShowAddRole = (isCurrentlyHidden) => {
        if(isCurrentlyHidden){
            setHideAddRole(false);
            setHideAddRoleTable(true);
        }
        else{
            setHideAddRole(true);
            setHideAddRoleTable(false);
        }
        
    }

    
   const showModalRoleData = (id) => {
      let roleInfo = tableData[id];
      console.log(roleInfo)
        setModalShow(
            <MyVerticallyCenteredModal
                show={true}
                title={roleInfo.role}
                roleId={roleInfo.role_id}
                role={roleInfo.role}
                onHide={() => setModalShow(null)}
            />
        );
    }
    
    
    return (
        
        <div>
            {customAlert}
            <Container fluid hidden={hideRoleTable}>
                <div style={buttonStyle}>
                    <Button variant="success" size="sm" style={{marginRight:"0.5rem"}} onClick={() =>hideTableShowAddRole(true)}>
                        <FontAwesomeIcon icon={faPlusSquare} className="icon-space" />
                        Add Role  
                    </Button>
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Role ID</th>
                        <th>Role</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tableData.map((data,index) => (
                        <tr>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td> 
                            <Button variant="outline-info" size="sm" onClick={() => showModalRoleData(index)}>
                            <FontAwesomeIcon icon={faEye} className="icon-space"/>View</Button>
                            <Button variant="outline-danger" size="sm" onClick={() => removeRoleConfirmation(data.role_id)}>
                                <FontAwesomeIcon icon={faTrashAlt}  className="icon-space" />Delete
                            </Button>
                        </td>
                        </tr>
                   ))}
                    </tbody>
                </Table>
            </Container>

            <Container fluid hidden={hideAddRole}>
                <Card className="border-wrapper">
                    <Card.Body>
                        <h4 className="mb-4"><FontAwesomeIcon icon={faUserTag} className="icon-space"/>Add Rolesss</h4>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="role">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Role" {...register("role",{required:true})} isInvalid={errors.supplier} />
                                    <Form.Control.Feedback type="invalid">Role is required</Form.Control.Feedback>
                                </Form.Group>
                                
                            </Form.Row>

                        </Form>
                        <div style={buttonStyle}>
                            <Button variant="success" size="sm" style={{marginRight:"0.5rem"}} onClick={handleSubmit(onSubmit)} >
                            <FontAwesomeIcon icon={faPlusCircle} className="icon-space" />
                             Add    
                            </Button>
                            <Button variant="danger" size="sm" style={{marginRight:"0.5rem"}} onClick={() =>hideTableShowAddRole(false)} >
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

export default Role;

if (document.getElementById('role')) {
    ReactDOM.render(<Role />, document.getElementById('role'));
}
