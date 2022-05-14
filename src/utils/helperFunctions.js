
export const RetrivePopulation = (data) => {
    const dataArray = [];
    dataArray.push(data.population_5km);
    dataArray.push(data.population_10km);
    dataArray.push(data.population_30km);
    dataArray.push(data.population_100km);
    return dataArray;
}

