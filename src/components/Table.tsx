import edit from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import { useEffect, useState } from "react";
import { IProductResponse } from "../intefaces/IProductResponse";
import { DeletePopup } from './DeletePopup';
import { ProductForm } from './ProductForm';
import { AddButton } from './AddButton';
import { IProductUpsert } from '../intefaces/IProductUpsert';
import { Pagination } from './Pagination';
import { IFilter } from '../intefaces/IFilter';

interface Props{
    columns?: string[]
    filters: IFilter
}

function Table({columns, filters}: Props){

    const [rows, setRows] = useState<IProductResponse>();
    const [productToDelete, setProductToDelete] = useState<{id: number, name: string} | null>(null);
    const [productFormsProduct, setProductFormsProduct] = useState<IProductUpsert>({});
    const [currentPage, setCurrentPage] = useState(1);
    const pageLenght = 5;

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);

    const apiUrl = `http://localhost:5198/api/products/search?name=${encodeURIComponent(filters.name)}&minPrice=${encodeURIComponent(filters.minPrice)}&maxPrice=${encodeURIComponent(filters.maxPrice+1)}&offset=${encodeURIComponent((currentPage * pageLenght) - pageLenght)}`

    const fetchRows = async () => {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setRows(data); 

        const response_price = await fetch(`http://localhost:5198/api/products/prices`);
        const data_price = await response_price.json();

        filters.minPrice = data_price.minPrice;
        filters.maxPrice = data_price.maxPrice;
    }

    useEffect(() => {fetchRows();}, [filters, currentPage])


    const handleConfirmDelete = async () => {
        if(productToDelete){
            await fetch(`http://localhost:5198/api/products/${productToDelete.id}`, { method: 'DELETE' });
        
            fetchRows();

            setShowDeletePopup(false);
            setProductToDelete(null);
        }
    } 

    const handleCancelDelete = () => {
        setShowDeletePopup(false);
        setProductToDelete(null);
    }

    const handleAddButton = () => {
        if(productFormsProduct.id){
            setProductFormsProduct({});
        }
        setShowProductForm(true);
    }

    const handleSubmitForm = async (product: IProductUpsert) => {
        var url = "";
        var method = "";

        if(product.id){
            url = `http://localhost:5198/api/Products/${product.id}`;
            method = "PATCH";
        }else{
            url = `http://localhost:5198/api/Products`;
            method = "POST";
        }

        const response = await fetch(url, {
            method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            console.error("Failed to submit product");
            return;
        }

        await fetchRows();
        setShowProductForm(false);
        setProductFormsProduct({});
    }

    const handleCloseForm = () => {
        setShowProductForm(false);
    }

    return (
        <>
            <div className="w-100">
                <table className="table table-borderless">
                    <thead>
                        <tr className="border">
                            {columns?.map((column) => 
                                <th key={column}>{column}</th> 
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {rows?.products &&  
                            rows.products.map((row) => 
                                <tr className="border" key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.description}</td>
                                    <td>{(row.cost / 100).toLocaleString('nb-NO', {minimumFractionDigits: 2, maximumFractionDigits: 2})} kr</td>
                                    <td>
                                        <img 
                                            src={edit} 
                                            height="25" 
                                            onClick={() => {
                                                setProductFormsProduct({...row}); 
                                                setShowProductForm(true);
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <img 
                                            src={deleteIcon} 
                                            height="25" 
                                            onClick={() => {
                                                setShowDeletePopup(true);
                                                setProductToDelete(row);
                                            }}
                                        />
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                <Pagination
                    pageLenght={pageLenght}
                    totalNumberOfElements={rows?.totalCount ?? 0}
                    activePage={currentPage}
                    onClick={setCurrentPage}
                />
                
                <AddButton
                onClick={() => {handleAddButton()}}
                />

                {showProductForm && 
                    <ProductForm 
                        title={productFormsProduct.id ? "Edit product" : "Create product"}
                        product={productFormsProduct}
                        onChange={setProductFormsProduct}
                        onClose={() => handleCloseForm()}
                        onSubmit={() => handleSubmitForm(productFormsProduct)}
                    />
                }
                
                {showDeletePopup && (
                    <DeletePopup 
                        name={productToDelete?.name}
                        onConfirm={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                    />
                )}
            </div>

        </>
    )   
}

export default Table;