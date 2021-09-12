/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
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

function playSongJson(song) {
    return `Playing ${song.title} from ${song.album} by ${song.artist} | ${turnTime(song.duration)}.`
}

// function playSong(songId) {
//     for (let song in player.songs) {
//         if (player.songs[song].id === songId) {
//             return playSongJson(player.songs[songId])
//         } else {
//             throw "id is not valid"
//         }
//     }
// }

function playSong(songId) {
    const song = document.getElementById(songId)
    song.addEventListener(
        "click",
        function () {
            song.classList.add("activeitem")
        },
        false
    )
}

function playPlaylist(id) {
    const playlist = document.getElementById(id)
    playlist.addEventListener(
        "click",
        function () {
            playlist.classList.add("activeitem")
        },
        false
    )
}

/**
 * Creates a song DOM element based on a song object.
 */

function createSongElement({ id, title, album, artist, duration, coverArt }) {
    let children = [
        createElement("img", null, ["image"], { src: coverArt }),
        createElement("p", title, [], { id: "title" }),
        createElement("p", album, [], { id: "album" }),
        createElement("p", artist, [], { id: "album" }),
        createElement("p", turnTime(duration), [], { id: "duration" }),
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
        createElement("p", `${name} - `, [], { id: "playlist" }),
        createElement("p", `${songs.length} Songs - `, [], { id: "album" }),
        createElement("p", ` ${duration} `, [], { id: "duration" }),
    ]
    const classes = ["item"]
    const attrs = { onclick: `playPlaylist(${id})`, id }
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */

function createElement(tagName, children = [], classes = [], attributes = {}) {
    let newElemnet = document.createElement(tagName)
    for (let classAttribute of classes) {
        newElemnet.classList.add(classAttribute)
    }
    for (let attribute in attributes) {
        newElemnet.setAttribute(attribute, attributes[attribute])
    }
    if (Array.isArray(children)) {
        for (let child of children) {
            newElemnet.appendChild(child)
        }
    } else {
        newElemnet.innerHTML = children
    }
    return newElemnet
}

const body = document.body
const songHtml = document.getElementById("songs")
const playlistHtml = document.getElementById("playlist")
for (let song of player.songs) {
    songHtml.appendChild(createSongElement(song))
}
for (let playlist of player.playlists) {
    playlistHtml.appendChild(createPlaylistElement(playlist))
}
