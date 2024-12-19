document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");
  const addBtn = document.getElementById("add");
  const newQBtn = document.getElementById("new-question");
  const questionInp = document.getElementById("inp-question");
  const optionInp = document.getElementById("inp-option");
  const questionForm = document.getElementById("question-form");
  const answerInp = document.getElementById("answer");
  const addquestionContainer = document.getElementById("add-question");
  let choiceElement = document.querySelectorAll(".option");

  const questions = JSON.parse(localStorage.getItem("questions")) || [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  saveQuestions();

  let currentQuestionIndex =
    JSON.parse(localStorage.getItem("currentQuestionIndex")) || 0;
  let score = JSON.parse(localStorage.getItem("score")) || 0;
  let optionCount = JSON.parse(localStorage.getItem("optionCount")) || 0;
  let questionAndOption = {
    question: "",
    choices: [],
    answer: "",
  };
  let choiceBoolean =
    JSON.parse(localStorage.getItem("choiceBoolean")) || false;

  questionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const questionInput = questionInp.value.trim();
    const optionInput = optionInp.value.trim();
    const answerInput = answerInp.value.trim();
    if (questionInput.length === 0 || optionInput.length === 0) return;

    if (optionCount <= 4) {
      questionAndOption.question = questionInput;
      questionAndOption.choices.push(optionInput);
      questionAndOption.answer = answerInput;
      optionInp.value = "";
      saveQuestions();
    }

    optionCount++;
    if (optionCount === 4) {
      questionInp.value = "";
      optionInp.value = "";
      answerInp.value = "";
      questions.push(questionAndOption);
      questionAndOption = {
        question: "",
        choices: [],
        answer: "",
      };
      saveQuestions();
      // console.log(questions);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (choiceBoolean === true) {
      score++;
    }
    console.log(score);

    choiceBoolean = false;
    currentQuestionIndex++;
    save();
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    choiceBoolean = false;
    score = 0;
    questionAndOption = {
      question: "",
      choices: [],
      answer: "",
    };
    optionCount = 0;
    resultContainer.classList.add("hidden");
    saveQuestions();
    save();
    reloadDOM();
  });

  startBtn.addEventListener("click", () => {
    save();
    startQuiz();
  });
  function startQuiz() {
    addquestionContainer.classList.add("hidden");
    startBtn.classList.add("hidden");
    newQBtn.classList.add("hidden");
    questionContainer.classList.remove("hidden");

    showQuestion();
  }

  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;

    choicesList.innerHTML = "";
    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.classList.add("option");
      li.addEventListener("click", () => selectAnswer(choice, li));
      // li.addEventListener("click", () => {

      // });
      choicesList.appendChild(li);
    });
  }

  function selectAnswer(choice, li) {
    if (choice === questions[currentQuestionIndex].answer) {
      choiceBoolean = true;
    } else {
      choiceBoolean = false;
    }
    save();
    document.querySelectorAll(".option").forEach((opt) => {
      if (opt != li) {
        opt.classList.remove("selected");
      }
    });
    li.classList.toggle("selected");
    nextBtn.classList.remove("hidden");
  }

  function showResult() {
    resultContainer.classList.remove("hidden");
    questionContainer.classList.add("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }
  function reloadDOM() {
    location.reload();
  }
  function saveQuestions() {
    localStorage.setItem("questions", JSON.stringify(questions));
  }
  function save() {
    localStorage.setItem(
      "currentQuestionIndex",
      JSON.stringify(currentQuestionIndex)
    );
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("choiceBoolean", JSON.stringify(choiceBoolean));
  }
});
