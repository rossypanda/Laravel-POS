import React, { useState,useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye,faCheck,faUserTag,faPlusCircle,faBan,faThList} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import PoNumberEdit from './components/PoNumberEdit';
import PoNumberModal from './components/PoNumberModal';
import SweetAlert from 'react-bootstrap-sweetalert';
import Permission from '../../helpers/PermissionComponent';
import PermissionContext from '../../helpers/PermissionContext';


function PONumber() {
 const [tableData,setTableData] = useState([]);
 const [modal,setModal] = useState(null);
 const [range,setRange] = useState(null);
 const [customAlert, setCustomAlert] = useState(null);
 

    const buttonStyle ={
        display:"flex",
        justifyContent:"flex-end",
        marginBottom:"1rem"
    };

    const fetchPoNumber =  async () => {
        await axios
         .get('/fetch/poNumber', {
           
         })
         .then((response) => {
             //get the object of supplier data to load to a table
             console.log(response.data);
             setTableData(JSON.parse(response.data.rows));
             setRange(response.data.range);
         })
         .catch((err) => {
             console.log(err);
         });
     }

     
    useEffect(() => {
        fetchPoNumber();
    },[]);

    const showModal = (id) => {
        setModal(
            <PoNumberEdit
              id={id}
              show={true}
              onHide={() => setModal(null)}
              range={tableData[0].end_range}
            />
        )
    }

    const showAddPONumber = () => {
        setModal(
            <PoNumberModal
              show={true}
              range={range}
              onHide={() => setModal(null)}
              fetchData={fetchPoNumber}
            />
        )
    }

    const deletePONumber = (id) => {
        axios.delete(`/poNumber/${id}`, { data: id }).then(
            setCustomAlert(null)
         );
    }
    
       
    const deleteConfirmation = (id) => {
        setCustomAlert(
        <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={() =>deletePONumber(id)}
            onCancel={() => setCustomAlert(null)}
            focusCancelBtn
          >
            This Supplier data will be deleted
          </SweetAlert>
          )
       
    }
    
    
    return (
        <Permission>
            <div>
                <Container fluid>
                    {customAlert}
                    <div style={buttonStyle}>
                            <Button variant="success" size="sm" style={{marginRight:"0.5rem"}} onClick={() =>showAddPONumber()}>
                                <FontAwesomeIcon icon={faPlusSquare} className="icon-space" />
                                Add PO Number   
                            </Button>
                    </div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>Start Range</th>
                            <th>End Range</th>
                            <th>Usage</th>
                            <th>Year</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {tableData.map((data,index) => (
                            <tr key={index}>
                                <td>{data.start_range}</td>
                                <td>{data.end_range}</td>
                                <td>{data.current_range}</td>
                                <td>{data.current_year}</td>
                                <td> 
                                    <Button variant="outline-info" size="sm" onClick={() => showModal(data.po_invoice_id)}>
                                    <FontAwesomeIcon icon={faEye} className="icon-space"/>Edit</Button>
                                </td>
                            </tr>
                    ))}
                        </tbody>
                    </Table>
                </Container>
                {modal}
            </div>
        </Permission>
        
    );
}

export default PONumber;

if (document.getElementById('poNumber')) {
    ReactDOM.render(<PONumber />, document.getElementById('poNumber'));
}
