import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import { store, weekWeather } from './reducers/weather-reducer';
import Autocomplete from 'react-google-autocomplete';
import Today from './components/today';
import Week from './components/week';

class App extends Component {
	constructor(props){
		  super(props);
		  this.state = {
			  inputValue: "",
			  isSearchSuccessful: false,
			  isCityFound: true,
		  }

	}
	  fetchCity = () => {
		this.city = this.state.inputValue;
		const city = this.city;
// fetch weather for today
		$.ajax({
	      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&&APPID=8ea149a6d45bb81307b5399e90f0d1c0',
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	        this.setState({
		        data: data,
		        isSearchSuccessful: true,
		        isCityFound: true,
		        });
			store.dispatch({type: data});
	        
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	        this.setState({
		        isSearchSuccessful: false,
		        isCityFound: false,
	        })
	      }.bind(this)
	    });
// fetch weather for week    
	    $.ajax({
	      url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&&APPID=8ea149a6d45bb81307b5399e90f0d1c0',
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	        this.setState({
		        data: data,
		        });
			weekWeather.dispatch({type: data});
	        
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });

	  }
	updateCity = (place) => {
		var placeAutocomplete = "";
	    var placeArray = place.address_components;
	    placeArray.map(function(item){
		    if(item.types.includes('locality')){
			    placeAutocomplete = item.short_name;
		    }
		    if(item.types.includes('country')){
			    placeAutocomplete = placeAutocomplete + "," + item.short_name;
		    }
	    })
		 this.setState({
		    inputValue: placeAutocomplete,
	    })
		
	}
	updateInputValue = (evt) => {
	    this.setState({
	      inputValue: evt.target.value,
	    });
	}
  render() {
	  const isSearchSuccessful = this.state.isSearchSuccessful;
	  const isCityFound = this.state.isCityFound;
    return (
      <div className="App">
      	<div className="header">
	      	<h2>Get current and future weather forecast</h2>
	      	<Autocomplete
			    style={{width: '90%'}}
			    onPlaceSelected={(place) => {
				    this.updateCity(place);
			    }}
			    types={['(regions)']}
			    value={this.state.inputValue}
			    onChange={this.updateInputValue}
			    id="findCity"
			/>
			<button onClick={this.fetchCity}>Find city</button>
			
      	</div>
      	{!isCityFound &&
	      	<div>Sorry, city with this name was not found, check the name of the city and try again</div>
      	}
      	{isSearchSuccessful &&
	      	<div>
				<Today  />
				<Week />
			</div>
		}
		
      </div>
    );
  }
}
export default App;
