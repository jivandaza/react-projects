import summaryApi from "../common";

const fetchProductsByCategory = async (category) => {
    const dataResponse = await fetch(summaryApi.productsByCategory.url,{
        method: summaryApi.productsByCategory.method,
        headers: {
            'content-type': 'application/json'
        },
        body : JSON.stringify({
            category: category
        })
    });

    const response = await dataResponse.json()

    return response;
};

export default fetchProductsByCategory;