import { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { useModalContext } from '../hooks/useModalContext.js';
import { useContactsContext } from '../hooks/useContactsContext.js';
import Portal from '../components/Portal';
import host from '../host.js';

function Contacts() {
    const { user } = useAuthContext();
    const { setPopup } = useModalContext();
    const {contacts, dispatch} = useContactsContext();
    const [showError, setShowError] = useState(null);

    useEffect(() => {

        const getContacts = async () => {
            try {
                const response = await fetch(`${host}/api/contacts`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const json = await response.json(); // expect array of objects
                dispatch({type: "GET_CONTACTS", payload: json})
            } catch (error) {
                setShowError(true);
            }
        }
        if (user) {
            getContacts();
        }

    }, [user, setPopup, dispatch]);

    return (
        <>
            <div className="bg-toolite grid grid-cols-6">
                <div></div>
                <div className='min-height bg-dark overflow-x-hidden col-span-6 xl:col-span-4'>
                    <div className='grid grid-cols-3 items-center justify-center'>
                        <p>{ }</p>
                        <h1 className='text-center text-white font-bold text-xl p-4'>Contacts List</h1>
                        <Portal action={"add-contact"} />
                    </div>
                    {
                        showError && (
                            <h1 className='center-div font-bold text-white text-2xl min-h-[calc(100vh-8rem)]'>
                                Fetch Error, Check backend conncted and running?
                            </h1>
                        )
                    }
                    {
                        contacts && (
                            <table className='table-auto w-full'>
                                <thead>
                                    <tr>
                                        <th colSpan={1}>S.No</th>
                                        <th colSpan={5}>Name</th>
                                        <th colSpan={4}>Phone Number</th>
                                        <th colSpan={2} >Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contacts.map((contact, idx) =>
                                        (
                                            <tr key={contact.id}>
                                                <td colSpan={1} align='center'>{idx + 1}</td>
                                                <td colSpan={5} align='center'>{contact.name}</td>
                                                <td colSpan={4} align='center'>{contact.phone}</td>
                                                <td colSpan={1} align='center'>
                                                    <Portal id={contact.id} action={"edit-contact"} />
                                                </td>
                                                <td colSpan={1} align='center'>
                                                    <Portal id={contact.id} action={"delete-contact"} />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Contacts;