const cards = [
    { question: "What is HTML?", answer: "HTML stands for HyperText Markup Language. It structures web pages." },
    { question: "What is CSS?", answer: "CSS stands for Cascading Style Sheets. It styles web pages." },
    { question: "What is JavaScript?", answer: "JavaScript adds interactivity and dynamic behavior to websites." },
    { question: "What is a variable?", answer: "A variable stores a value that a program can use." },
    { question: "What is a function?", answer: "A function is a reusable block of code that performs a task." }
];

let currentIndex = 0;
let showingAnswer = false;
let editingIndex = null;

const cardContent = document.getElementById("cardContent");
const cardCount = document.getElementById("cardCount");
const sideLabel = document.getElementById("sideLabel");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");
const formSection = document.getElementById("formSection");
const formTitle = document.getElementById("formTitle");
const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const message = document.getElementById("message");

function renderCard() {
    if (cards.length === 0) {
        cardContent.textContent = "No flashcards yet. Add your first card!";
        cardCount.textContent = "Card 0 of 0";
        sideLabel.textContent = "Empty";
        showAnswerBtn.disabled = true;
        previousBtn.disabled = true;
        nextBtn.disabled = true;
        editBtn.disabled = true;
        deleteBtn.disabled = true;
        return;
    }

    const card = cards[currentIndex];

    cardContent.textContent = showingAnswer
        ? card.answer
        : card.question;

    sideLabel.textContent = showingAnswer ? "Answer" : "Question";
    cardCount.textContent =
        `Card ${currentIndex + 1} of ${cards.length}`;

    showAnswerBtn.textContent =
        showingAnswer ? "Show Question" : "Show Answer";

    showAnswerBtn.disabled = false;
    previousBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;
    editBtn.disabled = false;
    deleteBtn.disabled = false;
}

function closeForm() {
    formSection.hidden = true;
    editingIndex = null;
    questionInput.value = "";
    answerInput.value = "";
}

function openForm(index = null) {
    if (index !== null) {
        editingIndex = index;
        formTitle.textContent = "Edit Flashcard";
        questionInput.value = cards[index].question;
        answerInput.value = cards[index].answer;
    } else {
        editingIndex = null;
        formTitle.textContent = "Add Flashcard";
        questionInput.value = "";
        answerInput.value = "";
    }

    message.textContent = "";
    formSection.hidden = false;
    questionInput.focus();
}

showAnswerBtn.addEventListener("click", () => {
    showingAnswer = !showingAnswer;
    renderCard();
});

previousBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        showingAnswer = false;
        renderCard();
        message.textContent = "";
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        showingAnswer = false;
        renderCard();
        message.textContent = "";
    }
});

addBtn.addEventListener("click", () => openForm());

editBtn.addEventListener("click", () => {
    if (cards.length > 0) openForm(currentIndex);
});

deleteBtn.addEventListener("click", () => {
    if (cards.length === 0) return;

    if (!confirm("Are you sure you want to delete this flashcard?")) {
        return;
    }

    cards.splice(currentIndex, 1);

    if (currentIndex >= cards.length) {
        currentIndex = Math.max(0, cards.length - 1);
    }

    showingAnswer = false;
    closeForm();
    renderCard();
    message.textContent = "Flashcard deleted.";
});

saveBtn.addEventListener("click", () => {
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (!question || !answer) {
        message.textContent = "Please enter both question and answer.";
        return;
    }

    if (editingIndex !== null) {
        cards[editingIndex] = { question, answer };
        currentIndex = editingIndex;
        message.textContent = "Flashcard updated successfully.";
    } else {
        cards.push({ question, answer });
        currentIndex = cards.length - 1;
        message.textContent = "New flashcard added successfully.";
    }

    showingAnswer = false;
    closeForm();
    renderCard();
});

cancelBtn.addEventListener("click", () => {
    closeForm();
    message.textContent = "";
});

renderCard();