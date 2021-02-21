import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { valueReducer } from "../../constant/utitlity";

let NumberFilter = ({content, resetAllFilters, setFilteredContent, contactID, pnrID}, ref) => {

    const [filterNumber, setFilterNumber] = useState(null);

    useImperativeHandle(ref, () => ({
        resetNumSearch: () => {
            setFilterNumber(null);
        }
    }));

    useEffect(() => {
        console.log(filterNumber)
        if (!filterNumber) {
            setFilteredContent([...content])
            return;
        }
        setFilteredContent(content.filter(item => {
            return `${valueReducer(pnrID, item)}`.includes(filterNumber) || `${valueReducer(contactID, item)}`.includes(filterNumber);
        }));
    }, [filterNumber, content, pnrID, contactID, resetAllFilters, setFilteredContent])

    const handleNumberChange = e => {
        resetAllFilters();
        setFilterNumber(e.target.value || null)
    }

    return (
        <div>
            <label className="label" htmlFor="numberFilter">Number Search</label>
            <input className='input' id="numberFilter" type="number" onChange={handleNumberChange} value={filterNumber ? filterNumber : ''} placeholder="Search PNR"></input>
        </div>
       
    );
}

NumberFilter = forwardRef(NumberFilter);

export default NumberFilter;