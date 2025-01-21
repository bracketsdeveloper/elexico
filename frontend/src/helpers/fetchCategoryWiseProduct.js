const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async(category)=>{
    const response = await fetch(SummaryApi.categorywiseProducts.url,{
        method:SummaryApi.categorywiseProducts.method,
        headers :{
            "content-type":"application/json"
        },
        body : JSON.stringify({
            category:category
        })
    })
    const dataResponse = await response.json()
    return dataResponse
}

export default fetchCategoryWiseProduct