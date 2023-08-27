const stockList = document.getElementById("stockList");
const itemNameInput = document.getElementById("itemName");
const itemLocationInput = document.getElementById("itemLocation");
const itemBoxInput = document.getElementById("itemBox"); // Added box input
const addItemButton = document.getElementById("addItem");
const removeItemButton = document.getElementById("removeItem");
const searchItemInput = document.getElementById("searchItem");
const searchButton = document.getElementById("searchButton");
const downloadReportButton = document.getElementById("downloadReport");

const workerData = {}; // Store worker information

const stockContent = document.getElementById("stockContent");
const actionsContent = document.getElementById("actionsContent");
const searchContent = document.getElementById("searchContent");
const reportContent = document.getElementById("reportContent");

const showStockButton = document.getElementById("showStock");
const showActionsButton = document.getElementById("showActions");
const showSearchButton = document.getElementById("showSearch");
const showReportButton = document.getElementById("showReport");

const searchResults = document.getElementById("searchResults");

showStockButton.addEventListener("click", () => showContent(stockContent));
showActionsButton.addEventListener("click", () => showContent(actionsContent));
showSearchButton.addEventListener("click", () => showContent(searchContent));
showReportButton.addEventListener("click", () => showContent(reportContent));

addItemButton.addEventListener("click", addItemToStock);
removeItemButton.addEventListener("click", removeItemFromStock);
searchButton.addEventListener("click", searchItem);
downloadReportButton.addEventListener("click", downloadReport);

function showContent(contentElement) {
  [stockContent, actionsContent, searchContent, reportContent].forEach(content => {
    if (content === contentElement) {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  });
}

function addItemToStock() {
  const itemName = itemNameInput.value;
  const itemLocation = itemLocationInput.value;
  const itemBox = itemBoxInput.value; // Get the box input value

  if (itemName.trim() !== "" && itemLocation.trim() !== "" && itemBox.trim() !== "") {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${itemName}</strong> (Location: ${itemLocation}, Box: ${itemBox})`;
    stockList.appendChild(listItem);

    itemNameInput.value = "";
    itemLocationInput.value = "";
    itemBoxInput.value = ""; // Clear the box input value

    const workerName = prompt("Enter your name:");
    const workerEmail = prompt("Enter your email:");

    if (workerName && workerEmail) {
      workerData[itemName] = {
        addedBy: workerName,
        addedByEmail: workerEmail,
      };
    }
  }
}

function removeItemFromStock() {
  if (stockList.children.length > 0) {
    const removedItem = stockList.removeChild(stockList.lastChild);
    const itemName = removedItem.querySelector("strong").textContent;

    const workerName = prompt("Enter your name:");
    const workerEmail = prompt("Enter your email:");

    if (workerName && workerEmail) {
      workerData[itemName].removedBy = workerName;
      workerData[itemName].removedByEmail = workerEmail;
    }
  }
}

function searchItem() {
  const searchTerm = searchItemInput.value.toLowerCase();

  const stockItems = Array.from(stockList.children);
  let found = false; // Flag to track if any item was found

  searchResults.innerHTML = ""; // Clear previous search results

  stockItems.forEach(item => {
    const itemText = item.textContent.toLowerCase();
    if (itemText.includes(searchTerm)) {
      const resultItem = document.createElement("p");
      resultItem.textContent = item.textContent;
      searchResults.appendChild(resultItem);
      found = true; // Set flag to true if item is found
    }
  });

  if (!found) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "Item not found in stock.";
    searchResults.appendChild(noResultsMessage);
  }
}

function downloadReport() {
  let report = "Item\tAdded By\tAdded By Email\tRemoved By\tRemoved By Email\n";

  Array.from(stockList.children).forEach(item => {
    const itemName = item.querySelector("strong").textContent;
    const addedBy = workerData[itemName]?.addedBy || "";
    const addedByEmail = workerData[itemName]?.addedByEmail || "";
    const removedBy = workerData[itemName]?.removedBy || "";
    const removedByEmail = workerData[itemName]?.removedByEmail || "";

    report += `${itemName}\t${addedBy}\t${addedByEmail}\t${removedBy}\t${removedByEmail}\n`;
  });

  const blob = new Blob([report], { type: "text/tab-separated-values;charset=utf-8" });
  const fileName = "stock_report.tsv";

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, fileName);
  } else {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }
}
