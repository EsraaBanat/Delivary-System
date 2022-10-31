// const axios = require('axios')

const getResturants = async (dataGiven) => {
  // console.log('INSIDE SERVICE 1',dataGiven);;
  try {
    const {data}= await window.$nuxt.$axios.post(
      'http://localhost:30202/getResturants',dataGiven
      );
    // console.log('INSIDE SERVICE 2',data);;
    return data          
  } catch (error) {
    throw error
  }
}

const addResturant = async (newResturant) => {
  try {
    // console.log('INSIDE SERVICE',newResturant);
    const { data } = await window.$nuxt.$axios.post('http://localhost:30202/createResturant', newResturant)
    return data
  } catch (error) {
    throw error
  }
}

const updateResturant=async (resturantDTO)=>{
  // console.log(resturantDTO);
  try {
    const data= await window.$nuxt.$axios.post(
       'http://localhost:30202/updateResturant',resturantDTO
     );
    //  console.log(data);
     return data          
   } catch (error) {
     throw error
   }
}

const deleteResturant = async (id) => {
  try {
   const {data}= await window.$nuxt.$axios.post(
      'http://localhost:30202/deleteResturant',id
    );
    return data          
  } catch (error) {
    throw error
  }
}


module.exports = {
  addResturant,
  getResturants,
  updateResturant,
  deleteResturant
}
