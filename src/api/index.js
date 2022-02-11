import axios from 'axios'


export const getPlacesData = async (sw,ne) => {
    try {

        var options = {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
              'x-rapidapi-key': '0c20398768mshc8fa476a55e7a2fp194ba8jsn61ca42d635fc'//'b8b2a7a196msh89671ab7ecf88a1p16c90bjsn28e9641c5ae9'
            }
        };

        const value = await axios.get('https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary', options)

        return value.data
    } catch(error) {
        console.log(error)
    }
}