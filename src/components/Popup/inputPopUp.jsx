import { Button,Modal,Form} from "react-bootstrap";

const InputPopUp= (props) => {

    const {show, setShow,input,setInput} = props;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                <Form.Label>Cancelation Reason</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={setInput}  value={input} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  

  export default InputPopUp;