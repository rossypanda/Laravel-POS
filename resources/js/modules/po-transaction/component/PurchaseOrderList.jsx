import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Tabs,Tab,Container,Card,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck,faClock,faBan} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm,useFieldArray } from "react-hook-form";



function PurchaseOrderList(props) {



    return (
    <div>
        <Card className='mt-3'>
            <Card.Header className='header-wrapper'>{props.name}</Card.Header>
        </Card>
    </div>
    );
}

export default PurchaseOrderList;
