/**
 * Those are my own fuctions for the rest of the code
 */
function turnTime(time) {
    // use the countdown mechanism
    if (Math.floor(time / 60).toString().length > 1 && (time % 60).toString().length <= 2) {
        return `${Math.floor(time / 60)}:${time % 60}`
    } else if (Math.floor(time / 60).toString().length >= 1 && (time % 60).toString().length < 2) {
        return `0${Math.floor(time / 60)}:${time % 60}0`
    }
    return `0${Math.floor(time / 60)}:${time % 60}`
}

function playlistDuration(id) {
    // get all the seconds durations added
    let count = 0
    for (let n of player.playlists) {
        if (n.id === id) {
            for (let i of n.songs) {
                for (let g of player.songs) {
                    if (g.id === i) {
                        count += g.duration
                    }
                }
            }
        }
    }
    return count
}

function ganerateSongId() {
    let idList = []
    for (let song of player.songs) {
        idList.push(song.id)
    }
    return Math.max(...idList) + 1
}

/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    const song = document.getElementById(songId)
    const allsongs = document.querySelectorAll("div .item")
    allsongs.forEach((choice) => choice.classList.remove("activeitem"))
    song.classList.add("activeitem")
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    // Your code here
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    let addNewSong = {
        id: ganerateSongId(),
        title: title,
        album: album,
        artist: artist,
        duration: duration,
        coverArt: coverArt,
    }
    const songDiv = document.getElementById("songs")
    player.songs.push(addNewSong)
    // generateAddedSongs(addNewSong)
    const addedNewSong = songDiv.appendChild(createSongElement(addNewSong))
    addedNewSong.appendChild(handleSongClickEvent())
    return alert("Song Added Successfuly")
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */

// The function will create the button with functionality
//but not add it return it!
function handleSongClickEvent() {
    const itembox = document.getElementsByClassName("item")
    const cancelButton = document.createElement("span")
    cancelButton.textContent = "⛔️"
    const close = document.querySelectorAll("span")
    // adding the button to defualt songs
    for (let btn of close) {
        btn.addEventListener("click", (e) => {
            btn.parentNode.remove()
        })
    }
    for (let item of itembox) {
        item.append(cancelButton)
    }

    cancelButton.addEventListener("click", (e) => {
        cancelButton.parentNode.remove()
    })
    // adding the button for any new song
    return cancelButton
}

// The function will create the button with functionality
//but add it not return it!

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */

function handleAddSongEvent(event) {
    const addSongBtn = document.getElementById("add-button")
    const title = document.getElementById("title").value
    const album = document.getElementById("album").value
    const artist = document.getElementById("artist").value
    const duration = document.getElementById("duration").value
    const coverArt = document.getElementById("cover-art").value
    addSongBtn.addEventListener(
        "click",
        addSong({
            title,
            album,
            artist,
            duration,
            coverArt,
        })
    )
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    let children = [
        createElement("img", [], ["image"], { src: coverArt }),
        createElement("p", [title], [], { id: "title" }),
        createElement("p", [album], [], { id: "album" }),
        createElement("p", [artist], [], { id: "album" }),
        createElement("p", [turnTime(duration)], [], { id: "dur" }),
    ]
    const classes = ["item"]
    const attrs = { onclick: `playSong(${id})`, id }
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    let duration = turnTime(playlistDuration(id))
    const children = [
        createElement("p", [`${name} - `], [], { id: "playlist" }),
        createElement("p", [`${songs.length} Songs - `], [], { id: "album" }),
        createElement("p", [` ${duration} `], [], { id: "duration" }),
    ]
    const classes = ["item"]
    const attrs = { onclick: `playSong(${id})`, id }
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */

function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    const el = document.createElement(tagName)
    // Children
    for (const child of children) {
        el.append(child)
    }
    // Classes
    for (const cls of classes) {
        el.classList.add(cls)
    }
    // Attributes
    for (const attr in attributes) {
        el.setAttribute(attr, attributes[attr])
    }
    for (const event in eventListeners) {
        el.setAttribute(`on${eventListeners[event].type}: ${eventListeners[event]}`)
    }
    return el
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
const SONGHTML = document.getElementById("songs")

// This function aims to geanerate the default songs given at player.js
function generateDefaultSongs() {
    for (let song of player.songs) {
        SONGHTML.appendChild(createSongElement(song))
        handleSongClickEvent()
    }
}

// This function aims to geanerate any additional songs
// function generateAddedSongs(song) {
//     SONGHTML.appendChild(createSongElement(song))
//     handleSongClickEvent()
// }

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */

function generatePlaylists() {
    const playlistHtml = document.getElementById("playlist")
    for (let playlist of player.playlists) {
        playlistHtml.appendChild(createPlaylistElement(playlist))
        handleSongClickEvent()
    }
}

// Creating the page structure
generateDefaultSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)

// Loop through the elements:
const body = document.body

/* Working Notes(anything come on mind):
1. The idea is to add the input form fields to the player.js and it will add authomaticali


*/
