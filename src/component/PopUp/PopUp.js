import { amountFormatter, valueReducer } from "../../constant/utitlity";
import './PopUp.css';

const { forwardRef, useState, useImperativeHandle, useRef, useEffect } = require("react")

let PopUp = ({nameID, pnrID, fromLocationID, toLocationID, dateID, contactID, amountID}, ref) => {

    const [isEnabled, setEnabled] = useState(false);
    const [item, setItem] = useState(null);

    useImperativeHandle(ref, () => ({
        showItem: (item) => {
            setItem(item);
            setEnabled(true);
        }
    }));

    const dateRef = useRef(null);

    useEffect(() => {
        if(dateRef.current) {
            dateRef.current.valueAsNumber = valueReducer(dateID, item);
        }
    }, [dateID, item]);

    const handleClose = () => {
        setEnabled(false);
        setItem(null)
    }
    return (item && <div className={`formPopup${isEnabled ? ' popupEnabled' : ''}`}>
            <button className="popupClose" onClick={handleClose}>Close</button>
            <form action="">
                <fieldset>
                    <div>
                        <label className="popupLabel" htmlFor="form-pnr">PNR</label>
                        <input id="form-pnr" className='popupInput' type="number" disabled={true} value={valueReducer(pnrID, item)}></input>
                    </div>
                    
                    <div>
                        <label className="popupLabel" htmlFor="form-from-location">From Location</label>
                        <input id="form-from-location" className='popupInput' type="text" disabled={true} value={valueReducer(fromLocationID, item)}></input>
                    </div>
                    
                    <div>
                        <label className="popupLabel" htmlFor="form-to-location">To Location</label>
                        <input id="form-to-location" className='popupInput' type="text" disabled={true} value={valueReducer(toLocationID, item)}></input>
                    </div>
                    
                    <div>
                        <label className="popupLabel" htmlFor="form-date">Date of Journey</label>
                        <input id="form-date" className='popupInput' type="date" disabled={true} ref={dateRef}></input>
                    </div>
                    
                    <div>
                        <label className="popupLabel" htmlFor="form-name">Name of Passanger</label>
                        <input id="form-name" className='popupInput' type="text" disabled={true} value={valueReducer(nameID, item)}></input>
                    </div>
                    <div>
                        <label className="popupLabel" htmlFor="form-contact">Contact Number</label>
                        <input id="form-contact" className='popupInput' type="number" disabled={true} value={valueReducer(contactID, item)}></input>
                    </div>
                    <div>
                        <div className='popupInput popupTotal'>Total: {amountFormatter(valueReducer(amountID, item))}</div>
                    </div>
                    <div>
                        <input  className="popupInput popupSubmit" type="submit" value="Submit"></input>
                    </div>
                    
                </fieldset>
            </form>
        </div>
        );
}

PopUp = forwardRef(PopUp);

export default PopUp;