import React from 'react';
import ReactDOM from 'react-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

function Supplier() {
    
    return (
        
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Library
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
}

export default Supplier;

if (document.getElementById('supplier')) {
    ReactDOM.render(<Supplier />, document.getElementById('supplier'));
}
