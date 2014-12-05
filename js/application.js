$(document).ready(function(){
	//data is an array
	var data = []
	var url = 'http://www.quandl.com/api/v1/datasets/UN/KEROSENEIMPORTS_IRL.json?column=1'

	var convertToDate = function(input){
		var date = new Date(input);
		var dateUTC = date.getTime();
		return dateUTC;
	};

	function getPrice(data, url){
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'JSON',
			success: function(response){
				//this is how I can get 1 price
				//console.log(response.data[0]);

				//this is how we loop it to get all prices

				$(response.data).each(function(){
					// colect each data point
					// console.log(this.data)

					var dataPoint = {}
					dataPoint.y = this[1];
					dataPoint.x = convertToDate(this[0]);

					//and each data point to the data array
					data.push(dataPoint);
				})

				//print out data
				console.log(data);

				//Call out the data
				priceChart()
			}
		})
	}

	getPrice(data, url);

	function priceChart(){
		$('#chart').highcharts({
			//key: value
			title:{
				text: 'Stock Price'
			},
			subtitle:{
				text: 'http://www.irelandoilco.com/'
			},
			xAxis: {
				//Configuration of xAxis
				type: 'datetime',
				dateTimeLabelFormats: {
					millisecond: '%H:%M:%S.%L',
					second: '%H:%M:%S',
					minute: '%H:%M',
					hour: '%H:%M',
					day: '%e. %b',
					week: '%e. %b',
					month: '%b \'%y',
					year: '%Y'
				}
			},
			yAxis: {
				//Configuration of xAxis
				min: 10,
				max: 800,
				title:{
					text:'Price (USD)'
				}
			},
			legend: {
				//Configuration of Legends
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: [{
				//Data points
				name: 'Ireland',
				data: data
			}]
		});
	}
});