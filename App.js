import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { getReportCache, parseOutMonthlyTransactionsReport} from "./logic/project2.js";
import MonthlyReportContainer from "./components/Report/report";
import About from "./components/pages/About.js";


function App() {
  const urls = ["january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december", ""
  ];
  let [data, updateData] = React.useState(null);
  getReportCache().then(result => {
    if (data === null || data === undefined) {
      updateData(parseOutMonthlyTransactionsReport(result).months);
    }
  }).catch(err => console.log(err));

  function allMonths(data, urls) {
    let children = [];
    for (let i = 0; i < 12; i++) {
      children.push(<MonthlyReportContainer key={`MonthlyReportContainer-${i}`} month={data != null ? data[i] : null} />);
    }
    return React.createElement("div", null, children);
  }
  function allRoutes(data, urls) {
    let children = [];
    for (let i = 0; i < 13; i++) {
      if (i === 12) {
        children.push(allMonths(data));
      }
      children.push(
        React.createElement("Route", { "path": `/${urls[i]}` },
          <MonthlyReportContainer month={data != null ? data[i] : null} />
        ));
    }
    return children;
  }
  return (
    <>
      <div id="Content-Container">
        <Router>
        <Route path="/about" exact component={About} />
        <Navbar />
          <div className="home">
              
          </div>
          <div id="Content-Container">
            <Switch>
              {allRoutes(data, urls)}
            </Switch>

          </div>
        </Router>
        
      </div>
    </>
  );
}
export default App;
