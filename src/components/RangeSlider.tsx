import { useCallback, useEffect, useRef, useState } from "react";


interface Props{
    title: string,
    minNumber: number,
    maxNumber: number,
    onChange: (minval: number, maxVal: number) => void
}


function RangeSlider({title, minNumber, maxNumber, onChange} : Props){

    const [minVal, setMinVal] = useState(minNumber);
    const [maxVal, setMaxVal] = useState(maxNumber);

    const minValRef = useRef<HTMLInputElement | null>(null);
    const maxValRef = useRef<HTMLInputElement | null>(null);

    const range = useRef<HTMLDivElement | null>(null);

    const getPercent = useCallback(
        (value: number) => Math.round(((value - minNumber) / (maxNumber - minNumber)) * 100), 
        [minNumber, maxNumber]
    );

    useEffect(() => {
        if(maxValRef.current){
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value);

            if(range.current){
                range.current.style.left = `${minPercent}%`
                range.current.style.width = `${maxPercent - minPercent}%`
            }
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${(maxPercent - minPercent)}%`;
            }
        }
    }, [maxVal, getPercent]);



    return (
        <>
            <label className="form-label mb-3">{title}</label>
            <input 
                type="range" 
                min={minNumber} 
                max={maxNumber}
                value={minVal}
                ref={minValRef} 
                className={minVal > maxNumber -100 ? "thumb thumb-zindex-5" : "thumb thumb-zindex-3"} 
                onChange={(event) => {
                    const value = Math.min(+event.target.value, maxVal -1);
                    setMinVal(value);
                }}
                onMouseUp={() => onChange(minVal, maxVal)}
            />
            
            <input 
                type="range" 
                min={minNumber}
                max={maxNumber}
                value={maxVal}
                ref={maxValRef}
                className="thumb thumb-zindex-4" 
                onChange={(event) => {
                    const value = Math.max(+event.target.value, minVal+1);
                    setMaxVal(value);
                }}
                onMouseUp={() => onChange(minVal, maxVal)}
            />

            <div className="slider">
                <div className="slider__track"/>
                <div ref={range} className="slider__range"/>
                <div className="d-flex justify-content-between">
                    <div className="slider__left-value">{(minVal / 100).toLocaleString('nb-NO', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                    <div className="slider__right-value">{(maxVal / 100).toLocaleString('nb-NO', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                </div>
            </div>
        </>
    );
};

export default RangeSlider;