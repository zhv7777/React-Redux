import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { weekWeather } from '../reducers/weather-reducer';


class Week extends Component {
  constructor(props, context){
		super(props);
		this.weatherData = {};
		this.isData = false;
		this.today = new Date();
		this.tomorrow = new Date();
		this.tomorrow.setDate(this.today.getDate()+1);
		this.tomorrowPlusOne = this.tomorrow.getDate()+1;
		this.tomorrowPlusTwo = this.tomorrow.getDate()+2;
		this.tomorrowPlusThree = this.tomorrow.getDate()+3;
		this.tomorrowPlusFour = this.tomorrow.getDate()+4;
		this.tomorrowList = [];
		this.tomorrowPlusOneList = [];
		this.tomorrowPlusTwoList = [];
		this.tomorrowPlusThreeList = [];
		this.tomorrowPlusFourList = [];
		const month = this.tomorrow.getMonth();
		switch(month){
			case 0: 
				this.month = 'Jan';
				break;
			case 1: 
				this.month = 'Feb';
				break;
			case 2: 
				this.month = 'Mar';
				break;
			case 3: 
				this.month = 'Apr';
				break;
			case 4: 
				this.month = 'May';
				break;
			case 5: 
				this.month = 'Jun';
				break;
			case 6: 
				this.month = 'Jul';
				break;
			case 7: 
				this.month = 'Aug';
				break;
			case 8: 
				this.month = 'Sep';
				break;
			case 9: 
				this.month = 'Oct';
				break;
			case 10: 
				this.month = 'Nov';
				break;
			default: 
				this.month = 'Dec';
				break;
		}
		this.handleSelect = this.handleSelect.bind(this);

		this.state = {
			key: 1,
			updated: false,
		}
		weekWeather.subscribe(() => {
			const tomorrowTemp = [];
			const tomorrowPlusOne = [];
			const tomorrowPlusTwo= [];
			const tomorrowPlusThree = [];
			const tomorrowPlusFour = [];
			this.storeUpdate = weekWeather.getState();
			this.storeUpdate.list.map(function(item){
				var date = new Date(item.dt*1000);
				var today = new Date();
				var data = {
						time: date.getHours(), 
						temp: item.main.temp.toFixed(1),
						icon: 'http://openweathermap.org/img/w/'+ item.weather[0].icon + '.png',
						id: item.dt,
				}
				if(date.getDate() === today.getDate()+1){
					tomorrowTemp.push(data);
				}
				if(date.getDate() === today.getDate()+2){
					tomorrowPlusOne.push(data);
				}
				if(date.getDate() === today.getDate()+3){
					tomorrowPlusTwo.push(data);
				}
				if(date.getDate() === today.getDate()+4){
					tomorrowPlusThree.push(data);
				}
				if(date.getDate() === today.getDate()+5){
					tomorrowPlusFour.push(data);
				}
			})
			
			this.tomorrowList = tomorrowTemp;
			this.tomorrowPlusOneList = tomorrowPlusOne;
			this.tomorrowPlusTwoList = tomorrowPlusTwo;
			this.tomorrowPlusThreeList = tomorrowPlusThree;
			this.tomorrowPlusFourList = tomorrowPlusFour;
			
			this.setState({
				updated: true,
			})

	
		});
		

	}
	 handleSelect(key) {
	    this.setState({ key });
	  }
		
	render(){
		function returnWeatherItems(item){
			return <div className="chartBlock" key={item.id}>
	        {
		        item.time > 12 ? item.time - 12 + 'pm' : item.time + 'am'
	        }
				<div>{item.temp}&deg;</div>
				<img src={item.icon} alt="weather"/>
	        </div>
		}
		const weatherTomorrow = this.tomorrowList.map((item) =>
	        returnWeatherItems(item)
	    )
	   
	    const weatherTomorrowPlusOne = this.tomorrowPlusOneList.map((item) =>
	        returnWeatherItems(item)
	    )
	    const weatherTomorrowPlusTwo = this.tomorrowPlusTwoList.map((item) =>
	        returnWeatherItems(item)
	    )
	    const weatherTomorrowPlusThree = this.tomorrowPlusThreeList.map((item) =>
	        returnWeatherItems(item)
	    )
	    const weatherTomorrowPlusFour = this.tomorrowPlusFourList.map((item) =>
	        returnWeatherItems(item)
	    )
	    console.log('render happened');

		return(
			<div className="weatherWeek weather">
				<Tabs
			        activeKey={this.state.key}
			        onSelect={this.handleSelect}
			        id="controlled-tab-example"
			      >
			        <Tab eventKey={1} title="Tomorrow">
			        	<div>{this.tomorrow.getDate()}th 
			        	{this.month}</div>
			        	<div className="tempChart">
		        			{weatherTomorrow}
		        		</div>
			        	
			        </Tab>
			        <Tab eventKey={2} title={this.tomorrowPlusOne}>
			          <div>{this.tomorrow.getDate()+1}th 
					  {this.month}</div>
			          <div className="tempChart">
		        			{weatherTomorrowPlusOne}
		        		</div>
			          
			        </Tab>
			        <Tab eventKey={3} title={this.tomorrowPlusTwo}>
			          <div>{this.tomorrow.getDate()+2}th 
			          {this.month}</div>
			          <div className="tempChart">
		        			{weatherTomorrowPlusTwo}
		        		</div>

			        </Tab>
			        <Tab eventKey={4} title={this.tomorrowPlusThree}>
			          <div>{this.tomorrow.getDate()+3}th 
			          {this.month}</div>
			          <div className="tempChart">
		        			{weatherTomorrowPlusThree}
		        		</div>

			        </Tab>
			        <Tab eventKey={5} title={this.tomorrowPlusFour}>
			          <div>{this.tomorrow.getDate()+4}th 
			          {this.month}</div>
			          <div className="tempChart">
		        			{weatherTomorrowPlusFour}
		        		</div>

			        </Tab>
		      </Tabs>

			 </div>
		)
	}
}


export default Week;