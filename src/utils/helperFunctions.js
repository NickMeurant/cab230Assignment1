export const RetrivePopulation = (data) => {
    const dataArray = [];
    dataArray.push(data.population_5km);
    dataArray.push(data.population_10km);
    dataArray.push(data.population_30km);
    dataArray.push(data.population_100km);
    return dataArray;
}

export const TokenValid = () =>{ // checks if expire time is up for token
    const token = JSON.parse(localStorage.getItem("token"));
    const currentDate = new Date();
    if(currentDate.getDate() > token.expire){
        return false;
    }
    else{
        return true;
    }
}

