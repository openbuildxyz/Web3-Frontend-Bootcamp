// 这个项目的目的是搞清楚react的数据流

import { useState, useEffect, useRef } from "react";
import { API_GET_DATA } from "../global/constants.js";
import Edit from "./components/Edit";
import List from "./components/List";
import "./index.css";

// json-server 要运行起来 npm run server

async function fetchData(setData) {
  const res = await fetch(API_GET_DATA)
  const {data} = await res.json();
  setData(data) 
}

async function fetchSetData(data) {
  await fetch(API_GET_DATA,{
    method:"PUT",
    headers:{
      "Content-type": "application/json",
    },
    body:JSON.stringify({data})
  } )
}

const Home = () => {
  /*useState 是 React 的一个内置 Hook，它允许你在函数组件中添加状态。
  data 是状态变量，你可以通过它来访问当前的状态值。
  setData 是更新函数，用于更新 data 的值。当你调用 setData 并传入新的值时，React 会重新渲染组件，使用新的状态值。*/
  const [data,setData] = useState([])
  // 恒值（标准值） 不在更新的时候不会渲染
  const submittingStatus = useRef(false)


  // console.log("data:",data);

  useEffect(()=>{
    if(!submittingStatus.current){// 比如删除某一个项，检测到值的变化，由于改动会变true，那么就会执行下面重新渲染的语句
      return
    }
    //  任何组件需要进行修改都要传这个参 进行修改后变回false值，"进行修改时"变true
    fetchSetData(data).then(data=>{submittingStatus.current=false})
  },[data])

  useEffect(()=>{
    // 类似vue的生命周期 mounted
    fetchData(setData)
  },[])

  return (
    <div className="app">
      <Edit add={setData} submittingStatus={submittingStatus}/>  
      <List listData={data} deleteData={setData} submittingStatus={submittingStatus}/>
    </div>
  );
};
export default Home;
