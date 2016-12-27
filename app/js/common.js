function getWeatherIconByText(text){
  var img = "";
  switch(text){
      case "Mostly Sunny":
        img = "images/icons/sun.png";
        break;
      case "Mostly Cloudy":
        img = "images/icons/clouds.png";
        break;
      case "Partly Cloudy":
        img = "images/icons/partial_sunny.png";
        break;
      default:
        img = "images/icons/sun.png";
        break;
  }
  return img;
}

function getWeekdayNameByShortForm(dayText){
  switch(dayText){
    case "Sun":
      return "Sunday";
    case "Mon":
      return "Monday";
    case "Tue":
      return "Tuesday";
    case "Wed":
      return "Wednesday";
    case "Thu":
      return "Thursday";
    case "Fri":
      return "Friday";
    case "Sat":
      return "Saturday";
  } 
}

function getUrlParameter(sParam){
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    
    }
    return "";
}

function getDistrictName(woeid){
  switch(woeid){
    case "2165411":
      return "Tuen Mun";
    case "2165358":
      return "Yuen Long";
    case "2165398":
      return "Sham Shui Po";
    case "2165386":
      return "Kwun Tong";
    case "24703137":
      return "Wong Tai Sin";
    case "2165356":
      return "Sha Tin";
    case "2165355":
      return "Tsuen Wan";
  }
}