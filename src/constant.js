

const apiKey = import.meta.env.VITE_API_KEY
export const options = {
    method: 'GET',
    url: 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary',
    params: {
      bl_lat: '35.513139',
      bl_lng: '26.624157',
      tr_lat: '41.88482',
      tr_lng: '44.158337',
      limit: '300'
    },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
    }
  };

  export const options2 = {
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
    }
  }