import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye,faCheck,faUserTag,faPlusCircle,faBan,faThList} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import PoNumberModal from './components/PoNumberModal';



function PONumber() {
 const [tableData,setTableData] = useState([]);
 const [modal,setModal] = useState(null);
   

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

    const showModal = () => {
        setModal(
            <PoNumberModal 
              show={true}
              onHide={() => setModal(null)}
            />
        )
    }
    
    
    return (
        
        <div>
            <Container fluid>
                <div style={buttonStyle}>
                    <Button variant="success" size="sm" style={{marginRight:"0.5rem"}} onClick={() => showModal()}>
                        <FontAwesomeIcon icon={faPlusSquare} className="icon-space" />
                        Add Po Number  
                    </Button>
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Invoice ID</th>
                        <th>Invoice Type</th>
                        <th>Start Range</th>
                        <th>End Range</th>
                        <th>Usage</th>
                        <th>Encoded By</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tableData.map((data,index) => (
                        <tr>
                            <td>{data.po_invoice_id}</td>
                            <td>{data.invoice_type}</td>
                            <td>{data.start_range}</td>
                            <td>{data.end_range}</td>
                            <td>{data.invoice_usage}</td>
                            <td>{data.encoded_by}</td>
                            <td> 
                                <Button variant="outline-info" size="sm" >
                                <FontAwesomeIcon icon={faEye} className="icon-space"/>View</Button>
                                <Button variant="outline-danger" size="sm">
                                    <FontAwesomeIcon icon={faTrashAlt}  className="icon-space" />Delete
                                </Button>
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
