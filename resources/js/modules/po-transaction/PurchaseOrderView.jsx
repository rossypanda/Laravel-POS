
import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col,Form,Badge} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTrashAlt,faEye,faCheck,faUserTag,faPlusCircle,faBan,faThList,faMoneyCheck,faCartPlus} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm,useFieldArray,useWatch} from "react-hook-form";

function PurchaseOrderView(props) {
    const [header,setHeader] = useState([]);
    const [detail,setDetail] = useState([]);

    const fetchPoData =  async () => {
        await axios
         .get(`/fetch/purchase_order/${props.tsid}}`, {
     
         })
         .then((response) => {
             //get the object of supplier data to load to a table
             console.log(response.data);
             setHeader(response.data.po_header);
             setDetail(response.data.po_detail);
         })
         .catch((err) => {
             alert(err);
         });
     }

     useEffect(() => {
        fetchPoData();
    },[]);

    return (
        <div>
            <p>test</p>
        </div>
    );
}

export default PurchaseOrderView;

if (document.getElementById('view-po')) {
    const element = document.getElementById('view-po')
      
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<PurchaseOrderView {...props}/>, document.getElementById('view-po'));
}
