// Creating a Function to Plot the bar and bubble
function plot(id){

    // Use d3.json() to fetch data from JSON file
    d3.json("samples.json").then((data) => {
        console.log(data)

        var dataNew = data.samples.filter(data => data.id.toString() === id)[0];
        console.log(dataNew);
        // Sort the data by OTU id search results
        var sortedByOTUID = dataNew.otu_ids.sort((a, b) => b.sample_values - a.sample_values);
        var slicedOTUids = sortedByOTUID.slice(0, 10);
        // console.log(sortedByOTUID)
        // console.log(slicedOTUids)
        // Slice the first 10 objects for plotting
        // slicedData = sortedByOTUID.sample_values.slice(0, 10);
        var slicedData = dataNew.sample_values.slice(0, 10);
        console.log(slicedData)
        // Reverse the array to accommodate Plotly's defaults
        reversedData = slicedOTUids.reverse();
        // Trace1 for the BellyButton Data bar
        var trace1 = {
        x: slicedData.reverse(),
        y: slicedOTUids.map(otuID => `OTU ${otuID}`),
        text: sortedByOTUID.otu_labels,
        name: "OTU",
        type: "bar",
        orientation: "h"
        };

        // data
        //var data = [trace1];

        // Apply the group bar mode to the layout
        var layout = {
        title: "Belly Button Biodiversity",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
        };

        // // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", [trace1], layout);

        // Bubble Trace
        var bubble_trace = {
            x: dataNew.otu_ids,
            y: dataNew.sample_values,
            mode: 'markers',
            marker: {
                size: dataNew.sample_values,
                color: dataNew.otu_ids
            },
            text: dataNew.otu_labels
        };

        var bubble_data = [bubble_trace];

        var bubble_layout = {
            title: "Bubble Chart by Sample",
            xaxis: {title: 'OTU ID'},
            yaxis: {title: ''}
        };

        // // Render the plot to the div tag with id "bubble"
        Plotly.newPlot("bubble", bubble_data, bubble_layout);

        // Washing Frequency Gaugue
        var x = data.metadata;
        console.log(id);
        var y = data.metadata.filter(z => parseInt(z.id) === parseInt(id))[0];
        washi = y.wfreq


        // Gauge Trace
        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: washi,
              title: { text: "Belly Button Washing Frecuency" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 4 },
              gauge: { axis: { range: [null, 9] } }
            }
          ];
          
          // // Render the plot to the div tag with id "gauge"
          var layout = { width: 600, height: 400 };
          Plotly.newPlot('gauge', data, layout);

    });
}

function meta(id) {
    
    // Use d3.json() to fetch data from JSON file
    d3.json("samples.json").then((data)=> {
        
        // get the metadata info for the demographic panel
        var metaInfo = data.metadata;
        // console.log(metaInfo)

        // filter meta data info by id
        var result = metaInfo.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var panel = d3.select("#sample-metadata");
        
        // reset the panel before getting new id info
        panel.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        // console.log(result);
        Object.entries(result).forEach(([key,value]) => {   
                panel.append("h5").text(key + ": " + value + "\n");    
        });
    });
}

// Create the function for the change event
function optionChanged(id) {
    // console.log(optionChanged)
    plot(id);
    meta(id);
    console.log(id);
}

// Create the function for the initial data rendering
function init() {
    // Select dropdown menu 
    var dropdown = d3.select("#selDataset");    

    // Use d3.json() to fetch data from JSON file
    d3.json("samples.json").then((data)=> {
        // console.log(data)

        // Filling the dropdown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // Calling Plot and Meta Data info functions
        plot(data.names[0]);
        meta(data.names[0]);
    });
}

init();

// Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", optionChanged);