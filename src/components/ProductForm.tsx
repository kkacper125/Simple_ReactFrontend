import { useEffect, useRef } from "react";
import { IProductUpsert } from "../intefaces/IProductUpsert"
import { PriceInput } from "./PriceInput";

interface Props{
    title: string,
    product: IProductUpsert,
    onChange: (updatedProduct: IProductUpsert) => void,
    onClose: () => void,
    onSubmit: () => void
}


export function ProductForm({title, product, onChange, onClose, onSubmit}: Props){
    const modal = useRef<HTMLDivElement | null>(null);
    const modalBg = useRef<HTMLDivElement | null>(null);
    const form = useRef<HTMLFormElement | null>(null);

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
            callback();
        }, 200);

        return () => clearTimeout(timer);
    }

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault;
        if(form.current?.checkValidity()){
            handleDecision(onSubmit)
        }else{
            form.current?.reportValidity();
        }
    }

    return (
        <>
            <div className="modal fade" ref={modal} tabIndex={-1} style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleDecision(onClose)}></button>
                        </div>
                        <form ref={form}>
                            <div className="modal-body d-grid row-gap-3">                        
                                <div className="row">
                                    <div className="col">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={product.name ?? ""} 
                                            onChange={(e) => onChange({...product, name: e.target.value})} 
                                            placeholder="Name" 
                                            required
                                        />
                                    </div>
                                    <div className="col">
                                        <PriceInput
                                            value={product.cost ?? 0}
                                            onChange={(newCost) => onChange({...product, cost: newCost})} 
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <textarea 
                                        className="form-control" 
                                        value={product.description ?? ""} 
                                        onChange={(e) => onChange({...product, description: e.target.value})} 
                                        placeholder="Description" 
                                        rows={3}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={handleSubmitForm}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade" ref={modalBg} ></div>
        </>
    )
}