import React, { useState, useEffect, useRef, useCallback } from 'react';
import BusSchedule from '../BusSchedule/BusSchedule';
import PageFilters from '../PageFilters/PageFilters';
import Pagination from '../Pagination/Pagination';
import PopUp from '../PopUp/PopUp';

const Journey = () => {
    const [filteredContent, setFilteredContent] = useState([]);
    const [itemsPerPage] = useState(10)
    const formPopupRef = useRef(null);
    
    const tableHeadersMap = [{
        id: 'pnr',
        name: 'PNR No.'
    },{
        id: 'locationStart',
        name: 'From Location'
    },{
        id: 'locationEnd',
        name: 'To Location'
    },{
        id: 'date',
        name: 'Date of Journey',
        sortable: true
    },{
        id: 'passangerDetails.name',
        name: 'Name of passenger',
        sortable: 'true'
    },{
        id: 'passangerDetails.number',
        name: 'Contact number'
    },{
        id: 'amount',
        name: 'Total Amount'
    }];
    
    const data = [];

    const [content, setContent] = useState(data);
    const [tableHeaders] = useState(tableHeadersMap)

    const [paginatedData, setPaginatedData] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setPaginatedData([...filteredContent].splice(0, itemsPerPage));
        console.log(filteredContent);
    }, [filteredContent, itemsPerPage])

    const contentLoaded = content => {
        setLoading(false)
        setContent(content)
    };

    const selectItem = useCallback((item) => {
        formPopupRef.current.showItem(item);
    }, [])
    
    useEffect(() => {
        const apiUrl = 'http://demo2980258.mockable.io/journey';
        fetch(apiUrl)
        .then(res => res.json())
        .then(contentLoaded)
        
      }, [])

    return (
        <div>
            {loading ? 
                <div className='loader'></div> 
                : 
                <div>
                    <PageFilters 
                        {...{content, filteredContent, setFilteredContent}} 
                        pnrID={`pnr`} 
                        nameID={`passangerDetails.name`}
                    />
                    <BusSchedule  
                        data={paginatedData} 
                        {...{selectItem, tableHeaders}} 
                        pnrID={`pnr`} 
                        dateID="date" 
                        contactID='passangerDetails.number' 
                        amountID="amount"
                    />
                    <Pagination 
                        {...{filteredContent, itemsPerPage, setPaginatedData}} />
                    <PopUp 
                        ref={formPopupRef} 
                        pnrID={`pnr`} 
                        fromLocationID="locationStart" 
                        toLocationID='locationEnd' 
                        dateID="date" 
                        contactID='passangerDetails.number' 
                        amountID="amount" 
                        nameID={`passangerDetails.name`} />
                </div>
            }
        </div>
    );
}

export default Journey;