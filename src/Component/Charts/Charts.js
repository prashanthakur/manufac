import React from "react";
import ReactECharts from "echarts-for-react";
import { chartjson } from "./chartjson";

const Charts = () => {
  const totalAlcoholClasses = chartjson.map((each) => each.Alcohol); //total alcohol classes in array
  const uniqueAlcoholClassTypes = [...new Set(totalAlcoholClasses)]; //unified alcohol classes by removing duplicate classes

  //classifying data alcohol class wise in array
  const classwiseArrData = uniqueAlcoholClassTypes.map((eachClass) => {
    //filtering data based on class
    const filteredArr = chartjson.filter((each) => each.Alcohol === eachClass);
    return filteredArr;
  });

  console.log(classwiseArrData);

  //function to calculate avg malic acid when input is data of each class
  const calculateAvgMalic = (arr) => {
    //taking out only malic acids data from whole data in array
    const malicAcidArr = arr.map((each) => each.MalicAcid);
    const lengthOfArr = malicAcidArr.length;
    //calculating total malic accid of each class
    const totalMalicAcidValue = malicAcidArr.reduce((a, b) => a + b);
    const avgMalic = totalMalicAcidValue / lengthOfArr;
    return avgMalic;
  };

  //pushing avg malic acid of each class in empty array
  const avgMalicClassWiseInArr = [];
  classwiseArrData.forEach((eachCategory) => {
    const classWiseAvgMalic = calculateAvgMalic(eachCategory);
    avgMalicClassWiseInArr.push(classWiseAvgMalic);
  });

  const barOption = {
    xAxis: {
      type: "category",
      data: uniqueAlcoholClassTypes,
      name: "Alcohol category",
    },
    yAxis: {
      type: "value",
      name: "Avg Malic Acid",
    },
    series: [
      {
        data: avgMalicClassWiseInArr,
        type: "bar",
      },
    ],
  };

  const newArray1 = [];
  chartjson.forEach((each) => {
    const individualArr = [each.ColorIntensity, each.Hue];
    newArray1.push(individualArr);
  });

  const scatterOption = {
    xAxis: {
      type: "value",
      data: uniqueAlcoholClassTypes,
      name: "Color Intensity",
    },
    yAxis: {
      type: "value",
      data: uniqueAlcoholClassTypes,
      name: "Hue",
    },
    series: [
      {
        data: newArray1,
        type: "scatter",
      },
    ],
  };

  return (
    <>
      <div>
        <ReactECharts option={scatterOption} />
        <p>Scatter plot btwn color intesity and Hue </p>
      </div>
      <div>
        <ReactECharts option={barOption} />
        <p>Bar showing Alcohol catergory and malic acid</p>
      </div>
    </>
  );
};

export default Charts;
