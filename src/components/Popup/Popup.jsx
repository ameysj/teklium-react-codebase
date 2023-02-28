import {useState} from 'react';
import { Button,Modal } from 'react-bootstrap';

const PopUp = (props)=>{
    console.log(props);
    const handleClose = () => props.setShowPopup(false);
    const handleShow = () => props.setShowPopup(true);
    return( <>
        <Modal show={props.showPopup} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.data?.message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>)
}

export default PopUp;