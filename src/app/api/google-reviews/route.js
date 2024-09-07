import { NextResponse } from 'next/server';

export async function GET() {
    const placeId = process.env.PLACE_ID; 
    const apiKey = process.env.GOOGLE_API_KEY;
    const language = 'fr'; 
    let allReviews = [];
    let nextPageToken = '';

    const fetchReviews = async (pageToken = '') => {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&language=${language}&key=${apiKey}`;
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
    
            if (data.status === 'OK') {
                allReviews = [...allReviews, ...data.result.reviews];
                nextPageToken = data.next_page_token || '';
            } else {
                console.error(`API Error: ${data.status} - ${data.error_message || 'Unknown error'}`);
                throw new Error(`API Error: ${data.status}`);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            throw new Error('Failed to fetch reviews');
        }
    };

    try {
        await fetchReviews();

        while (nextPageToken) {
            await new Promise(resolve => setTimeout(resolve, 3000)); 
            await fetchReviews(nextPageToken);
        }

        return NextResponse.json(allReviews);
    } catch (error) {
        console.error("Final Error:", error);
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}
