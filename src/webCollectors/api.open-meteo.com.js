import axios from 'axios';

export async function getWeatherData () {
    let countries = [];

    //France
    const paris = {latitude: 48.856614, longitude: 2.3522219};
    const nice = {latitude: 43.7101728, longitude: 7.2619532};
    const marseille = {latitude: 43.296482, longitude: 3.057256000000052};
    const lille = {latitude: 50.62925, longitude: 7.2619532};
    const bordeaux = {latitude: 44.837789, longitude: -0.5791799999999512};
    const label = {label: 'France'};
    const france = {label, paris, nice, marseille, lille, bordeaux}
    countries.push(france);

    //Tunisia
    const tunis = {latitude: 36.8064948, longitude: 10.181531599999971};
    const sousse = {latitude: 35.825603, longitude: 10.608394999999973};
    const monastir = {latitude: 35.783333, longitude: 10.833333000000039};
    const djerba = {latitude: 33.807598, longitude: 10.845147};
    const elkef = {latitude: 36.182222, longitude: 8.714721999999938};
    const labelTN = {label: 'Tunisia'};
    const tunisia = {labelTN, tunis, sousse, monastir, djerba, elkef}
    countries.push(tunisia);

    //USA
    const newYork = {latitude: 40.7127837, longitude: -74.0059413};
    const chicago = {latitude: 41.8781136, longitude: -87.6297982};
    const losAngeles = {latitude: 34.0522342, longitude: -118.2436849};
    const philadelphia = {latitude: 39.9525839, longitude: -75.1652215};
    const dallas = {latitude: 32.7766642, longitude: -96.7969879};
    const labelUSA = {label: 'USA'};
    const usa = {labelUSA, newYork, chicago, losAngeles, philadelphia, dallas};
    countries.push(usa);

    //China
    const shanghai = {latitude: 31.230416, longitude: 121.473701};
    const wuhan = {latitude: 30.593099, longitude: 114.305393};
    const hongKong = {latitude: 22.396428, longitude: 114.10949700000003};
    const shenzhen = {latitude: 22.543096, longitude: 114.057865};
    const beijing = {latitude: 39.904211, longitude: 116.407395};
    const labelCH = {label: 'China'};
    const china = {labelCH, shanghai, wuhan, hongKong, shenzhen, beijing};
    countries.push(china);

    //Australia
    const sydney = {latitude: -33.8688, longitude: 151.2093};
    const melbourne = {latitude: -37.814107, longitude: 144.96328};
    const brisbane = {latitude: -27.4710107, longitude: 153.02344889999995};
    const abdelaide = {latitude: -34.92862119999999, longitude: 138.5999594};
    const darwin = {latitude: -12.4628271, longitude: 130.8417772000000};
    const labelAU = {label: 'Australia'};
    const australia = {labelAU, sydney, melbourne, brisbane, abdelaide, darwin};
    countries.push(australia);

    let cityObject = {};
    let data = {};
    let layerLabel, unit, min, med, max, current, metricLabel;
    for (let country of countries) {
        const cities = Object.keys(country);
        for (let city of cities) {
            if (country[city].latitude && country[city].longitude) {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${country[city].latitude}&longitude=${country[city].longitude}&hourly=temperature_2m&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=UTC`;
                try {
                    const response = await axios.get(url);
                    min = response.data.daily.temperature_2m_min[0];
                    max = response.data.daily.temperature_2m_max[0];
                    med = parseFloat(((min + max) / 2).toFixed(2));
                    unit = response.data.daily_units.temperature_2m_min;
                    current = response.data.hourly.temperature_2m[new Date().getHours()];
                    metricLabel = city;
                } catch (error) {
                    console.log(error);
                }
            } else {
                layerLabel = country[city].label;
            }
            cityObject = {label: metricLabel, min, med, max, current, unit};
            if (!data[layerLabel]) {
                data[layerLabel] = layerLabel;
            } else {
                if (!data[layerLabel]["metrics"]) {
                    data[layerLabel] = {};
                    data[layerLabel]["metrics"] = {};
                    data[layerLabel]["metrics"][metricLabel] = {};
                    data[layerLabel]["metrics"][metricLabel] = cityObject;
                } else {
                    data[layerLabel]["metrics"][metricLabel] = cityObject;
                }
            }
        }
        data[layerLabel]["layer"] = {};
        data[layerLabel]["layer"][layerLabel + '-layer'] = {};
        data[layerLabel]["layer"][layerLabel + '-layer']["label"] = layerLabel;
        data[layerLabel]["layer"][layerLabel + '-layer']["_layerBehavior"] = "something";
        data[layerLabel]["layer"][layerLabel + '-layer']["_defaultColor"] = "green";
        data[layerLabel]["layer"][layerLabel + '-layer']["_publicColorOption"] = "random calls function to pick a color";
    }
    ;
    return data;
}