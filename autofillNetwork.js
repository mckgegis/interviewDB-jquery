function fillNetworking(N, types = [], names, companies) {
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

  function selectValue(element, value) {
    let lastValue = element.value;
    element.value = value;
    let event = new Event("change", { target: element, bubbles: true });
    event.simulated = true;
    let tracker = element._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    element.dispatchEvent(event);
  }

  for (let i = 0; i < N; i++) {
    $("#root_networkingConnections__title ~.row button.btn-add")[0].click()
  }
  
  // categories
  let startingId = parseInt($("select")[0].id.split("_").filter(el => el.match(/[0-9]+/)))
  

  Array.from($("select")).forEach((el, idx) => {
    selectValue(el, types[idx] || "clearbit")
  })

  //filling names
  for (let i = 0; i < N; i++) {
    let input = document.getElementById(`root_networkingConnections_${startingId + i}_contact`)
    setNativeValue(input, names[i])
  }

  // filling companies
  let input = Array.from($("input")).filter(el => el.id.match(/react-select-[0-9]+-input/))
  let companiesId = parseInt(input[0].id.split("-").filter(el => el.match(/[0-9]/)))

  for (let i = 0; i < N; i++) {
    let input = document.getElementById(`react-select-${companiesId + i}-input`)
    setNativeValue(input, companies[i])
  }

  window.setTimeout(() => {
    for (let i = 0; i < N; i++) {
      $(`#react-select-${companiesId + i}-option-0`).click()
    }
  }, 5000)
}