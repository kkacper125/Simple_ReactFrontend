import { useState } from "react";

interface PriceInputProps {
    value: number;
    onChange: (value: number) => void;
}
  
export function PriceInput({ value, onChange }: PriceInputProps) {
    const [_value, _setValue] = useState<string>(
                                                    new Intl.NumberFormat('nb-NO', {
                                                        style: 'currency',
                                                        currency: 'NOK',
                                                    }).format(value / 100)
                                                );

    const formatPrice = () => {
        const sanitizedValue = _value.replace(',', '.').replace(/[^0-9.]/g, '');
        const floatValue = parseFloat(sanitizedValue);

        if(!isNaN(floatValue)){
            _setValue( 
                new Intl.NumberFormat('nb-NO', {
                    style: 'currency',
                    currency: 'NOK',
                }).format(floatValue)
            );    
            onChange(floatValue*100);
        }
    };

    return (
        <input
            type="text"
            value={_value}
            onChange={(e) => _setValue(e.target.value)}
            onBlur={() => formatPrice()}
            placeholder="0,00"
            className="form-control"
        />
    );
};
