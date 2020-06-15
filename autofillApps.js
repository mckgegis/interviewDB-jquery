function fillApplications(N, companies, titles, jobBoards) {
  function setNativeValue(element, value) {
    let lastValue = element.value;
    element.value = value;
    let event = new Event("input", { target: element, bubbles: true });
    // React 15
    event.simulated = true;
    // React 16
    let tracker = element._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    element.dispatchEvent(event);
  }

  for (let i = 0; i < N; i++) {
    $("#root_applications__title ~.row button.btn-add")[0].click()
  }

  let companiesInput = Array.from($("input")).filter(el => el.id.match(/react-select-[0-9]+-input/))
  let companiesId = parseInt(companiesInput[0].id.split("-").filter(el => el.match(/[0-9]+/)))
  // filling companies
  for (let i = 0; i < N ; i++) {
    let companiesInput = document.getElementById(`react-select-${companiesId + 2 * i}-input`)
    let jobBoardsInput = document.getElementById(`react-select-${companiesId + 2 * i + 1}-input`)
    setNativeValue(companiesInput, companies[i])
    setNativeValue(jobBoardsInput, jobBoards[i])
  }
  
  //filling titiles
  let titlesInput = Array.from($("input")).filter(el => el.id.includes("jobTitle"))
  let titlesId = parseInt(titlesInput[0].id.split("_").filter(el => el.match(/[0-9]/)))
  for (let i = 0; i < N; i++) {
    let input = document.getElementById(`root_applications_${titlesId + i}_jobTitle`)
    setNativeValue(input, titles[i])
  }

  window.setTimeout(() => {
    for (let i = 0; i < N; i++) {
      document.getElementById(`react-select-${companiesId + 2 * i}-option-0`).click()
      document.getElementById(`react-select-${companiesId + 2 * i + 1}-option-0`).click()
    }
  }, 5000)
}