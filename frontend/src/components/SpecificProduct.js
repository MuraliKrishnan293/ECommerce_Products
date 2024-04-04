import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SpecificProduct = () => {
    const [data,setData] = useState([])
    const { id } = useParams();
    const authToken = localStorage.getItem('authToken')

    useEffect(() => {
      const fetchData = async()=>{
        try {
            const res = await axios.get(`http://localhost:5000/app/getsingledata/${id}`,{
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            //console.log(res)
            setData(res.data);
            // console.log(data)
        } catch (error) {
           console.log(error) 
        }
      }
      fetchData();
    }, [])
    

  return (
    <div className='container'>
        <div className='row p-3 d-flex justify-content-center text-center'>
            <div className='p-3 col-12 col-md-10'>
                <div className='row card d-flex flex-row' style={{height:'450px'}}>
                <div className='col-12 pt-5 d-flex align-items-center col-md-6'><img src={data.image} className='img-fluid rounded card-img-top' style={{height:'300px'}} /></div>
                    <div className='col-12 col-md-6 d-flex justify-content-center text-center flex-column align-items-center'><div className='card-title'>{data.title}</div>
                    <div className='card-subtitle'>{data.category}</div>
                    <div className='card-text'>{data.description}</div></div>
                    <h6 className='rounded text-warning'>Price ${data.price}</h6>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SpecificProduct