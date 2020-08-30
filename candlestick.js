
// $.get("http://api.marketstack.com/v1/eod?access_key=d605eebcea19b7f8a03fda27c700d6f4&symbols=PTT.XBKK", function (response) {
//   console.log(response);
// });

Highcharts.getJSON('https://demo-live-data.highcharts.com/aapl-ohlcv.json', function (data) {
  // split the data set into ohlc and volume
  console.log(data)
  var ohlc = [],
    volume = [],
    dataLength = data.length,
    i = 0;

  for (i; i < dataLength; i += 1) {
    ohlc.push([
      data[i][0], // the date
      data[i][1], // open
      data[i][2], // high
      data[i][3], // low
      data[i][4] // close
    ]);

    volume.push([
      data[i][0], // the date
      data[i][5] // the volume
    ]);
  }

  Highcharts.stockChart('container', {
    chart: {
      zoomType: 'x'
    },
    yAxis: [{
      labels: {
        align: 'left'
      },
      height: '80%',
      resize: {
        enabled: true
      }
    }, {
      labels: {
        align: 'left'
      },
      top: '80%',
      height: '20%',
      offset: 0
    }],
    tooltip: {
      shape: 'square',
      headerShape: 'callout',
      borderWidth: 0,
      shadow: false,
      positioner: function (width, height, point) {
        var chart = this.chart,
          position;

        if (point.isHeader) {
          position = {
            x: Math.max(
              // Left side limit
              chart.plotLeft,
              Math.min(
                point.plotX + chart.plotLeft - width / 2,
                // Right side limit
                chart.chartWidth - width - chart.marginRight
              )
            ),
            y: point.plotY
          };
        } else {
          position = {
            x: point.series.chart.plotLeft,
            y: point.series.yAxis.top - chart.plotTop
          };
        }

        return position;
      }
    },
    // change type area, ohlc, bl
    // candlestick
    // ohlc
    series: [{
      type: 'candlestick',
      id: 'aapl-ohlc',
      name: 'AAPL Stock Price',
      data: ohlc
    }, {
      type: 'column',
      id: 'aapl-volume',
      name: 'AAPL Volume',
      data: volume,
      yAxis: 1
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 800
        },
        chartOptions: {
          rangeSelector: {
            inputEnabled: false
          }
        }
      }]
    }
  });
});

