import React, {useState} from 'react'
import categories from 'categories.json'
console.log(categories);

export const SetupScreen = (props) => {

  const[difficulty, setDifficulty] = useState('');
  const[category, setCategory] = useState('');
  const[questionType, setQuestionType] = useState('');
  const[amount, setAmount] = useState('');
  const[inputIsValid, setInputIsValid] = useState(false);
  const[isValidated, setIsValidated] = useState(false);

  const validateInput = () => {
    setIsValidated(true);
    if(category === '' || questionType === '' || difficulty === '') 
    { 
      setInputIsValid(false) 
    }
    else {
      setInputIsValid(true);
      props.onSubmit([category,questionType,difficulty,amount]);
      props.onGameStart();
    }

  }

  const handleQuestionType = (qtype) => {
      setQuestionType('');
      setQuestionType(qtype);
  }

  const handleCategory = (cat) => {
      setCategory('');
      setCategory(cat);
  }

  const handleDifficulty = (diffValue) => {
      setDifficulty('');
      setDifficulty(diffValue);
  }

  const handleAmount = (amountValue) => {
    setAmount('');
    setAmount(amountValue);
}

  return( 
    <section className="setup">
      <h1>QUIZ TIME!</h1> 
      <h2>Now let's set up some options for the questions.</h2> 
      <section className="select-container">
      <label>
      <select
           tabIndex="0"
        onChange={(event) => handleCategory({"TYPE" : "Category", "value": event.target.value})}
      >
        <option value="" >Select a category</option>
        {categories.trivia_categories.map((category,index) => (
          <option value={category.id}
          key={index}
         >
            {category.name}
          </option>
        ))
        }
      </select>
      </label>

      <label>
      <select
     
      onChange={(event) => handleQuestionType({"TYPE" : "QuestionType", "value": event.target.value })}
      >
        <option value="">Select question type</option>
        <option value="boolean">
          True/False
        </option>
        <option value="multiple">
          Multiple choice
        </option>
      </select>
      </label>

    <label>
      <select
          tabIndex="0"
      // value={difficulty}
       onChange={(event) => handleDifficulty({"TYPE" : "Difficulty", "value" : event.target.value })}
      >
        <option value="">Select difficulty</option>
       <option value="easy">
         Easy
       </option>
       <option value="medium">
         Medium
       </option>
       <option value="hard">
         Hard
       </option> 
      </select>
      </label>

      <label>
        <select     tabIndex="0"
          onChange={(event) => handleAmount({"TYPE" : "Amount", "value" : event.target.value })}
          >
          <option value="">Select amount of questions</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </label>
      
{inputIsValid}
      <button type="button"     tabIndex="0" className="start-button" onClick={validateInput}>Start the quiz</button>
      {!inputIsValid && isValidated && <div>Uh oh, please check that you've made all the selectons.</div>}
    
      </section></section>
  )
}