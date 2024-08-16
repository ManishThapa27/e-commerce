import Pagination from '@mui/material/Pagination';
import './list.css'
import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

/**
 * To display data in list layout
 * @param {*} param0 
 * @returns 
 */
const ListView = ({items}) =>{
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
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
            filterItems.map((item,i)=>{
                return <>
                <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" sx={{ width: 75, height: 75, padding:2 }} src={item.image} />
        </ListItemAvatar>
        <ListItemText
          primary={item.title + " - $" + item.price}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Desciption
              </Typography>
              {item.description}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
                </>
            })
        }      
    </List>
    <Pagination className='list-pagination' count={totalPages} color="primary" onChange={changePage} />
    </>
);
}

export default ListView;