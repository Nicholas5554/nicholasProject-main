import { getData } from "./countries.js";
import { createCardsList } from "./domHelper.js";

await getData();
createCardsList();