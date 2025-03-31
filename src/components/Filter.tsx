import TextInput from "./TextInput";
import RangeSlider from "./RangeSlider";
import { useEffect, useState } from "react";
import { IFilter } from "../intefaces/IFilter";

interface Props{
    filter: IFilter

    onFiltersChange: (filter: {name: string, minPrice:number, maxPrice:number}) => void
}

function Filter({filter, onFiltersChange}: Props) {

    const [minPrice, setMinPrice] = useState(0); 
    const [maxPrice, setMaxPrice] = useState(0);
    const [loading, setLoading] = useState(true);

    const apiUrl = `http://localhost:5198/api/products/prices`

    useEffect(() => {
        const fetchPrices = async () => {
            const response = await fetch(apiUrl);
            const data = await response.json();

            onFiltersChange({...filter, minPrice: data.minPrice, maxPrice: data.maxPrice})

            setMinPrice(data.minPrice);
            setMaxPrice(data.maxPrice);

            setLoading(false);
        }

        fetchPrices();
    }, [])
    
    return (  
        <div className="col-md-3">
            <div className="card p-3 rounded-0 bg-success-subtle h-100">
                <div className="mb-5">
                    <TextInput 
                        value={filter.name}
                        placeholder="Enter product name"
                        onChange={(value) => onFiltersChange({...filter, name: value})}
                    />
                </div>
                {loading ? 
                    <div className="d-flex align-items-center">
                        <strong role="status">Loading...</strong>
                        <div className="spinner-border ms-auto" aria-hidden="true"></div>
                    </div> 
                    : 
                    <RangeSlider 
                        title="Price"
                        minNumber={minPrice}
                        maxNumber={maxPrice}
                        onChange={(minVal, maxVal) => onFiltersChange({...filter, minPrice: minVal, maxPrice: maxVal})}
                    />
                }
            </div>
        </div>
    );
}

export default Filter