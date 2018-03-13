import React, { Component } from 'react';
import { store } from '../reducers/weather-reducer';


class Today extends Component {
  constructor(props){
		super(props);
		this.weatherData = {};
		this.isData = false;
		this.state = {
			classForHidden: "not-rendered",
			temp: "",
			temp_min: "",
			temp_max: "",
			pressure: "",
			humidity: "",
			condition: "",
			description: "",
			icon: "",
			name: "",
			country: "",
		}
		store.subscribe(() => {
			this.storeUpdate = store.getState();
			this.setState({
				temp: this.storeUpdate.main.temp,
				temp_min: this.storeUpdate.main.temp_min,
				temp_max: this.storeUpdate.main.temp_max,
				pressure: this.storeUpdate.main.pressure,
				humidity: this.storeUpdate.main.humidity,
				condition: this.storeUpdate.weather[0].main,
				description: this.storeUpdate.weather[0].description,
				icon: this.storeUpdate.weather[0].icon,
				name: this.storeUpdate.name,
				country: this.storeUpdate.sys.country,
			})
		});

	}
	
	render(){
		const image = 'http://openweathermap.org/img/w/'+ this.state.icon + '.png';
		return(
			<div className="weatherToday weather">
				Today in {this.state.name}, {this.state.country}
				<div className="top_description">
					<p>{this.state.description.toUpperCase()}
					<img src={image} alt="weather"/>
					</p>
				</div>
				<p>Temperature now: {this.state.temp} &#8451;</p>
				<p>Temperature minimum: {this.state.temp_min}&#8451;</p>
				<p>Temperature maximum: {this.state.temp_max}&#8451;</p>
				<p>Pressure: {this.state.pressure}</p>
				<p>Humidity: {this.state.humidity}%</p>


			 </div>
		)
	}
}


export default Today;