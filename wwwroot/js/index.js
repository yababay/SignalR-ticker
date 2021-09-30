const figure = document.querySelector('figure')
figure.style.width = '100%'
figure.style.height = '400px'

var n = 40,
    bottomLimit = 30
    random = () => d3.randomInt(0, 100 - bottomLimit - 5)() + bottomLimit,
    //data = d3.range(n).map(random);
    data = d3.range(n).map(() => 0);

var svg = d3.select(figure).append("svg").attr("width", figure.offsetWidth).attr("height", "400"),
    margin = {top: 20, right: 20, bottom: 20, left: 40},
    width  = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

var line = d3.line()
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d); });

g.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(d3.axisBottom(x));

g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y));

g.append("g")
    .attr("clip-path", "url(#clip)")
  .append("path")
    .datum(data)
    .attr("class", "line")
    .attr("stroke", "black")
    .attr("fill", "none")
  .transition()
    .duration(300)
    .ease(d3.easeLinear)
    .on("start", tick);


function tick() {

    if(signalRBuff.length) data.push(signalRBuff.shift())
    else data.push(data[data.length - 1])
    d3.select(this)
        .attr("d", line)
        .attr("transform", null);

    // Slide it to the left.
    d3.active(this)
        .attr("transform", "translate(" + x(-1) + ",0)")
        .transition()
        .on("start", tick);

    // Pop the old data point off the front.
    while(data.length > n) data.shift();

}

const connection = new signalR.HubConnectionBuilder().withUrl("/ticker").build();
const figCaption = document.createElement('figcaption'),
      h1 = document.querySelector('h1')
figure.appendChild(figCaption)

const signalRBuff = []
let tickCount = 0

connection.on("ReceiveMessage", function (user, message) {
    h1.textContent = 'Ticker works!'
    signalRBuff.push(+message)
    figCaption.textContent = `Ticker is pushing data into the chart every second via SignalR connection. There where ${++tickCount} ticks. The last tick was ${message}.`
})

connection.start()

