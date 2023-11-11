const x = 'x'
const o = 'o'
const combination=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


//variable 
let oturn
const cells = document.querySelectorAll('.cell')
const statsdisplay = document.getElementById('status')
const resetbuttons = document.getElementById('reset')

PressStart()

function PressStart()
{
    oturn = false
    cells.forEach(cell =>
        {
            cell.classList.remove(x,o,'winning-cell')
            cell.addEventListener('click', cursorClick, {once: true})
        })
    setboard()
    statsdisplay.innerHTML = ''
    resetbuttons.removeEventListener('click',PressStart)
}

function endgame(draw)
{
    if(draw)
    {
        statsdisplay.innerText='draw'
    }
    else
    {
        const win = winbycombination(win)
        win.forEach(index=>{
            cells[index].classList.add('winning-cell')
        })
        statsdisplay.innerText = `${oturn ? "o" : "x"} wins!`
    }

    //disrupt the cells after win
    cells.forEach(cell => {
        cell.removeEventListener('click',cursorClick)
    })

    resetbutton.addEventListener('click',PressStart)
}

function winbycombination(current){
    return combination.find(combine=>
        combine.every(index=> cells[index].classList.contains(current))
    )
}



function cursorClick(e)
{
    const cell = e.target
    const current = oturn ? o : x
    //memasukan tanda
    placemark(cell,current)
    // mengecek jika masing masing class sudah menang
    const wincomb = winbycombination(current)
    if(wincomb)
    {
       endgame(false, wincomb)
    }

    else if(draws())
    {
        endgame(true)
    }
    else
    {
        swapping()
        setboard()
    }
}

function placemark(cell,current)
{
    // taking each elemen span in the cell
    const spanelement = cell.querySelector('span')
    spanelement.textContent = current
    cell.classList.add(current)
}

function swapping()
{
    oturn = !oturn
}

function setboard()
{
    const board = document.getElementById('board')
    board.classList.remove(x)
    board.classList.remove(o)
    if(oturn)
    {
        board.classList.add(o)
    }
    else
    {
        board.classList.add(x)
    }
}

function win(current)
{
    return combination.some(combine=> 
        combine.every(index=> cells[index].classList.contains(current))    
    )
}

function draws()
{
    return[...cells].every(cell => 
        
         cell.classList.contains(x) || cell.classList.contains(o)
    )
}

const resetbutton = document.getElementById('reset')
resetbutton.addEventListener('click', PressStart)

const toggledarkmodeselects = document.getElementById('toggleDarkMode')
toggledarkmodeselects.addEventListener('click',toggleDarkMode)

function toggleDarkMode()
{
    const body = document.body
    body.classList.toggle('dark-mode')
}