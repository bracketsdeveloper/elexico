const displayINRCurrency = (number) =>{
    const formatter = new Intl.NumberFormat('en-IN',{
        style:"currency",
        currency :"INR",
        minimumFractionDigits:2
    })

    return formatter.format(number)
}

export default displayINRCurrency