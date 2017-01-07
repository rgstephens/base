import React from 'react';
import ReactHighcharts from 'react-highcharts';

export default class ChartByLetter extends React.Component {
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

    let total = 0;
    const reduceDocs = [];
    documents.forEach(function(doc, i) {
      total++;
      if ((documents[i+1]) && (doc.title[0] != documents[i+1].title[0])) {
        reduceDocs.push([doc.title[0], (total / documents.length)]);
        total = 0;
      }
      if (!documents[i+1]) {
        reduceDocs.push([doc.title[0], (total / documents.length)]);
      }
    });

    var config = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Docs by Title Letter'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (ReactHighcharts.theme && ReactHighcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        type: 'pie',
        colorByPoint: true,
        name: 'Docs by Title',
        data: reduceDocs
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

ChartByLetter.propTypes = {
  docs: React.PropTypes.array,
};
