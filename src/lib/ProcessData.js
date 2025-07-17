//this file will help parse data from the csv files to use in the charts

import * as d3 from 'd3';

let csvData = await d3.csv('./data/black_median_home_value.csv'); //Median Home Value of Owner Occupied Homes WIth Mortgages 2023 from BWDC

//group by year and collect values so we have yearwise data to compare with yearwise medians
let grouped = d3.group(csvData, d => d.year);

//for each year, compute national median
let years = [];
let actualValues = [];

grouped.forEach((rows, year) => {
  let vals = rows.map(r => +r.median_home_value_owner_occupied_houses_with_mortages).filter(v => !isNaN(v));
  let median = d3.median(vals);
  years.push(+year);
  actualValues.push(median);
});

//overall us avg dataset
let usAvgData = await d3.csv('./data/national_home_price_index.csv');

//group rows by year, compute average
let groupedIndex = d3.group(usAvgData, d => new Date(d.observation_date).getFullYear());

let nationalIndexPerYear = [];

groupedIndex.forEach((rows, year) => {
  let vals = rows.map(r => +r.CSUSHPINSA).filter(v => !isNaN(v));
  let avg = d3.mean(vals);
  nationalIndexPerYear.push({ year: +year, index: avg });
});


let baseValue = actualValues[0]; //start from 2016
let baseIndex = nationalIndexPerYear.find(d => d.year === years[0]).index;

let whatIfValues = nationalIndexPerYear.map(d => baseValue * (d.index / baseIndex));

// HIGHCHARTS ------------------------------------------------
let chartOptions = {
  chart: { type: 'area' },
  title: { text: 'Median Black Home Value vs What If @ National Avg' },
  xAxis: { categories: years },
  yAxis: { title: { text: 'Home Value ($)' }},
  series: [
    { name: 'Actual Median', data: actualValues, color: '#1f77b4' },
    { name: 'What If', data: whatIfValues, color: '#ff7f0e' }
  ],
  credits: { enabled: false }
};

