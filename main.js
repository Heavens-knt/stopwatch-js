const hourS = document.querySelector('.hh')
const minutesS = document.querySelector('.mm')
const secondsS = document.querySelector('.ss')
const millisecondsS = document.querySelector('.ms')

const startBtn = document.querySelector('.btn-start')
const stopBtn = document.querySelector('.btn-stop')
const resetBtn = document.querySelector('.btn-reset')

const stopBtnText = document.querySelector('.btn-stop p')
const stopIcon = document.querySelector('.btn-stop img')

let taggleStop = true

let intervalCount  //initialisation of the intervalID

startBtn.onclick = () => {
   
    /*The start button will start only if there is no other extensions running
     * if only the interalCount is not initialized yet
    */
    if(intervalCount === undefined && taggleStop === true) {
        intervalCount = stopwatch()
        taggeleStopBtn()
    }
}

stopBtn.onclick = async () => {
    /*getting times values from the sessionStorage. If not found,
     *the function will throw error 
    */
    try {
        const { milliseconds, seconds, minutes, hours } = JSON.parse(sessionStorage.getItem('times'))
        
        if (taggleStop === false && intervalCount === undefined) {
            intervalCount = stopwatch(milliseconds, seconds, minutes, hours)
            taggeleStopBtn()
            taggleStop = true
        } else {
            clearInterval(intervalCount)
            intervalCount = undefined
            stopIcon.src = './img/start.png'
            stopBtnText.textContent = 'Play'
            taggleStop = false
        }
    } catch (e) {
        alert('Start button ton start again')
    }
}

resetBtn.onclick = () => {
    const spanArray = document.querySelectorAll('.watch span')
    spanArray.forEach(span => {
        clearInterval(intervalCount)
        intervalCount = undefined
        span.textContent = '00'
        taggeleStopBtn()
        sessionStorage.clear()
    })
}

//
function taggeleStopBtn() {
    stopIcon.src = './img/stop.png'
    stopBtnText.textContent = 'Stop'
}

function stopwatch(milliseconds = 0, seconds = 0, minutes = 0, hours = 0) {
    
    return  setInterval(() => {

        millisecondsS.textContent = milliseconds

        if (milliseconds === 100) {
            ++seconds

            secondsS.textContent = seconds < 10 ? `0${seconds}` : seconds

            if (seconds === 60) {
                ++minutes

                minutesS.textContent = minutes < 10 ? `0${minutes}` : minutes

                if (minutes === 60) {
                    ++hours

                    hourS.textContent = hours < 10 ? `0${hours}` : hours

                    minutes -= 60

                }

                seconds -= 60

            }

            milliseconds -= 100
        }

        milliseconds++
        
        //store the times values in the sessionStorage 
        sessionStorage.setItem('times', JSON.stringify({milliseconds, seconds, minutes, hours}))
    }, 10)
    
}
