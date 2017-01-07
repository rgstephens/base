import React from 'react';
import ReactHighcharts from 'react-highcharts';

export default class ChartByBody extends React.Component {
  constructor(props) {
    super(props);
  }

  docsToConfig(documents) {
    documents.sort(function (a, b) {
      if (a.title < b.title) {
        return -1
      } else {
        return 1
      }
      return 0
    });

    const categories = documents.map(item => item.title);
    const bodyCount = documents.map(item => item.body.length);

    var config = {
      chart: {
        type: 'area',
        spacingBottom: 30
      },
      title: {
        text: 'Document Body Length'
      },
      xAxis: {
        categories: categories
      },
      yAxis: {
        title: {
          text: 'Y-Axis'
        },
        labels: {
          formatter: function () {
            return this.value;
          }
        }
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + '</b><br/>' +
              this.x + ': ' + this.y;
        }
      },
      plotOptions: {
        area: {
          fillOpacity: 0.5
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Char Count',
        data: bodyCount
      }]
    };

    return config;
  }

  render() {
    const chartConfig = this.docsToConfig(this.props.documents);
    return (<div>
      <ReactHighcharts config={chartConfig}></ReactHighcharts>
    </div>);
  }
}

ChartByBody.propTypes = {
  docs: React.PropTypes.array,
};
