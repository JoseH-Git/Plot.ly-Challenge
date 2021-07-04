function plot(id){
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

        // Reverse the array to accommodate Plotly's defaults
        reversedData = slicedData.reverse();

        // Trace1 for the BellyButton Data
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

        // Bubble Trace
        var bubble_trace = {
            x: sortedByOTUID.otu_ids,
            y: sortedByOTUID.sample_values,
            mode: 'markers',
            marker: {
                size: sortedByOTUID.sample_values,
                color: sortedByOTUID.otu_ids
            },
            text: sortedByOTUID.otu_labels
        };

        var bubble_data = [bubble_trace];

        var bubble_layout = {
            title: "Bubble Chart by Sample",
            xaxis: {title: 'OTU ID'},
            yaxis: {title: ''}
        };

        Plotly.newPlot("bubble", bubble_data, bubble_layout);
    });
}

function meta(id) {
    
    // Use d3.json() to fetch data from JSON file
    d3.json("samples.json").then((data)=> {
        
        // get the metadata info for the demographic panel
        var metaInfo = data.metadata;
        console.log(metaInfo)

        // filter meta data info by id
        var result = metaInfo.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var panel = d3.select("#sample-metadata");
        
        // reset the panel before getting new id info
        panel.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                panel.append("h5").text(key[0] + ": " + key[1] + "\n");    
        });
    });
}

// Create the function for the change event
function optionChanged(id) {
    plot(id);
    meta(id);
}

// Create the function for the initial data rendering
function init() {
    // Select dropdown menu 
    var dropdown = d3.select("#selDataset");    

    // Use d3.json() to fetch data from JSON file
    d3.json("samples.json").then((data)=> {
        console.log(data)

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