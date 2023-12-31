// The two sections of stops (start and ending)
const startStopsEle = document.getElementById("start-s");
const endStopsEle = document.getElementById("end-s");

// The stop results of the sections
const startResultsEle = document.getElementById("start-results");
const endResultsEle = document.getElementById("end-results");

// The search inputs of the sections
const startSearch = document.getElementById("start-search");
const endSearch = document.getElementById("end-search");
startSearch.addEventListener("input", () => { displayPlannerStopSections(startResultsEle, startSearch.value) });
endSearch.addEventListener("input", () => { displayPlannerStopSections(endResultsEle, endSearch.value) });


// The display of all itineraries
const itinerariesEle = document.getElementById("itineraries");

// What the user wants to minimize
const minimizeEle = document.getElementById("minimize");



/**
 * When a stop is clicked, make it the selected stop for its section
 * @param {Element} stop_ele - The element of the selected stop
 * @param {Element} section_ele - The section that the stop was clicked in
 */
function selectStop(stop_ele, section_ele) {
    section_ele.querySelectorAll(`.planner-stop`).forEach(ele => { ele.classList.remove("selected"); });
    stop_ele.classList.add("selected");
}



/**
 * Before makign a call to the API, we must verify a few things.
 * @returns Nothing, just cuts the function short if there is an error
 */
async function verifyChoices() {
    let s_sel = startStopsEle.querySelectorAll(`.planner-stop.selected`);
    let e_sel = endStopsEle.querySelectorAll(`.planner-stop.selected`);

    // If there is not exactly one selection for each part:
    if (s_sel.length != 1 || e_sel.length != 1) {
        displayError("Select a starting stop and an ending stop.");
        return;
    }

    let start = s_sel[0].getAttribute("data-id")
    let end = e_sel[0].getAttribute("data-id")

    // If the user sleected the same two stops:
    if (start == end) {
        displayError("Select two different stops.");
        return;
    }

    // If (somehow) something is not being minimized
    if (minimizeEle.value=="") {
        displayError("Choose to minimize something.");
        return;
    }

    // If everything is fine, make a call to the API and display the plan:
    await fetch(`${REQ_URL}getplannedtripsbystops?key=${API_KEY}&origin_stop_id=${start}&destination_stop_id=${end}&minimize=${minimizeEle.value}`)
        .then(res => res.json())
        .then(data => displayItineraries(data));
}



/**
 * Display an error message if something goes wrong with itineraries.
 * @param {string} msg - Error message
 */
function displayError(msg) {
    itinerariesEle.style.justifyContent = "center";
    itinerariesEle.innerHTML = `<h3>${msg}</h3>`;
}



/**
 * Given the generated itineraries, create and display itinerary HTML.
 * @param {JSON} data - JSON of all the itineraries generated by MTD API
 * @returns Nothing, just cuts the function short (for errors)
 */
function displayItineraries(data) {
    itinerariesEle.innerHTML = ``;

    let itins = data.itineraries;

    // Although not technically an error, a response
    // of not possible trip can't be displayed properly.
    if (itins.length==0) {
        displayError("Trip is not possible at this time.");
        return;
    }

    // For each itinerary available:
    itins.forEach(it => {
        let itinHTML = `<div class="itinerary">
                        <h3>${it.travel_time} minutes</h3>`;
        // For each leg of each itinerary:
        it.legs.forEach(leg => {
            itinHTML += `${getLegHTML(leg)}<img src="./img/arrow.png">`;
        });
        itinHTML += `<div class="leg end">END</div></div>`;
        itinerariesEle.innerHTML += itinHTML;
    });
    itinerariesEle.style.justifyContent = "flex-start";
}



/**
 * Given a specific leg of a trip, generate the proper HTML.
 * @param {JSON} leg - JSON of the specific leg
 * @returns {string} String representation of the leg HTML
 */
function getLegHTML(leg) {
    let legHTML = ``;

    // If leg type is walking (from one bus stop to the next):
    if (leg.type=="Walk") {
        legHTML += `
            <div class="leg walk">
                <h3>Walking</h3>
                <h4>${leg.walk.begin.name} to ${leg.walk.end.name}</h4>
            </div>
        `;
    }
    
    // If leg type is service:
    else {
        /**
         * Normally there will just be one bus service per Service-type leg (leg.services will be length 1). 
         * However, interlines will sometimes occur (leg.services length > 1). We will display these as separate legs
         */
        for (let i=0; i<leg.services.length; i++) {
            let ser = leg.services[i];
            legHTML += `<div class="leg service">
                            <h3>Service</h3>
                            <h4>${ser.begin.name} to ${ser.end.name}.</h4>
                            <p>by the ${ser.route.route_short_name} ${ser.route.route_long_name}</p>
                        </div>`;
            if (i != leg.services.length-1) legHTML += `<img src="./img/arrow.png">`;
        }
    }

    return legHTML;
}



/**
 * Fill each section with all the stops and add event listeners to them for selection.
 * @param {Element} section_ele - The section that is being searched in.
 * @param {string} key - User's search query
 */
function displayPlannerStopSections(section_ele, key) {
    const selectedEle = section_ele.querySelector(".planner-stop.selected");
    let selectedID = "";
    if (selectedEle != null) selectedID = selectedEle.getAttribute("data-id");
    

    let filtered_list = getSearchResults(key.toLowerCase());
    
    // Add all stop elements to each section:
    let allStopsElesHTML = ``;
    filtered_list.forEach(stop => {
        allStopsElesHTML += `<div class="planner-stop" data-id="${stop.id}">${stop.name}</div>`;
    });
    section_ele.innerHTML = allStopsElesHTML;

    // Add event listeners to all stops in each section (they need to be section-specific):
    section_ele.querySelectorAll(".planner-stop").forEach(ele => {
        ele.addEventListener("click", () => { selectStop(ele, section_ele) });
        if (selectedID == ele.getAttribute("data-id")) selectStop(ele, section_ele);
    });
}