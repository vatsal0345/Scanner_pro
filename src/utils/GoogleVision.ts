

const API_URL = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBX_JjbnYDFTCNCxq38FnoFYMMf_fGvFlw'

const getTextFromImage = async (image) => {

    const data = {
        requests: [
            {
                image: {
                    content: image,
                },
                features: [
                    {
                        type: 'TEXT_DETECTION',
                        maxResults: 1,
                    },
                ],
            },
        ],
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    const json = response.json()
    return json
}

export default getTextFromImage;