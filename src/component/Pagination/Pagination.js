import { useEffect, useState } from "react";
import './Pagination.css';

const Pagination = ({filteredContent, setPaginatedData, itemsPerPage = 10}) => {
    const [pageNumber, setPageNumber] = useState(1);

    const [maxPagesNumber, setMaxPagesNumber] = useState(0);

    useEffect(() => {
        let newData = [];
        if (pageNumber > maxPagesNumber ) {
            newData = [...filteredContent].splice(0, itemsPerPage);
        } else {
            newData = [...filteredContent].splice((itemsPerPage * (pageNumber - 1)), itemsPerPage);
        }
        setPaginatedData(newData);
    }, [pageNumber, itemsPerPage, filteredContent, setPaginatedData, maxPagesNumber]);

    useEffect(() => {
        setMaxPagesNumber(Math.ceil(filteredContent.length / itemsPerPage));
        setPageNumber(1)
    }, [filteredContent.length, itemsPerPage])

    const renderButtons = () => {
        let data = [];
        if ( pageNumber > 1) data.push((
            <li key="prev" className='paginationItem'>
                <button onClick={() => setPageNumber(pageNumber - 1)} className={ 'paginationButton'}>Prev</button>
            </li>
        ))
        for (let index = 0; index < (maxPagesNumber); index++) {
            data.push(
                <li key={`pagination${index}`} className='paginationItem'>
                    <button onClick={() => setPageNumber(index + 1)} className={ 'paginationButton' + ((index === pageNumber - 1) ? ' buttonActive' : '')}>{index + 1}</button>
                </li>
            );
        }
        if (pageNumber < maxPagesNumber) data.push((
            <li className='paginationItem' key="next" >
                <button onClick={() => setPageNumber(pageNumber + 1)} className={ 'paginationButton'}>Next</button>
            </li>
        ));
        return data;
    }

    return (
        <ul className="pagination">
            {
                renderButtons()
            }
        </ul>
    )
};

export default Pagination;