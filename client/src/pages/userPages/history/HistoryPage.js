import React from "react";
import { useState, useEffect } from "react";
import { apiHandler } from "./apiHandler";
import { useNavigate } from "react-router-dom";

import "./style.css";
import UserNavBar from "../../../components/navBars/UserNavBar";
import { useAsyncValue } from "react-router-dom";

export default function HistoryPage() {
  // const [history, setHistory] = useState();
  const [displayHistory, setDisplayHistory] = useState();
  const navigate = useNavigate();
  const api = new apiHandler();
  
  
  useEffect(() => {
    async function fetchData() {
      const userID = localStorage.userID;
      const returnedHistory = await api.getUserHistory();
      // setHistory(returnedHistory.data);
      const returnedQuestionIDs = await Promise.all(
        returnedHistory.data.map(async (el) => {
          const result = await api.getExamQuestions(el.examID);
          return result.data;
        })
      );

      const test = returnedHistory.data.map((row) => {
        return returnedQuestionIDs.map((el) => {
          return el.map((e) => {
            if (e.examID == row.examID) {
              return { ...e, historyID: row.id };
            }
          });
        });
      });

      let cleanTest = test.map((el, index) => {
        return el[index].map((e) => {
          return e;
        });
      });

      var arr = [];
      for (let i = 0; i < cleanTest.length; i++) {
        arr.push(...cleanTest[i]);
      }

      const returnedData = await Promise.all(
        arr.map(async (element) => {
          const res = await api.getQuestion(element.questionID);
          return {
            historyID: element.historyID,
            setting: res.data.returnedQuestion.setting,
          };
        })
      );

      let id = 0;
      let arr2 = [];
      let counter = 0;
      for (let i = 0; i < returnedData.length; i++) {
        if (i == 0) {
          id = returnedData[i].historyID;
          arr2.push({ historyID: id, settings: [returnedData[i].setting] });
        } else {
          if (returnedData[i].historyID != id) {
            id = returnedData[i].historyID;
            arr2.push({ historyID: id, settings: [returnedData[i].setting] });
            counter++;
          } else {
            arr2[counter] = {
              ...arr2[counter],
              settings: [...arr2[counter].settings, returnedData[i].setting],
            };
          }
        }
      }

      for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < returnedHistory.data.length; j++) {
          console.log(arr2[i]);
          if (arr2[i].historyID == returnedHistory.data[j].id) {
            arr2[i] = {
              ...arr2[i],
              examID: returnedHistory.data[j].examID,
              grade: returnedHistory.data[j].grade,
            };
          }
        }
      }
      setDisplayHistory(arr2);
      localStorage.setItem("history", JSON.stringify(arr2))
    }
    fetchData();
  }, []);

  const handleRetake = (e) => {
    localStorage.setItem("examID", e.target.id);
    navigate(`/${localStorage.username}/exam`);
  };

 // console.log(history);
  // console.log(displayHistory);
  if (!displayHistory || !localStorage.history) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <UserNavBar />
        <div className="historyPage-background background-color">
          <div className="historyPage-container">
            {JSON.parse(localStorage.history).map((history) => (
              <>
                <div className="historyPage-history-container">
                  <div className="historyPage-setting"><b>Settings:</b></div>
                  {history.settings.map((setting) => {
                    return <div>{setting}</div>;
                  })}
                  <div><b>Grade: </b>{history.grade}</div>
                  <button
                    id={history.examID}
                    className="historyPage-button"
                    onClick={handleRetake}
                  >
                    Retake
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
      </>
    );
  }
}
