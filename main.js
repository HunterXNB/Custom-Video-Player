'use strict'
alert('You Can: \n 1-Use right and left arrows to skip \n 2-Use SPACE to pause and play the video')
const player = document.querySelector(".player")
const video = player.querySelector(".viewer")
const progress = player.querySelector(".progress")
const progressBar = player.querySelector(".progress__filled")

const toggle = player.querySelector(".toggle")
const skipButtons = player.querySelectorAll("[data-skip]")
const ranges = player.querySelectorAll(".player__slider")

function togglePlay() {
    if (video.paused) {
        video.play()
    } else {
        video.pause()
    }
}
function updateButton() {
    const state = this.paused ? "►" : "| |"
    toggle.textContent = state

}
function skip() {

    video.currentTime += parseFloat(this.dataset.skip)
}
function handleRangeUpdate() {
    video[this.name] = this.value
}
function handleProgress() {
    const precentage = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${precentage}%`
}
function scrub(e) {
    const time = (e.offsetX / progress.offsetWidth)
    video.currentTime = video.duration * time
}
video.addEventListener("click", togglePlay)

video.addEventListener("pause", updateButton)

video.addEventListener("timeupdate", handleProgress)
video.addEventListener("play", updateButton)
toggle.addEventListener("click", togglePlay)
window.addEventListener('keydown', (event) => {
    if (event.keyCode === 32) {
        togglePlay()
    } else if (event.keyCode === 37) {
        skipButtons[0].click()
    } else if (event.keyCode === 39) {
        skipButtons[1].click()
    }

})
skipButtons.forEach((el) => {
    el.addEventListener("click", skip)
})
ranges.forEach((range) => {
    range.addEventListener("change", handleRangeUpdate)
    range.addEventListener("mousemove", handleRangeUpdate)
})
let mousedown = false
progress.addEventListener("click", scrub)
progress.addEventListener("mousemove", (e) => {
    if (mousedown) {
        scrub(e)
    }
})
progress.addEventListener("mousedown", () => {
    mousedown = true
})
progress.addEventListener("mouseup", () => {
    mousedown = false
})
