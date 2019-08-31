var fs = require('fs')
var path = require('path')
var marked = require('marked')

var mdpath = path.resolve('./README.md')
var docpath = path.resolve('../index.html')

var mdRes = fs.readFileSync(mdpath).toString()
var odcRes = fs.readFileSync(docpath).toString()

var REREG = /<!-- readme start -->[\s\S]*<!-- readme end -->/
var JSREG = /<!-- js start -->[\s\S]*<!-- js end -->/

var newDoc = odcRes.replace(REREG, function () {
  return `<!-- readme start -->${marked(mdRes)}<!-- readme end -->`
})

var jss = `
<script>
 new Vue({
  el: '#root',
  data: {
    lineConfig: {
      title: 'Monthly income of an indie developer',
      xLabel: 'Month',
      yLabel: '$ Dollors',
      width: 900,
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [
          {
            label: 'Plan',
            data: [30, 70, 200, 300, 500, 800, 1500, 2900, 5000, 8000]
          },
          {
            label: 'Reality',
            data: [0, 1, 30, 70, 80, 100, 50, 80, 40, 150]
          }
        ]
      }
    },
    xyConfig: {
      title: 'Pokemon farms', // optional
      xLabel: 'Coodinate', // optional
      yLabel: 'Count', // optional
      data: {
        datasets: [
          {
            label: 'Pikachu',
            data: [
              { x: 3, y: 10 },
              { x: 4, y: 122 },
              { x: 10, y: 100 },
              { x: 1, y: 2 },
              { x: 2, y: 4 }
            ]
          },
          {
            label: 'Squirtle',
            data: [
              { x: 3, y: 122 },
              { x: 4, y: 212 },
              { x: -3, y: 100 },
              { x: 1, y: 1 },
              { x: 1.5, y: 12 }
            ]
          }
        ]
      },
      options: {
        // optional
        xTickCount: 5,
        yTickCount: 5,
        legendPosition: chartXkcd.config.positionType.upRight,
        showLine: false,
        timeFormat: undefined,
        dotSize: 1
      }
    },
    xyConfigTime: {
      title: 'Github star history',
      xLabel: 'Month',
      yLabel: 'Stars abc',
      data: {
        datasets: [
          {
            label: 'timqian/chart.xkcd',
            data: [
              { x: '2015-03-01', y: 0 },
              { x: '2015-04-01', y: 2 },
              { x: '2015-05-01', y: 4 },
              { x: '2015-06-01', y: 10 },
              { x: '2015-07-01', y: 122 }
            ]
          },
          {
            label: 'timqian/star-history',
            data: [
              { x: '2015-01-01', y: 0 },
              { x: '2015-03-01', y: 1 },
              { x: '2015-04-01', y: 12 },
              { x: '2015-05-01', y: 122 },
              { x: '2015-06-01', y: 212 }
            ]
          }
        ]
      },
      options: {
        xTickCount: 3,
        yTickCount: 4,
        legendPosition: chartXkcd.config.positionType.upLeft,
        showLine: true,
        timeFormat: 'MM/DD/YYYY',
        dotSize: 0.5
      }
    },
    barConfig: {
      data: {
        labels: ['github stars', 'patrons'],
        datasets: [
          {
            // label: 'Battle',
            data: [100, 2]
          }
        ]
      }
    },
    pieConfig: {
      title: 'What Tim made of',
      data: {
        labels: ['a', 'b', 'e', 'f', 'g'],
        datasets: [
          {
            data: [500, 200, 80, 90, 100]
          }
        ]
      }
    }
  }
})
</script>
 `
newDoc = newDoc.replace(JSREG, function () {
  return `<!-- js start -->${jss}<!-- js end -->`
})

fs.writeFileSync(docpath, newDoc)
