let selectedTab = null;

function initTabs() {
  // setup tab-toggling
  document.querySelectorAll("#tabs h2").forEach( tab => tab.addEventListener("click", selectTab) );
  // click the first tab to enable everything
  document.querySelector("#tabs h2").click();
}

function selectTab(event) {
  const tab = event.target;
  // only accept click, if tab isn't selected
  if(!tab.classList.contains("selected")) {
    // unselect last tab - if any
    if(selectedTab) {
      selectedTab.classList.remove("selected");
      document.querySelector(`#${selectedTab.dataset.tabShow}`).classList.add("hide");
    }
    // select this tab
    tab.classList.add("selected");
    document.querySelector(`#${tab.dataset.tabShow}`).classList.remove("hide");

    // remember the selected tab
    selectedTab = tab;
  }
}

export {initTabs};