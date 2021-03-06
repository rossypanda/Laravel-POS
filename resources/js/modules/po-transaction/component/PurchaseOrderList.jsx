import React, { useState,useEffect,useContext } from 'react';
import ReactDOM from 'react-dom';
import {Tabs,Tab,Container,Card,Button,Badge} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck,faClock,faBan,faCalendar,faUserCircle,faPrint,faExternalLinkAlt,faTrashAlt,faFileExcel,faEdit} from '@fortawesome/free-solid-svg-icons';
import { useForm,useFieldArray } from "react-hook-form";
import PermissionContext from '../../../helpers/PermissionContext';



function PurchaseOrderList(props) {

const permission = useContext(PermissionContext);

    return (
        <div>
            
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={props.icon} className="icon-space"  />
                                    PO# {props.poNumber}
                                <span style={{fontSize: "0.8rem"}} className="float-right">
                                <FontAwesomeIcon icon={faCalendar} className="icon-space" />
                                    {props.date}
                                <FontAwesomeIcon icon={faUserCircle} className="icon-space ml-3 " />
                                  {props.requestedBy}
                                </span>
                            </Card.Title>
                            <Card.Subtitle className="mb-2 mt-3" style={{color:'#3490dc'}}><h5>{props.projectName}</h5></Card.Subtitle>
                            <Card.Text className="text-wrapper">
                               Supplier: {props.supplier} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {props.status == 'Cancelled' ? `Remarks: ${props.remarks} ` : `Description: ${props.description}  `}
                            </Card.Text>
                        <Card.Footer className="footer-wrapper">
                            
                            <Badge variant={props.variant} className="badge-wrapper">{props.status}</Badge>{' '}
                            <Badge variant="info" className="badge-wrapper">{props.paymentType}</Badge>{' '}

                            <span className="float-right">
                            <Button variant="outline-secondary" size="sm" style={{marginRight:"0.5rem"}} href={`purchaseOrder/${props.poHeaderId}`} target="_blank">
                                <FontAwesomeIcon icon={faExternalLinkAlt} size="lg" className="icon-space" />
                             </Button>
                            <Button variant="outline-secondary" size="sm" style={{marginRight:"0.5rem"}} href={`fetch/pdf/${props.poHeaderId}`} target="_blank">
                                <FontAwesomeIcon icon={faPrint} size="lg" className="icon-space" />
                             </Button>
                          
                             {/* <Button variant="outline-secondary" size="sm" style={{marginRight:"0.5rem"}}>
                                <FontAwesomeIcon icon={faEdit} size="lg" className="icon-space" />
                             </Button> */}
                             { permission.indexOf('po.delete') !== -1 ? 
                                <Button variant="outline-secondary" size="sm" style={{marginRight:"0.5rem"}}>
                                    <FontAwesomeIcon icon={faTrashAlt} size="lg" className="icon-space" />
                                </Button>
                                :
                                null
                             }
                            </span>
                            
                        </Card.Footer>
                        </Card.Body>
                    </Card>
          
    
        
        </div>
    );
}

export default PurchaseOrderList;
