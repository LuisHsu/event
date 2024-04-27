import { useEffect } from 'react';
import { Modal, Container} from 'react-bootstrap'
import QRCode from 'qrcode';

import "./QRModal.css";

function QRModal({onClose, data}){

    useEffect(() => {
        if(data !== null){
            QRCode.toCanvas(document.getElementById("qr-canvas"), 
                `${window.location.origin}/event/guest/#${data}`, 
                (error) => {
                    console.error(error);
                }
            )
        }
    }, [data]);

    return <Modal show={data !== null} onHide={onClose} size='lg'>
        <Modal.Header closeButton>
            <Modal.Title>QR code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container id="qr-wrapper">
                <canvas id="qr-canvas"></canvas>
            </Container>
        </Modal.Body>
    </Modal>
}

export default QRModal;