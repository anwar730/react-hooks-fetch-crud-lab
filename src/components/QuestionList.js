import React,{useState,useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => {
        setQuestionList(questions);
      });
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questionList.filter((q) => q.id !== id);
        setQuestionList(updatedQuestions);
      });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questionList.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestionList(updatedQuestions);
      });
  }

  

  function handleDelete(id){
    fetch (`http://localhost:4000/questions/${id}`,{
      method :'DELETE'

    })
    .then (res=>res.json())
    .then((data)=>{
      const filteredQuestions=questionList.filter((question)=>question.id !==id )
      setQuestionList(filteredQuestions)
    })
  }

  

  const questionitems=
      questionList.map((question) =>(<QuestionItem key={question.id} question={question} onDeleteClick={handleDelete} onAnswerChange={handleAnswerChange}/>))
 
  return (
    <section>
      <h1>Quiz Questions</h1>
    
      <ul>{questionitems}</ul>
    </section>
  );
}

export default QuestionList;
