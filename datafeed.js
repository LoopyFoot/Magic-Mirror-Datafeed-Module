Module.register("datafeed",{

defaults: {
	remoteFile: '/home/pi/MagicMirror/modules/datafeed/datatest2.csv'
},

// Define styles.
getStyles: function() {
	return ["datafeed_styles.css"];
},

start: function() {
	Log.info("starting module: " + this.name);
	
}
getDom: function() {
	// Read CSV data from text area
	var data = document.getElementById("remoteFile").value;

	// Trasform it into array of lines trimming any new lines at the end
	var output = [],
	sum = 0;

	// Iterate over each line
	lines.forEach(function(line, index) {
	console.log(line);
	  console.log(index);
	  // very first row of the data would become table header row
		if(index === 0) {
		output.push("<tr><th>" + line.split("\n").join("</th><th>") + "</th></tr>");
	  } else {
	   // rest of the lines would be rows of the table 
	   output.push("<tr><td>" + line.split("\n").join("</td><td>") + "</td></tr>");
	   // Sum up 3rd column of the CSV table
	   sum += parseInt(line.split("\n")[0]);
	  }
	});
	// Wrap it all in table tags
	output = "<table>" + output.join("") + "</table>";
	document.getElementById("remoteFile").innerHTML = "Your sum is " + sum.toString();

	// For magic mirror getDom method you probably would end up just appending it to a wrapper and returning it like next 3 commented lines
	var wrapper = document.createElement("div");
	wrapper.innerHTML = output;
	return wrapper;
	}
