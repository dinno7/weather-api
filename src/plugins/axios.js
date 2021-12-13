import axios from "axios";

const mineAxios = axios.create({
  baseURL: "http://api.openweathermap.org/data/2.5/",
  timeout: 10000,
});
export default mineAxios;

export const API_KEY = "d9a680626736997afb72b98230a3ad42";
