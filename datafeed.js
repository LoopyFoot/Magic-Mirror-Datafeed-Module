Module.register("datafeed",{

	// Default module config.
	defaults: {
		remoteFile: "datatest2.csv",
		updateInterval: 60 * 1000,  // updates every minute
		initialLoadDelay: 0, // 0 milliseconds delay
		animationSpeed: 2000
	},

	// Define styles.
	getStyles: function() {
		return ["datafeed_styles.css"];
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
		this.loaded = false;

		this.scheduleUpdate(this.config.initialLoadDelay);
	},

	// Override DOM generator.
	getDom: function() {
		var wrapper = document.createElement("div");

		if (!this.loaded) {
			wrapper.innerHTML = this.translate("Loading...");
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		wrapper.className = "datafeed";
		wrapper.innerHTML = "Your sum is " + this.sum;
		return wrapper;
	},

	// Process Data that was read from the file.
	processData: function(data) {
		// convert our data from the file into an array
		var lines = data.replace(/\n+$/, "").split("\n");
		// we have array of strings but need an array of Numbers this should do the trick getting rid of any text and 0 values (source: http://stackoverflow.com/a/26641971)
		lines = lines.map(Number).filter(Boolean);
		// now we find the sum of all of the values in our array. (source: http://stackoverflow.com/a/16751601)
		this.sum = lines.reduce((a, b) => a + b, 0);

		this.loaded = true;
		this.updateDom(this.config.animationSpeed);
		this.scheduleUpdate();
	},

	// Read data from file.
	updateData: function() {
		var self = this;

		var xobj = new XMLHttpRequest();
		xobj.open("GET", this.file(this.config.remoteFile), true);
		xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == "200") {
				self.processData(xobj.response);
			}
		};
		xobj.send();

	},

	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update. If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		setTimeout(function() {
			self.updateData();
		}, nextLoad);
	},
});
