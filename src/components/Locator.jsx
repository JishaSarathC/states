import { useState, useEffect } from "react";
const API_ENDPOINT= "https://location-selector.labs.crio.do/countries";

 function Locator(){
    const [countries, setCountries]=useState([]);
    const [countryName, setCountryName] =useState("");
    const [states, setStates]=useState([]);
    const [stateName, setStateName]=useState("");
    const [cities, setCities]=useState([]);
    const [cityName,setCityName]=useState("");
   

    useEffect(()=>{
        const fetchCountries= async()=>{
        
            const response= await fetch(API_ENDPOINT);
            const jsonResponse=await response.json();
            console.log("Countries API data:",jsonResponse);
            setCountries(jsonResponse);
          };

          fetchCountries();
    },[]);

    useEffect(()=>{
      if (!countryName) return;
      const fetchStates=async()=>{
        try{
        const response=await fetch(`https://location-selector.labs.crio.do/country=${countryName}/states`);
        const jsonResponse=await response.json();
        setStates(Array.isArray(jsonResponse)?jsonResponse:[]);
      }catch(error){
        console.error("Error fetching states:", error);
        setStates([]);
      }
      };

      fetchStates();
    },[countryName]);

    useEffect(()=>{
      if (!countryName || !stateName) return;
      const fetchCities=async()=>{
        try{
          const response =await fetch(`https://location-selector.labs.crio.do/country=${countryName}/state=${stateName}/cities`);
          const jsonResponse=await response.json();
          setCities(Array.isArray(jsonResponse)? jsonResponse : []);
        }catch(error){
          console.error("Error fetching cities:",error);
          setCities([]);
        }
      }
      fetchCities();
    },[countryName, stateName]);

    const handleCountryChange=(e)=>{
      setCountryName(e.target.value);
      setStateName("");      
    };
    const handleStateChange=(e)=>{
      setStateName(e.target.value);
      setCityName("");
    };
    const handleCityChange=(e)=>{
      setCityName(e.target.value);
    }
   
    return(
    <div>
    <h2>Select Location</h2>
    <div style = {{display:"flex", gap:"20px"}}>
    
    <select style={{width:"250px"}} value={countryName} onChange={handleCountryChange}>
         <option value= "">Select Country</option>
        {countries.map((country_name)=>(
          <option key={country_name} value={country_name}>{country_name}</option>
        ))}
      
    </select>
      
        <select value={stateName} onChange={handleStateChange} disabled={!countryName}>
      <option value= "">Select State</option>
     {states.map((state_name)=>(
    <option key={state_name} value={state_name}>{state_name}</option>
  ))}
    </select>
     
        <select value={cityName} disabled={!stateName} onChange={handleCityChange}>
      <option value= "">Select City</option>
    {cities.map((city_name)=>(
      <option key={city_name} value={city_name}>{city_name}</option>
    ))}
    </select>

    </div>
      <p>You selected {cityName}, {stateName} ,{countryName}</p>
    </div>
    );
}

export default Locator;