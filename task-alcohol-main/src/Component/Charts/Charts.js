import React from "react";
import ReactECharts from "echarts-for-react";
import { chartjson } from "./chartjson";

const Charts = () => {
  //   const categoriesArr = chartjson.map((each) => each.Alcohol);
  //   let uniqueCategoriesArr = [...new Set(categoriesArr)];
  //   console.log(uniqueCategoriesArr);

  //   const categoryArr=chartjson.filter(each=>each.Alcohol===)

  const category1 = chartjson.filter((each) => each.Alcohol === 1);
  const category2 = chartjson.filter((each) => each.Alcohol === 2);
  const category3 = chartjson.filter((each) => each.Alcohol === 3);
  console.log(category3);

  //function to calculate average malic acid for each category
  const calculateAvgMalic = (arr) => {
    const malicAcidArr = arr.map((each) => each.MalicAcid);
    const lengthOfArr = malicAcidArr.length;
    const totalMalicAcidArr1 = malicAcidArr.reduce((a, b) => a + b);
    const avgMalic = totalMalicAcidArr1 / lengthOfArr;
    return avgMalic;
  };

  const category1AvgMalic = calculateAvgMalic(category1);
  const category2AvgMalic = calculateAvgMalic(category2);
  const category3AvgMalic = calculateAvgMalic(category3);

  const barOption = {
    xAxis: {
      type: "category",
      data: ["1", "2", "3"],
      name: "Alcohol category",
    },
    yAxis: {
      type: "value",
      name: "Avg Malic Acid",
    },
    series: [
      {
        data: [category1AvgMalic, category2AvgMalic, category3AvgMalic],
        type: "bar",
      },
    ],
  };

  const newArray1 = [];
  const colorIntensityArr = chartjson.forEach((each) => {
    const individualArr = [each.ColorIntensity, each.Hue];
    newArray1.push(individualArr);
  });

  console.log(newArray1);

  const scatterOption = {
    xAxis: {
      type: "value",
      data: ["1", "2", "3"],
      name: "Color Intensity",
    },
    yAxis: {
      type: "value",
      data: ["1", "2", "3"],
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
