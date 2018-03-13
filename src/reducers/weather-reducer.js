import {createStore} from 'redux';


const reducer = function(state = [], action){
	if(action.type != null)
	return action.type;
}



export const store = createStore(reducer);
export const weekWeather = createStore(reducer);


