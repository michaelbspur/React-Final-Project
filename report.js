import React from "react";
import "../Report/report.css";

function MonthlyReportContainer(props) {

    function helper(month, number) {
        return `${month.transactionReasonPercentages[number].reason} `
        + ` - $${(month.transactionAmountSum * month.transactionReasonPercentages[number].percentage).toFixed(2)}`
    }

    let month = props.month;
    if (month === null || month === undefined) {
        return null;
    }

    month.transactionReasonPercentages.sort((a, b) => b.percentage - a.percentage);

    return (
        <div>
            <h3 id="Month-Header">{month.month}</h3>

            <h4>{`Total Transactions for the month: $${month.transactionAmountSum}`}</h4>


            <p>{helper(month, 0)}</p>

            <p>{helper(month, 1)}</p>

            <p>{helper(month, 2)}</p>

            <p>{helper(month, 3)}</p>

            <p>{helper(month, 4)}</p>
        </div>
    );
}

export default MonthlyReportContainer;