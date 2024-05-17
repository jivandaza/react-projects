import summaryApi from "../common";

const fetchProductsByCategory = async (category) => {
    const response = await fetch(summaryApi.productsByCategory.url,{
        method: summaryApi.productsByCategory.method,
        headers: {
            'content-type': 'application/json'
        },
        body : JSON.stringify({
            category: category
        })
    });

    const data = await response.json()

    return data;
};

export default fetchProductsByCategory;