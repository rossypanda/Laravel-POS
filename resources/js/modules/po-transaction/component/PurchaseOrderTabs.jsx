import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Tabs,Tab,Container,Card,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck,faClock,faBan} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm,useFieldArray } from "react-hook-form";
import PurchaseOrderList from './PurchaseOrderList';



function PurchaseOrderTabs(props) {



    return (
    <div>
        <Container fluid>
            <Tabs fill defaultActiveKey="pending" transition={false} id="noanim-tab-example">
                <Tab eventKey="pending" title="Pending"> 
                   <PurchaseOrderList name="Pending"/>
                </Tab>
                <Tab eventKey="approved" title="Approved">
                    <PurchaseOrderList name="Approved"/>
                </Tab>
                <Tab eventKey="cancelled" title="Cancelled">
                    <PurchaseOrderList name="Cancelled"/>
                </Tab>
            </Tabs>
        </Container>
    </div>
    );
}

export default PurchaseOrderTabs;
