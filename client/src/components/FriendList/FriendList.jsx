import React, { useEffect, useRef } from 'react';
import '../../App.css';
import './friendlist.css'

const FriendListModal = () => {
    const myModalRef = useRef(null);
    const myInputRef = useRef(null);

    useEffect(() => {
        const handleShown = () => {
            if (myInputRef.current) {
                myInputRef.current.focus();
            }
        };

        const modalElement = myModalRef.current;

        if (modalElement) {
            modalElement.addEventListener('shown.bs.modal', handleShown);
        }

        return () => {
            if (modalElement) {
                modalElement.removeEventListener('shown.bs.modal', handleShown);
            }
        };
    }, []);

    return (
        <>
            {/* Button trigger modal */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Friends
            </button>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={myModalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Your Friends</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div class="card">
                                <div class="card-body row">
                                    <div class="col">
                                        <h2>UserName</h2>
                                    </div>
                                    <div class="col row">
                                        <button type="button" className="btn btn-primary col">View Profile</button>
                                        <button type="button" className="btn btn-danger col">Dice Battle</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FriendListModal;