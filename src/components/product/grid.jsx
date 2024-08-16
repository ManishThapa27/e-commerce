import Pagination from '@mui/material/Pagination';
import './grid.css'
import { useEffect, useState } from 'react';

/**
 * To display data in grid layout.
 * @param {*} param0 
 * @returns 
 */
const Grid = ({items}) =>{
    let [currentPage, setCurrentPage] = useState(1) ;
    let perPage = 4;
    let totalPages = (items.length%perPage === 0) ? parseInt(items.length/perPage): parseInt(items.length/perPage) + 1;
    let startRecord = (currentPage-1) * perPage;
    let endRecord = startRecord + perPage; 
    let filterItems = items.filter((v,i,a)=> i >= startRecord && i< endRecord );


    useEffect(()=>{
        setCurrentPage(1);
    },[])

    /**
     * To change the page number
     * @param {*} e 
     * @param {*} v 
     */
    const changePage = (e,v)=>{
        setCurrentPage(v)
    }

    return(<> 
    <div className="grid-container">
        {
            filterItems.map((item)=>{
                return <div className="grid-item" key={'griditem'+item.id}>
                            <img src={item.image} alt={item.title} style={{width:'100%', aspectRatio:'1/1'}}/>
                            <p className='item-title'>{item.title}</p>                                                                                       
                            {/* <p className='item-desc' title={item.description}>{item.description}</p> */}
                            <p className='item-price'>{'$'+item.price}</p>           
                        </div>
            })
        }      
    </div>
    <Pagination className='grid-pagination' count={totalPages} color="primary" onChange={changePage} />
    </>
);
}

export default Grid;