import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Tabs,Tab,Container,Card,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck,faClock,faBan} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm,useFieldArray } from "react-hook-form";
import PurchaseOrderList from './PurchaseOrderList';



function PurchaseOrderTabs(props) {

const [pendingPO, setPendingPO] = useState([]);
const [approvedPO, setApprovedPO] = useState([]);
const [cancelledPO, setCancelledPO] = useState([]);

    const fethPurchaseOrderData =  async () => {
        await axios
         .get('/fetch/purchaseOrder', {
     
         })
         .then((response) => {
            console.log(response.data)
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
        <Container fluid hidden>
            <Tabs fill defaultActiveKey="pending" transition={false} id="noanim-tab-example">
                <Tab eventKey="pending" title="Pending"> 
                    <Card className='mt-3 card-wrapper'>
                        <Card.Header className='header-wrapper'>Pending</Card.Header>
                            <PurchaseOrderList />
                    </Card>
                </Tab>
                <Tab eventKey="approved" title="Approved">
                    <Card className='mt-3 card-wrapper'>
                        <Card.Header className='header-wrapper'>Approved</Card.Header>
                
                    </Card>
                </Tab>
                <Tab eventKey="cancelled" title="Cancelled">
                    <Card className='mt-3 card-wrapper'>
                        <Card.Header className='header-wrapper'>Cancelled</Card.Header>
                
                    </Card>
                </Tab>
            </Tabs>
        </Container>
    </div>
    );
}

export default PurchaseOrderTabs;
