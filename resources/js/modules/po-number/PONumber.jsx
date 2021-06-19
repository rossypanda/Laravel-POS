import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye,faCheck,faUserTag,faPlusCircle,faBan,faThList} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import PoNumberEdit from './components/PoNumberEdit';
import SweetAlert from 'react-bootstrap-sweetalert';



function PONumber() {
 const [tableData,setTableData] = useState([]);
 const [modal,setModal] = useState(null);
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
             setTableData(response.data);
             
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
        
        <div>
            <Container fluid>
                {customAlert}
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
                        <tr>
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
        
    );
}

export default PONumber;

if (document.getElementById('poNumber')) {
    ReactDOM.render(<PONumber />, document.getElementById('poNumber'));
}
