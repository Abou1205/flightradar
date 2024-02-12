import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constant";

export const getFlights = createAsyncThunk("flight/getFlights", async() => {
    // api request
    const res = await axios.request(options)
    
    // data formatting
    const formattedData = res.data.aircraft.map((i) => ({
        id: i[0],
        code: i[1],
        lat: i[2],
        lng: i[3]
    }))

    // payload 
    return formattedData
    
})