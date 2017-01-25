module: 'datafeed',
position: 'middle_center',
config: {
	remoteFile: 'datatest2.csv', // single column text file with data, must be in the datafeed module directory
	updateInterval: 60 * 1000,  // updates every minute
	initialLoadDelay: 0, // 0 milliseconds delay
	animationSpeed: 2000 // speed to animate update transition in ms
}