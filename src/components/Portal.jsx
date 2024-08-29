import { createPortal } from 'react-dom';
import ModalContent from './ModalContent';
import { useModalContext } from '../hooks/useModalContext';
import { RiEditLine } from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RiLogoutBoxRLine } from "react-icons/ri";

export default function Portal({ action, id }) {
    const { modalOpen, setModalOpen, setPopup, setId } = useModalContext();

    const onClick = (e) => {
        setModalOpen(true);
        setPopup(action);
        setId(e.target.id || e.currentTarget.id);
    }

    let buttonTitle;

    switch (action) {
        case 'logout': {
            buttonTitle = <RiLogoutBoxRLine fontSize={24} />;
            break;
        }

        case 'add': {
            buttonTitle = 'Add a Expense';
            break;
        }

        case 'edit': {
            buttonTitle = <RiEditLine />;
            break;
        }

        case 'delete': {
            buttonTitle = <RiDeleteBin5Line />;
            break;
        }

        case 'add-contact': {
            buttonTitle = 'Add a Contact';
            break;
        }

        case 'edit-contact': {
            buttonTitle = <RiEditLine />;
            break;
        }

        case 'delete-contact': {
            buttonTitle = <RiDeleteBin5Line />;
            break;
        }
    }

    return (
        <>
            <button id={id} onClick={onClick} className={action === 'add' || action === 'add-contact' ? 'btn' : 'action-btn'}>{buttonTitle}</button>
            {modalOpen && createPortal(
                <ModalContent />,
                document.body
            )}
        </>
    );
}