import { useEffect, useRef } from "react";

interface Props {
    name?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function DeletePopup({name, onConfirm, onCancel }: Props) {

    const modal = useRef<HTMLDivElement | null>(null);
    const modalBg = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (modal.current && modalBg.current) {
                modal.current.classList.add("show");
                modalBg.current.classList.add("show");
            }
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const handleDecision = (callback: () => void) => {
        if (modal.current && modalBg.current) {
            modal.current.classList.remove("show");
            modalBg.current.classList.remove("show");
        }
        const timer = setTimeout(() => {
            callback()
        }, 200);
        return () => clearTimeout(timer);
    }

    return (
        <>
        <div className="modal fade" ref={modal} tabIndex={-1} style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Deletion</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleDecision(onCancel)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete <strong>{name}</strong>?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => handleDecision(onCancel)}>Cancel</button>
                        <button type="button" className="btn btn-success" onClick={() => handleDecision(onConfirm)}>Yes, Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop fade" ref={modalBg}></div>
        </>
    );
}