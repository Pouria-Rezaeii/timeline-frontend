import React from "react";
import { makeStyles } from "@mui/styles";
import Header from "../components/Header";
import { headerHeight } from "../services/sizes";
import { v4 } from "uuid";
import { axios } from "../services/axios";

export default function Home() {
  const c = useStyles();

  React.useEffect(() => {
    axios.get("http://localhost:4000/events").then(({ data }) => console.log(data));
  }, []);

  const handleClick = () => {
    axios.get("http://localhost:4000/events").then(({ data }) => console.log(data));
  };

  const fakeItems = [
    {
      date: new Date().getDate(),
      issues: [
        { name: "first task", endTime: 5, color: "blue" },
        { name: "secondTask", endTime: 18, color: "green" },
        { name: "third", endTime: 21, color: "red" },
      ],
    },
  ];

  const d = new Date();

  return (
    <div className={c.container}>
      <div className={c.headerBox}>
        <Header />
      </div>
      <div className={c.contentBox}>
        <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "3rem" }}>
          <button onClick={handleClick}>Fetch</button>
          <input
            type="date"
            // value={new Date().toLocaleDateString()}
            onChange={(e) => console.log(e.target.value)}
            className={c.input}
          />
          <input
            type="time"
            // value={`${d.getHours()}:${d.getMinutes()}`}
            onChange={(e) => console.log(e.target.value)}
            className={c.input}
          />
        </div>
        {fakeItems.map((item) => (
          <div key={v4()} className={c.row}>
            {item.issues.map((i, index) => {
              const width =
                (((index === 0 ? i.endTime : i.endTime - item.issues[index - 1].endTime) * 60) /
                  (24 * 60)) *
                100;

              return (
                <div
                  key={v4()}
                  style={{ height: "100%", width: `${width}%`, backgroundColor: i.color }}
                >
                  {i.name}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: any) => ({
  container: {},
  headerBox: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
  },
  contentBox: {
    marginTop: headerHeight,
    padding: "2rem",
  },
  row: {
    padding: 0,
    height: "1rem",
    width: "100%",
    border: "solid 1px #aaa",
    display: "flex",
    borderRadius: 8,
    overflow: "hidden",
  },
  input: {
    fontSize: 20,
    padding: 8,
    fontWeight: 400,
    fill: "red",
    border: "none",
    outline: "none",
    backgroundColor: "#ddd",
    borderRadius: 2,
  },
}));
