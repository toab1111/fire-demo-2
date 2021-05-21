var formatDate = d3.timeFormat("%d %b %Y ");
var formatDate_d = d3.timeFormat("| %d %b %Y");
var width_window = window.innerWidth
var startDate = new Date(2018, 11, 1),
    endDate = new Date(2018, 11, 7);

var margin = { top: 0, right: 100, bottom: 0, left: 50 },
    width = (width_window - margin.left - margin.right) / 1.05,
    height = 100 - margin.top - margin.bottom;

var svg = d3.select("#slider")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + 50);

svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "white");

var x = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, width])
    .clamp(true);

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + height / 2 + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() { hue(x.invert(d3.event.x)); }));

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(40," + 1 + ")")
    .selectAll("text")
    .data(x.ticks(7))
    .enter()
    .append("text")
    .attr("x", x)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatDate_d(d); });

var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDate(startDate))
    .attr("transform", "translate(10," + (-20) + ")")

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 10);


function hue(h) {
    console.log(h);
    handle.attr("cx", x(h));
    label
        .attr("x", x(h))
        .text(formatDate(h));
    console.log(String(h.getDate()) + " " + String(h.getMonth()) + " " + String(h.getFullYear()));
}




hue(endDate);