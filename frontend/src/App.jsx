import { useState } from "react";
import api from "./api";
import ChartView from "./components/ChartView";

export default function App(){

 const [question,setQuestion]=useState("");
 const [response,setResponse]=useState(null);

 const askAI=async()=>{

  if(!question) return;

  const res=await api.post("/ask",{question});

  setResponse(res.data);
  setQuestion("");
 };

 return(

 <div className="h-screen bg-slate-950 text-white flex flex-col">

  <div className="flex-1 flex flex-col items-center justify-center px-6">

   <h1 className="text-5xl font-bold mb-8 text-green-400">
    Lemon Tree AI
   </h1>

   {response && (

    <div className="bg-slate-900 p-10 rounded-xl shadow-xl w-175 flex flex-col items-center">

     <ChartView chart={response.chart}/>

     <p className="mt-6 text-center text-lg text-gray-300">
      {response.answer}
     </p>

    </div>

   )}

  </div>

  <div className="p-6 border-t border-slate-700 flex justify-center">

   <div className="flex w-175 gap-3">

    <input
     value={question}
     onChange={(e)=>setQuestion(e.target.value)}
     placeholder="Ask about Lemon Tree hotel data..."
     className="flex-1 bg-slate-800 rounded-lg px-4 py-3 outline-none"
    />

    <button
     onClick={askAI}
     className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600"
    >
     Send
    </button>

   </div>

  </div>

 </div>

 );
}