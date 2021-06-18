import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Button,Container,Row,Table,Modal,ModalTitle,ModalDialog,ModalBody,ModalDialogProps,ModalFooter,Card,InputGroup,FormControl,InputGroupProps,Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser} from '@fortawesome/free-solid-svg-icons';
import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import SweetAlert from 'react-bootstrap-sweetalert';

function Reset() {

    const [alert,setAlert] = useState(null);

    const handleClick = () => {
        axios
        .get('/call/reset', {
        
        })
        .then((response) => {
            if(response.data){
                console.log(response);
                setAlert(<SweetAlert
                    success
                    title="Success!"
                    onConfirm={() =>setAlert(null)}
                    >
                    Reset Succesful!
                    </SweetAlert>
                );
            }
            else{
                setAlert(
                    <SweetAlert danger title="Oops!" onConfirm={() => setAlert(null)} >
                       You are not able to do a reset for now
                    </SweetAlert>
                );
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
    <div>
        <Container fluid>
            {alert}
            <p>Note: This will reset the purchase order</p>
            <Button variant="secondary" size="sm" onClick={() =>handleClick()}>
                <FontAwesomeIcon icon={faEraser} className="icon-space" />Reset
            </Button>
        </Container>
    </div>
    );
}

export default Reset;

if (document.getElementById('reset')) {
    ReactDOM.render(<Reset />, document.getElementById('reset'));
}
