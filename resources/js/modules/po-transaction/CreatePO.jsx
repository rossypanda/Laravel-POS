import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye,faCheck,faUserTag,faPlusCircle,faBan,faThList} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import CreatePurchaseOrder from './component/CreatePurchaseOrder';
import PurchaseOrderTabs from './component/PurchaseOrderTabs';


function CreatePO() {

    return (
    <div>
        <CreatePurchaseOrder />
    </div>
    );
}

export default CreatePO;

if (document.getElementById('create-po')) {
    ReactDOM.render(<CreatePO />, document.getElementById('create-po'));
}
