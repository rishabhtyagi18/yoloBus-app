import React, { useEffect, useState } from 'react';
import { valueReducer, getDateFromTimeStamp, amountFormatter } from '../../constant/utitlity';
import './BusSchedule.css';

const BusSchedule = ({data, tableHeaders, selectItem, pnrID, amountID, contactID, dateID}) => {

    const [content, setContent] = useState(data);
    const [sortedId, setSortedId] = useState(tableHeaders?.reduce((acc, header) => acc!=null && header.sortable ? header.id : acc, null));
    const [sortUp, setSortDir] = useState(true);

    useEffect(() => {
        setContent(data);
    }, [data]);

    useEffect(() => {
        const newContentArray = [...content].sort((a,b) => {
            const valueA = valueReducer(sortedId, a);
            const valueB = valueReducer(sortedId, b)
            let comparison = 0;
            switch(typeof valueA) {
                case 'string':
                    comparison = valueA.localeCompare(valueB);
                    break;
                case 'number':
                    default:
                    comparison = (valueA - valueB)
            }
            return sortUp ? comparison : -comparison;
        });

        JSON.stringify(newContentArray) === JSON.stringify(content) || setContent(newContentArray);
    }, [sortUp, sortedId, content])

    const handleTableHeaderClick = (e, id, sortable) => {
        if(!sortable) return;
        setSortDir( id === sortedId ? !sortUp : true);
        console.log(id)
        setSortedId(id);
    };

    return (
        <div className="busSchedule">
        <table className='scheduleTable'>

            <thead>
                <tr>
                {
                    tableHeaders.map(element => {
                        return (
                            <th className={`headerItem` + (!element.sortable ? '' : (element.sortable && ` headerSortable${sortedId === element.id ? (sortUp ? 'sortUp':' sortDown') : ''}`))} 
                                key={element.id} onClick={e => handleTableHeaderClick(e, element.id, element.sortable)}>
                                {element.name}
                            </th>
                        );
                    })
                }
                </tr>
            </thead>
            <tbody>
                {
                    content.length ? content.map(element => {
                        return (<tr className="scheduleRow" key={element[tableHeaders[0].id]}>
                    {
                        tableHeaders.map(header => {
                            return (
                                <td className="schedulerItem" key={header.id}>
                                {
                                    element && header?.id?.split('.').reduce((result, id) => {
                                        switch (id) {
                                            case pnrID: 
                                                return <a href={`/pnr/${result[id]}`} onClick={e => {
                                                    e.preventDefault();
                                                    selectItem(element);
                                                }}>{result[id]}</a>
                                            case dateID: 
                                                return getDateFromTimeStamp(result[id]);
                                            case contactID: 
                                                return <a href={`tel://${result[id]}`}>{result[id]}</a>;
                                            case amountID: 
                                                return amountFormatter(result[id])
                                            default:
                                                return result[id];
                                        }
                                    }, element)
                                }
                                </td>
                            )
                        })
                        }
                        </tr>);
                    }) : 
                    <div><tr>
                        <td style={{textAlign: "center", paddingTop: "30px", fontSize: '3em', fontWeight: '200'}} colSpan={7}>Ooops!</td>
                        </tr>
                        <tr>
                        <td style={{textAlign: "center", paddingBottom: "30px", fontSize: '1.75em', fontWeight: '200'}} colSpan={7}>Not found</td>
                    </tr>
                    </div>
                }
            </tbody>
        </table>
        </div>
    );
};

export default BusSchedule;