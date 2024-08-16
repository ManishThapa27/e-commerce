// Getting all products from server
import React, { useEffect, useState } from 'react';
import {fetchAllProducts,fetchProductCategories} from '../../apis/product-api';
import Grid from './grid';
import ListView from './list';
import './products.css';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowDropDown';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const Products = () => {

  const [productList,setProductList] = useState([]);
  const [filteredList,setFilteredList] = useState([]);
  const [productCategories,setProductCategories] = useState([]);
  const [sortedColumn,setSortedColumn] = useState("-1");
  const [prodCategory,setProdCategory] = useState("-1");
  const [priceRange, setPriceRange] = useState([0,1500]);  
  const [isGridView,setIsGridView] = useState(true);

  useEffect(()=>{
    fetchAllProducts().then(result=>{
      setProductList(result);
      setFilteredList(result);      
    });
    fetchProductCategories().then(result=>{
      result.sort();
      setProductCategories(result);
    })
  }, []);



  /**
   * To search product by name in the search box.
   * @param {*} e 
   */
  const searchProduct = (e)=>{
    console.log(e.target.value);
    if(e.target.value === ""){
        setFilteredList(productList);
    }else{
        const filterList = productList.filter(p=>p.title.toLowerCase().indexOf(e.target.value.toLowerCase())>-1)
        setFilteredList(filterList);
    }
  }
  

  /**
   * To filter records as per price range and category when user select categoy from the dropdown.
   * @param {*} e 
   */
  const getCategoryProducts = (e)=>{
    setProdCategory(e.target.value);  
    if(e.target.value === "-1"){
        setFilteredList(productList.filter(x=>x.price >= priceRange[0] && x.price <= priceRange[1]));
      }else{
        setFilteredList(productList.filter(x=>x.category === e.target.value && (x.price >= priceRange[0] && x.price <= priceRange[1])));
      }

  }

/**
 * To select column from dropdown for applying sorting.
 * @param {*} e 
 */
  const selectColumnForSorting = (e)=>{
    setSortedColumn(e.target.value); 
  }

  

  /**
   * To sort the records in accending order by selected column.
   * @param {*} e 
   */
  const accendingSort = (e) =>{
    if(sortedColumn === "price"){
      const sortedlist = filteredList.sort((a,b)=> a.price - b.price)
      setFilteredList(sortedlist.filter(x=>x!= null))
    }
    else if(sortedColumn === "title"){
      const sortedlist = filteredList.sort((a,b)=> a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1)
      setFilteredList(sortedlist.filter(x=>x!= null))
    }else{
      alert("Please select column.");
    }
  }

  /**
   * To sort the records in descending order by selected column.
   * @param {*} e 
   */
  const descendingSort = (e) =>{
    if(sortedColumn === "price"){
      const sortedlist = filteredList.sort((a,b)=> b.price - a.price)
      setFilteredList(sortedlist.filter(x=>x!= null))
    }
    else if(sortedColumn === "title"){
      const sortedlist = filteredList.sort((a,b)=> b.title.toUpperCase() < a.title.toUpperCase() ? -1 : 1)
      setFilteredList(sortedlist.filter(x=>x!= null))
    }else{
      alert("Please select column.");
    }
  }

  /**
   * To filter records as per price range and category when user changes the price range.
   * @param {*} event 
   * @param {*} newValue 
   */
  const handleChange = (event, newValue) => {
    setPriceRange(newValue);

    const sortedlist = prodCategory !== "-1"? productList.filter(x=> x.category === prodCategory && x.price >= newValue[0] && x.price <= newValue[1]):
    productList.filter(x=> x.price >= newValue[0] && x.price <= newValue[1]);
    setFilteredList(sortedlist.filter(x=>x!= null))
  };

  /**
   * To set the layout
   * @param {*} e 
   * @param {*} v 
   */
  const setLayout = (e,v) => {
    setIsGridView(v);
  }


  return (
    <>
    <nav className="navbar">
        <div className="logo">E-Commerce Assignment</div>
        <input type="checkbox" id="menu-toggle" className="menu-toggle"/>
        <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
        <ul className='feature-bar'>          
          <li><input className='search-box' type='text' placeholder='Product Name' onChange={searchProduct}/></li>
          <li>
          <div style={{display:'flex', justifyContent: 'center'}}>
            <select className='select-category' onChange={getCategoryProducts}>
              <option value="-1">All Category</option>
              {
                productCategories.map((prod,ind)=>{
                  return <option key={'option' + ind} value={prod}>{prod}</option>
                })
              }              
            </select>
            </div>
          </li>
          <li>
          <div style={{display:'flex', justifyContent: 'center'}}>            
            <Box sx={{ width: 200 }}>
            <Slider
        getAriaLabel={() => 'Temperature range'}
        value={priceRange}
        max={1500}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={(value)=> value.toString()}
      />
      </Box>
            </div>
          </li> 
          <li>
            <div style={{display:'flex', justifyContent: 'center'}}>
              <select onChange={selectColumnForSorting}>
              <option value="-1">Sort</option>
              <option value="price">Price</option>
              <option value="title">Title</option>
            </select>
            <ArrowCircleUpIcon style={{cursor:'pointer', color: '#fff'}} onClick={accendingSort}/>
            <ArrowCircleDownIcon style={{cursor:'pointer', color: '#fff'}} onClick={descendingSort}/>
            
            </div>            
          </li>         
          <li>
          <div style={{display:'flex', justifyContent: 'center'}}>
            <FormControlLabel control={<Switch defaultChecked onChange={setLayout} />} label="Grid Layout" style={{color:'#fff'}} />
          </div>
          </li>
          
      </ul>
    </nav>
    <nav className="app-container">
    {filteredList.length> 0?
      isGridView ? <Grid items={filteredList}/>: <ListView items={filteredList}/>
      : <p>No Product available</p>}
    </nav>
    </>
  );
}

export default Products;
