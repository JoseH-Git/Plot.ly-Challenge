// Use d3.json() to fetch data from JSON file
d3.json("samples.json").then((data) => {
    console.log(data)

    // Sort the data by Greek search results
    var sortedByOTUID = data.samples.sort((a, b) => b.sample_values - a.sample_values)[0];
    var slicedOTUids = sortedByOTUID.otu_ids.slice(0, 10);
    console.log(sortedByOTUID)
    console.log(slicedOTUids)

    // Slice the first 10 objects for plotting
    slicedData = sortedByOTUID.sample_values.slice(0, 10);
    console.log(slicedData)

    // // Reverse the array to accommodate Plotly's defaults
    // reversedData = slicedData.reverse();

    // Trace1 for the Greek Data
    var trace1 = {
    x: slicedData,
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

    // // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", [trace1], layout);

});


//////////////////////////////////////////////////////////////////////////////

// // Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updatePlotly);

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");
    
//     data.names.forEach(function(name) {
//         dropdown.append("option").text(name).property("value");
//     });
  
//     // Note the extra brackets around 'x' and 'y'
//     Plotly.restyle("plot", "x", [x]);
//     Plotly.restyle("plot", "y", [y]);
//   }