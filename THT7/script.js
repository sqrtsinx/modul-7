document.addEventListener('DOMContentLoaded', function()
{
    //fitur smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor =>{
        anchor.addEventListener('click', function(e){
            e.preventDefault()
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })

// dark toggle
const body = document.body
const darkmode = document.getElementById('dark-mode-toggle')

darkmode.addEventListener('click', function(){
    body.classList.toggle('dark-mode')
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'))
})

if(localStorage.getItem('darkMode') === 'true'){
    body.classList.add('dark-mode')
}
// checking answers from users
const form = document.getElementById('example-form')
const solution = document.getElementById('solution')
form.addEventListener('submit', function(e){
    e.preventDefault()
    const input = document.getElementById('example-input')
    const userans = input.value.trim()
    if (checkans(userans)) 
    {
        alert('Yup you have the correct answers!')
    }
    else
    {
        alert('Incorrect')
        stepssol()
    }
})

// real solution
function checkans(userans)
{
    return userans === '3.16'
}

// step by step solution
function stepssol()
{
    solution.parentNode.removeChild(solution)

    const newsolution = document.createElement('div')
    newsolution.id = 'solution'

    form.parentNode.insertBefore(newsolution,form.nextSibling)
    newsolution.innerHTML = `
    <h2>Solution Steps:</h2>
    <ol>
        <li>using euclidean norm formula where \\(r = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + \\ldots + (z_2-z_1)^2}\\) </li>
        <li>plug in the value becomes \\(r = \\sqrt{(1-4)^2 + (2-3)^2}\\) </li>
        <li>calculate above and the solution are \\(r = \\sqrt{10} \\approx 3.16228\\)</li>
    </ol>`;
    //rendering the latex formula
    if(window.MathJax)
    {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, newsolution], function(){
            console.log(newsolution.innerHTML)
        });
    }
}

// Array of additional mathematical problems
const additionalMathProblems = [
    {
        name: "Birch and Swinnerton-Dyer Conjecture",
        description: "A conjecture about the relationship between the number of rational points on an elliptic curve and the behavior of its L-series."
    },
    {
        name: "Poincaré Conjecture",
        description: "A theorem in topology, stating that every simply connected, closed, 3-dimensional manifold is homeomorphic to a 3-dimensional sphere."
    }
];
// Function to populate the list with additional problems
function populateMathProblems() {
    const problemsList = document.getElementById('mathproblem');
    additionalMathProblems.forEach(problem => {
        const listItem = document.createElement('li');
        const problemText = document.createElement('p');
        problemText.textContent = `${problem.name}: ${problem.description}`;
        listItem.appendChild(problemText);
        problemsList.appendChild(listItem);
    });
}


// Call the function to populate the list
populateMathProblems();

})