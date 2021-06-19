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
    const updatePermissionData = (data) => {
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
         
          <Button variant="success" size="sm" onClick={handleSubmit(updatePermissionData)}>
            <FontAwesomeIcon icon={faCheck} className="icon-space" />Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
}


function Permission() {
    const [modalShow, setModalShow] = useState(false);
    const [hideAddPermission, setHideAddPermission] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [hidePermissionTable, setHideAddPermissionTable] = useState(false);
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
        hideTableShowAddPermission(false)
    }
    
    const onSubmit = (data) => {
        axios
        .post('/permission', {
           data
        })
        .then((response) => {
            console.log(response);
                setCustomAlert(<SweetAlert
                success
                title="Success!"
                onConfirm={() =>hideAlert()}
                >
                New Permission Added
                </SweetAlert>);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const deletePermission = (id) => {
        axios.delete(`/permission/${id}`, { data: id }).then(
           setCustomAlert(null)
        );
    }
    
    const removePermissionConfirmation = (id) => {
        setCustomAlert(
        <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={() =>deletePermission(id)}
            onCancel={() => setCustomAlert(null)}
            focusCancelBtn
          >
            This Permission data will be deleted
          </SweetAlert>
          )
       
    }

   const hideTableShowAddPermission = (isCurrentlyHidden) => {
        if(isCurrentlyHidden){
            setHideAddPermission(false);
            setHideAddPermissionTable(true);
        }
        else{
            setHideAddPermission(true);
            setHideAddPermissionTable(false);
        }
        
    }

    
   const showModalPermissionData = (id) => {
      let permissionInfo = tableData[id];
      console.log(permissionInfo)
        setModalShow(
            <MyVerticallyCenteredModal
                show={true}
                title={permissionInfo.name}
                permissionId={permissionInfo.id}
                permission={permissionInfo.name}
                onHide={() => setModalShow(null)}
            />
        );
    }
    
    
    return (
        
        <div>
            {customAlert}
            <Container fluid hidden={hidePermissionTable}>
                <div style={buttonStyle}>
                    <Button variant="success" size="sm" style={{marginRight:"0.5rem"}} onClick={() =>hideTableShowAddPermission(true)}>
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
                            <Button variant="outline-info" size="sm" onClick={() => showModalPermissionData(index)}>
                            <FontAwesomeIcon icon={faEye} className="icon-space"/>View</Button>
                            <Button variant="outline-danger" size="sm" onClick={() => removePermissionConfirmation(data.id)}>
                                <FontAwesomeIcon icon={faTrashAlt}  className="icon-space" />Delete
                            </Button>
                        </td>
                        </tr>
                   ))}
                    </tbody>
                </Table>
            </Container>

            <Container fluid hidden={hideAddPermission}>
                <Card className="border-wrapper">
                    <Card.Body>
                        <h4 className="mb-4"><FontAwesomeIcon icon={faUserTag} className="icon-space"/>Add Permission</h4>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="permission">
                                    <Form.Label>Permission</Form.Label>
                                    <Form.Control type="text" placeholder="Permission" {...register("permission",{required:true})} isInvalid={errors.permission} />
                                    <Form.Control.Feedback type="invalid">Permission is required</Form.Control.Feedback>
                                </Form.Group>
                                
                            </Form.Row>

                        </Form>
                        <div style={buttonStyle}>
                            <Button variant="success" size="sm" style={{marginRight:"0.5rem"}} onClick={handleSubmit(onSubmit)} >
                            <FontAwesomeIcon icon={faPlusCircle} className="icon-space" />
                             Add    
                            </Button>
                            <Button variant="danger" size="sm" style={{marginRight:"0.5rem"}} onClick={() =>hideTableShowAddPermission(false)} >
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
