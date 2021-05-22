import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Tabs,Tab,Container,Card,Button,Badge} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck,faClock,faBan,faCalendar,faUserCircle,faPrint,faExternalLinkAlt,faTrashAlt,faFileExcel,faEdit} from '@fortawesome/free-solid-svg-icons';
import { useForm,useFieldArray } from "react-hook-form";




function PurchaseOrderList(props) {



    return (
        <div>
            
           
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={faClock} className="icon-space" />
                                PO# 392 
                                <span style={{fontSize: "0.8rem"}} className="float-right">
                                <FontAwesomeIcon icon={faCalendar} className="icon-space" />
                                2020-05-20
                                <FontAwesomeIcon icon={faUserCircle} className="icon-space ml-3 " />
                                Requested By
                                </span>
                            </Card.Title>
                            <Card.Subtitle className="mb-2 mt-3" style={{color:'#3490dc'}}><h5>Card Subtitle</h5></Card.Subtitle>
                            <Card.Text className="text-wrapper">
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                        <Card.Footer className="footer-wrapper">
                            
                            <Badge variant="warning" className="badge-wrapper">Pending</Badge>{' '}
                            <Badge variant="info" className="badge-wrapper">Cash</Badge>{' '}

                            <span className="float-right">
                            <Button variant="outline-secondary" size="sm" style={{marginRight:"0.5rem"}}>
                                <FontAwesomeIcon icon={faPrint} size="lg" className="icon-space" />
                             </Button>
                            <Button variant="outline-secondary" size="sm" style={{marginRight:"0.5rem"}}>
                                <FontAwesomeIcon icon={faExternalLinkAlt} size="lg" className="icon-space" />
                             </Button>
                             <Button variant="outline-secondary" size="sm" style={{marginRight:"0.5rem"}}>
                                <FontAwesomeIcon icon={faEdit} size="lg" className="icon-space" />
                             </Button>
                             <Button variant="outline-secondary" size="sm" style={{marginRight:"0.5rem"}}>
                                <FontAwesomeIcon icon={faTrashAlt} size="lg" className="icon-space" />
                             </Button>
                            </span>
                            
                        </Card.Footer>
                        </Card.Body>
                    </Card>
          
    
        
        </div>
    );
}

export default PurchaseOrderList;
