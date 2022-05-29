export interface ChartData {
  label?: string,
  fill?: boolean,
  //backgroundColor should include opacity ex: "rgba(255,99,132,0.2)",
  backgroundColor?: string,
  //borderColor and pointBackgroundColor should be the same
  borderColor?: string,
  pointBackgroundColor?: string,
  pointBorderColor?: string,
  data?: number[],
}