function getInfo(){
	let inputs = documentObject().inputs;
	if(inputs !== ""){
		fetchData(inputs);
	}
}

document.addEventListener("keypress",(e) =>{
	if(e.keyCode === 13 || e.which === 13){
		let inputs = documentObject().inputs;
		if(inputs !== ""){
			fetchData(inputs);
		}
		
	}
})

function fetchData(data){
	fetch(`http://api.weatherstack.com/current?access_key=f4968d206e8f4f8429e735a89fb7dbc5&query=${data}`)
	.then(result =>{
		return result.json()
	})
	.then(res =>{
		let info = documentObject();
		let icon = res.current.weather_icons[0];
		let desc = res.current.weather_descriptions[0];
		let location = res.request.query;
		let temperature = res.current.temperature;
		info.icon.src = icon;
		info.temperature.innerHTML = temperature + "&#8451;";
		info.location.textContent = location;
		info.desc.textContent = desc;
		clearInputField();

		otherInfo(res);
		
	})
	.catch(error => console.log("error"));

}

let documentObject = function(){
	let temp,location,inputs,icon,name,country,region,lat,lon,localTime,windSpeed,windDegree,windDir,pressure,humidity,visibility;
	icon = document.querySelector(".icon");
	inputs = document.querySelector("input").value;
	temp = document.querySelector(".temp");
	location = document.querySelector(".loc");
	description = document.querySelector(".desc");
	//Other Info
	//left
	name=document.querySelector(".name");
	country = document.querySelector(".country");
	region = document.querySelector(".region");
	lat = document.querySelector(".lat");
	lon = document.querySelector(".lon");
	localTime = document.querySelector(".local-time");
	//Right
	windSpeed = document.querySelector(".wind-speed");
	windDegree = document.querySelector(".wind-degree");
	windDir = document.querySelector(".wind-dir");
	pressure = document.querySelector(".pressure");
	humidity = document.querySelector(".humidity");
	visibility = document.querySelector(".visibility");
	return {
		desc:description,
		temperature:temp,
		location:location,
		inputs:inputs,
		icon:icon,
		name:name,
		country:country,
		region:region,
		lat:lat,
		lon:lon,
		localTime:localTime,
		windSpeed:windSpeed,
		windDegree:windDegree,
		windDir:windDir,
		pressure:pressure,
		humidity:humidity,
		visibility:visibility,
	}
}

function clearInputField(){
	document.querySelector("input").value = ''; // name,country,region,lat,lon,local-time,
}												// wind-speed,wind-degree,wind-dir,pressure,humidity,visibility						

function otherInfo(data){
	let info = documentObject();
	console.log(info.name.textContent = "hey")
	let allData = data;
	let leftData = allData.location;
	let rightData = allData.current;

	//left Info
	info.name.innerHTML = `Name: ${leftData.name}`; 
	info.country.innerHTML = `Country: ${leftData.country}`;
	
	info.lat.innerHTML = `Latitude: ${leftData.lat}`;
	info.lon.innerHTML = `Longitude: ${leftData.lon}`;
	info.localTime.innerHTML = `Time: ${leftData.localtime}`;


	//Right Info
	info.windSpeed.innerHTML = `Wind Speed: ${rightData.wind_speed}`;
	info.windDegree.innerHTML = `Wind Degree: ${rightData.wind_degree}`;
	info.windDir.innerHTML = `Wind Direction: ${rightData.wind_dir}`;
	info.pressure.innerHTML = `Pressure: ${rightData.pressure}`;
	info.humidity.innerHTML = `Humidity: ${rightData.humidity}`;
	info.visibility.innerHTML = `Visibility: ${rightData.visibility}`;


}
