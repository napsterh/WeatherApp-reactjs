import React, { Component } from 'react';

import WeatherInfo from './components/WeatherInfo';
import WeatherForm from './components/WeatherForm';

import { WEATHER_KEY } from './keys';

class App extends Component {

    state = {
        temperatura: '',
        descripcion: '',
        humedad: '',
        velocidad_viento: '',
        ciudad: '',
        pais: '',
        error: null
    };

    getWeather = async e =>{
        e.preventDefault();
        const { city, country } = e.target.elements;
        const cityValue = city.value;
        const countryValue = country.value;
       
        if(cityValue && countryValue){
            const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${WEATHER_KEY}&units=metric`;
            const response = await fetch(API_URL);
            const data = await response.json();
        

            this.setState({
                temperatura:       data.main.temp,
                descripcion:       data.weather[0].description,
                humedad:           data.main.humidity,
                velocidad_viento:  data.wind.speed,
                ciudad:            data.name,
                pais:              data.sys.country,
                error:             null
            });
        } else {
            this.setState({error: 'Por favor ingrese una ciudad y un país'})
        }

    }

    render(){
        return(
            <div className="container p-4">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <WeatherForm getWeather={this.getWeather}/>
                        <WeatherInfo {...this.state}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;