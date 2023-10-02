import axios from 'axios'
import { NextResponse } from 'next/server'
const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const SearchText = searchParams.get('q')

    // const response = await axios.get(`${BASE_URL}?q=${SearchText}?language=en&limit=6&session_token=5ccce4a4-ab0a-4a7c-943d-580e55542363&country=EGY&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`,
    const response = await axios.get(BASE_URL + '?q=' + SearchText + '?&country=eg&session_token=5ccce4a4-ab0a-4a7c-943d-580e55542363'
        + "&access_token=" + process.env.MAPBOX_ACCESS_TOKEN,
        {
            headers: {
                "Content-Type": "application/json"
            }
        })

    // return NextResponse.json(await response.data)
    return NextResponse.json(response.data)

}   