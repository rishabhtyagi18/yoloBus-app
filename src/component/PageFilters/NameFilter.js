import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { valueReducer } from '../../constant/utitlity';
import './css/NameFilter.css';

let NameFilter = ({content, nameID, setFilteredContent, resetAllFilters}, ref) => {
    const [list, setList] = useState([]);
    const [filteredText, setFilteredtext] = useState('');
    useEffect(() => {
        setList([
            ...new Set(content?.filter(item => {
                return filteredText?.trim() === '' || valueReducer(nameID, item)?.toLowerCase().includes(filteredText?.toLowerCase().trim());
            }).map(item => valueReducer(nameID, item)))
        ].slice(0, 5));
    }, [filteredText, content, nameID]);

    const handleSuggestionClick = e => {
        updateInput(e.target.textContent.trim(), true);
        setList([]);
    }

    useEffect(() => {
        const contentUpdated = content?.filter(item => {
            return filteredText?.trim() === '' || valueReducer(nameID, item)?.toLowerCase().includes(filteredText?.toLowerCase().trim());
        });
        setFilteredContent(contentUpdated);
    }, [content, filteredText, nameID, setFilteredContent]);

    const updateInput = (value, shouldResetDateFilter) => {
        setFilteredtext(value);
        shouldResetDateFilter && resetAllFilters('name');
    }
    
    useImperativeHandle(ref, () => ({
        resetSearchView: ()=> {
            setList([]);
            updateInput('');
        }
    }));

    return (
        <div className="search">
                <label className="label" htmlFor="name-search" >Name Search</label>
                <input id="name-search" className="searchInput input" type="search" onChange={e => updateInput(e.target.value, true)} placeholder={`Search Name`} value={filteredText} />

            {
             (list?.length) ? (<ul className="searchSuggestion">
                {
                    list?.map(element => {
                        return (
                            <li className="searchItem-item" key={element} role="button" onClick={handleSuggestionClick}>{element} </li>
                        )
                    })
                }
            </ul>) : null
            }
        </div>
    )
}

NameFilter = forwardRef(NameFilter);

export default NameFilter;
