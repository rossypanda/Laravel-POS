import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Tabs,Tab,Container,Card,Button,Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck,faClock,faBan,faCalendar,faUserCircle,faPrint,faExternalLinkAlt,faTrashAlt,faFileExcel,faEdit} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm,useFieldArray } from "react-hook-form";
import PurchaseOrderList from './PurchaseOrderList';



function PurchaseOrderTabs(props) {

const [pendingPO, setPendingPO] = useState([]);
const [approvedPO, setApprovedPO] = useState([]);
const [cancelledPO, setCancelledPO] = useState([]);
const [users, setUsers] = useState([]);
const [supplier, setSupplier] = useState([]);
const [cancelledFilter, setCancelledFilter] = useState('');
const [pendingFilter, setPendingFilter] = useState('');
const [approvedFilter,setApprovedFilter] = useState('');
const PO_STATUS = {'F' :'Pending','A':'Approved','C': 'Cancelled'};
const PAYMENT_TYPE = {'C' :'Cash','H':'Check'};
const headerStyle ={
    display:"flex",
    justifyContent:"space-between",
};

const pendingSearch = (rows) => {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) => 
             columns.some(
                 (column) =>
                 (row[column] ? row[column] : '').toString().toLowerCase().indexOf(pendingFilter.toLowerCase()) > -1
             )
        
    );
 }

 const approvedSearch = (rows) => {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) => 
             columns.some(
                 (column) =>
                 (row[column] ? row[column] : '').toString().toLowerCase().indexOf(approvedFilter.toLowerCase()) > -1
             )
        
    );
 }

 const cancelledSearch = (rows) => {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) => 
             columns.some(
                 (column) =>
                 (row[column] ? row[column] : '').toString().toLowerCase().indexOf(cancelledFilter.toLowerCase()) > -1
             )
        
    );
 }
    const fethPurchaseOrderData =  async () => {
        await axios
         .get('/fetch/purchaseOrder', {
     
         })
         .then((response) => {
            console.log(response.data)
            setPendingPO(response.data.pending);
            setApprovedPO(response.data.approved);
            setCancelledPO(response.data.cancelled);
            setUsers(response.data.users[0]);
            setSupplier(response.data.supplier[0]);
         })
         .catch((err) => {
             console.log(err);
         });
     }

    useEffect(() => {
        fethPurchaseOrderData();
    },[]);


    return (
    <div>
        <Container fluid>
            <Tabs fill defaultActiveKey="pending" transition={false} id="noanim-tab-example">
                <Tab eventKey="pending" title="Pending"> 
                    <Card className='mt-3 card-wrapper'>
                        <Card.Header className='header-wrapper' style={headerStyle}>Pending
                        <Form.Control type="text" placeholder="Search" style={{width:"15%",borderRadius:"0.5rem"}} value={pendingFilter} onChange={(e) => setPendingFilter(e.target.value)}/></Card.Header>
                            {pendingSearch(pendingPO).map((data,index) => (
                                <PurchaseOrderList 
                                    poHeaderId = {data.po_header_id}
                                    poNumber={data.po_number}
                                    icon={faClock}
                                    projectName={data.project_name}
                                    date={data.date}
                                    requestedBy={users[data.requested_by]}
                                    supplier={supplier[data.supplier_id]}
                                    totalAMount={data.total_amount}
                                    variant={"warning"}
                                    status={PO_STATUS[data.status]}
                                    paymentType={PAYMENT_TYPE[data.payment_type]}
                                    key={index}
                                />
                            ))}
                    </Card>
                </Tab>
                <Tab eventKey="approved" title="Approved">
                    <Card className='mt-3 card-wrapper'>
                    <Card.Header className='header-wrapper' style={headerStyle}>Approved
                        <Form.Control type="text" placeholder="Search" style={{width:"15%",borderRadius:"0.5rem"}} value={approvedFilter} onChange={(e) => setApprovedFilter(e.target.value)}/></Card.Header>
                           {approvedSearch(approvedPO).map((data,index) => (
                               <PurchaseOrderList 
                               poNumber={data.po_number}
                               icon={faClipboardCheck}
                               date={data.date}
                               requestedBy={users[data.requested_by]}
                               supplier={supplier[data.supplier_id]}
                               totalAMount={data.total_amount}
                               variant={"success"}
                               status={PO_STATUS[data.status]}
                               paymentType={PAYMENT_TYPE[data.payment_type]}
                               key={index}
                           />
                            ))}
                    </Card>
                </Tab>
                <Tab eventKey="cancelled" title="Cancelled">
                    <Card className='mt-3 card-wrapper'>
                    <Card.Header className='header-wrapper' style={headerStyle}>Cancelled
                        <Form.Control type="text" placeholder="Search" style={{width:"15%",borderRadius:"0.5rem"}} value={cancelledFilter} onChange={(e) => setCancelledFilter(e.target.value)}/></Card.Header>
                            {cancelledSearch(cancelledPO).map((data,index) => (
                                <PurchaseOrderList 
                                poNumber={data.po_number}
                                icon={faBan}
                                date={data.date}
                                requestedBy={users[data.requested_by]}
                                supplier={supplier[data.supplier_id]}
                                totalAMount={data.total_amount}
                                variant={"danger"}
                                status={PO_STATUS[data.status]}
                                paymentType={PAYMENT_TYPE[data.payment_type]}
                                key={index}
                            />
                            ))}
                    </Card>
                </Tab>
            </Tabs>
        </Container>
    </div>
    );
}

export default PurchaseOrderTabs;
