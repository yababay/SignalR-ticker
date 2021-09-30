const figure = document.querySelector('figure')
figure.style.width = '100%'



let count = 0

const margin = {top: 10, right: 40, bottom: 30, left: 30},
      width  = figure.offsetWidth - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom,
      xTicks = 30,
      svG = d3.select(figure)
          .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
          .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
      x = d3.scaleLinear().domain([0, xTicks]).range([0, width]),
      y = d3.scaleLinear().domain([0, 100]).range([height, 0]),
      valueLine = d3.line()
          .curve(d3.curveCatmullRomOpen)
          .x(function(d) { return x(d.pos); })
          .y(function(d) { return y(d.val); }),
      figCaption = document.createElement('figcaption'),
      data = new Array(xTicks).fill(0).map(el => ({pos: count++, val: Math.round(30 + 65 * Math.random())}))


svG
    .append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

svG
    .append('g')
    .call(d3.axisLeft(y));

svG.append("g")
    .attr("clip-path", "url(#clip)")
  .append("path")
    .datum(data)
    .attr("class", "line")
    .attr("stroke", "black")
    .attr("fill", "none")
  .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .on("start", tick);

function tick() {

  // Push a new data point onto the back.
  data.push({pos: count++, val: 30 + 65 * Math.random()});

  // Redraw the line.
  d3.select(this)
      .attr("d", valueLine)
      .attr("transform", null);

  // Slide it to the left.
  d3.active(this)
      .attr("transform", "translate(" + x(-1) + ",0)")
    .transition()
      .on("start", tick);

  // Pop the old data point off the front.
  data.shift();

}

/*svG.append("path")
    .attr("class", "line")
    .attr("d", valueLine(data))
    .attr("stroke", "black")
    .attr("fill", "none")*/

/*
svG.append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", valueLine(data))
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr("stroke", "black")
    .attr("fill", "none")
//    .on("start", tick);

function tick() {

  // Push a new data point onto the back.
  //data.push(random());

  // Redraw the line.
  d3.select(this)
      .attr("d", valueLine(data))
      .attr("transform", null);

  // Slide it to the left.
  d3.active(this)
    .attr("transform", "translate(" + x(-1) + ",0)")
    .transition()
    .on("start", tick);

  //while(data.length > 100) data.shift();
    //data.shift()

}
*/



/*
function drawLine(){
    let line = svG.select(".line")   // change the line
    if(line) line.remove()
    x.domain(d3.extent(data, function(d) { return d.pos; }));
    y.domain([0, d3.max(data, function(d) { return d.val; })]);
    svG.append("g")
        .attr("clip-path", "url(#clip)")
        .append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", valueLine(data))
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr("stroke", "black")
        .attr("fill", "none")
    return svG.select(".line")   // change the line
}

const connection = new signalR.HubConnectionBuilder().withUrl("/ticker").build();

connection.on("ReceiveMessage", function (user, message) {
    data.push({pos: count++, val: +message})
    data.shift()
    line = drawLine()
    //d3.select(line)
    //    .attr("d", valueLine(data))
    //    .attr("transform", null);
    //data.shift()
    //x.domain(d3.extent(data, function(d) { return d.pos; }));
    //y.domain([0, d3.max(data, function(d) { return d.val; })]);
    //line
    //    .attr("d", valueLine(data))
    //    .duration(750)
    //    .transition()
    //    .attr("transform", "translate(" + x(-1) + ",0)")
    //line
    //    .attr("d", valueLine(data))
    //    .transition()
    //    .duration(750)
    //    .attr("transform", "translate(" + x(-1) + ",0)")
})

count = data.length
figCaption.textContent = 'Ticker sends data here.'
figure.appendChild(figCaption)

connection.start()

*/
