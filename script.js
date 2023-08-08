// stores information about which borders are hidden
// for each number to properly display them on the user interface
const hiddenBorders = {
    0: {
        top: ["bottom"],
        bottom: ["top"],
    },
    1: {
        top: ["top", "left", "bottom"],
        bottom: ["top", "left", "bottom"],
    },
    2: {
        top: ["left"],
        bottom: ["top", "right"],
    },
    3: {
        top: ["left"],
        bottom: ["top", "left"],
    },
    4: {
        top: ["top"],
        bottom: ["top", "left", "bottom"],
    },
    5: {
        top: ["right"],
        bottom: ["top", "left"],
    },
    6: {
        top: ["right", "bottom"],
        bottom: [],
    },
    7: {
        top: ["left", "bottom"],
        bottom: ["top", "left", "bottom"],
    },
    8: {
        top: ["bottom"],
        bottom: [],
    },
    9: {
        top: [],
        bottom: ["left", "top"],
    },
};

// this function is used for formatting hours, minutes, and seconds
// to two digit numbers
const formatDigits = (numbers) => {
    if (String(numbers).length == 1) {
        return `0${numbers}`;
    }
    return numbers;
};

// main function that updates the time in the screen
const updateTime = () => {
    // retrieve current time
    const now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // indicate whether it's AM or PM
    // and display day
    const timeRepresentation = hour >= 12 ? "PM" : "AM";
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const month = now.toLocaleString("default", { month: "long" });
    const day = now.getDate();
    const year = now.getFullYear();

    document.getElementById("info").innerText = `${month} ${day}, ${year} | ${
        days[now.getDay()]
    } | ${timeRepresentation}`;

    // transform hour to 12 hour format
    hour = hour % 12;

    // format the hours, minutes, and seconds to 2 digit numbers
    hour = formatDigits(hour);
    minutes = formatDigits(minutes);
    seconds = formatDigits(seconds);

    // store the hours, minutes, and seconds in an array
    const digits = `${hour}${minutes}${seconds}`.split("").map(Number);

    // retrieve all the elements of the clock including the dividers
    const displayedElements = document.getElementById("clock-display").children;

    // filter the retrieved elements such that only the digits are left
    const displayedDigits = [...displayedElements].filter(
        (element) => !element.classList.contains("divider")
    );

    // add appropriate classes to the elements to hide certain borders
    for (let i = 0; i < displayedDigits.length; i++) {
        const numberHiddenBorders = hiddenBorders[digits[i]];
        const topClasses = getClasses(numberHiddenBorders.top);
        const bottomClasses = getClasses(numberHiddenBorders.bottom);

        displayedDigits[i].children[0].className = `number-top ${topClasses}`;
        displayedDigits[
            i
        ].children[1].className = `number-bottom ${bottomClasses}`;
    }
};

// returns a string consisting of the CSS classes that must be
// applied for a given number to hide appropriate borders
const getClasses = (hiddenBorders) => {
    let classes = "";
    hiddenBorders.forEach((hiddenBorder) => {
        classes += ` hidden-border-${hiddenBorder}`;
    });
    return classes;
};

// calls updateTime() every 1 second
// to update the displayed time on the screen
const startClock = () => {
    setInterval(() => {
        updateTime();
    }, 1000);
};

// function for changing the color of the clock display
const changeColor = () => {
    const colors = [
        "#a179b3",
        "#c1adf0",
        "#add9f0",
        "#8be8c6",
        "#83f295",
        "#4aed21",
        "#ddfa87",
        "#eb43f7",
        "#f74388",
        "#ffffff",
        "#d60943",
        "#d6a309",
        "#0976d6",
        "#09d6c2",
        "#c1adf0",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    document.documentElement.style.setProperty("--display", color);
};

// start the clock
updateTime();
startClock();
