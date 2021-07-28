import BootstrapModal from 'react-bootstrap/Modal';

const Modal = (props) => {
    return (
        <BootstrapModal
            show={props.show}
            onHide={props.hideClickHandler}
            animation={false}
        >
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>{props.title}</BootstrapModal.Title>
            </BootstrapModal.Header>

            <BootstrapModal.Body>{props.children}</BootstrapModal.Body>
        </BootstrapModal>
    );
};

export default Modal;
