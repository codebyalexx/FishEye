// Filter elements from DOM
const filterSelect = document.querySelector("#filter-selector");
const filterList = document.querySelector("#auto-medias");
const filterItems = filterList.childNodes;

/**
 * Filter the medias by data type (example: likes)
 * @param {string} filter - The type of filter to apply
 */
function applyFilter (filter) {
  const filterItemsArr = [];

  // eslint-disable-next-line no-undef
  const lightboxMedias = lightbox.getMedias();

  console.log(lightboxMedias);

  for (const i in filterItems) {
    if (filterItems[i].nodeType === 1) {
      filterItemsArr.push(filterItems[i]);
    }
  }

  // Sort medias by likes
  if (filter === "likes") {
    // filter dom elements
    filterItemsArr.sort(function (a, b) {
      const aLikes = Number.parseInt(a.getAttribute("filter-likes"));
      const bLikes = Number.parseInt(b.getAttribute("filter-likes"));
      return aLikes === bLikes
        ? 0
        : (aLikes < bLikes ? 1 : -1);
    });

    // filter lightbox elements
    lightboxMedias.sort(function (a, b) {
      const aLikes = a.likes;
      const bLikes = b.likes;
      return aLikes === bLikes
        ? 0
        : (aLikes < bLikes ? 1 : -1);
    });
  } else if (filter === "date") { // Sort by date (old -> new)
    // filter dom elements
    filterItemsArr.sort(function (a, b) {
      const aDate = Date.parse(a.getAttribute("filter-date"));
      const bDate = Date.parse(b.getAttribute("filter-date"));
      return aDate === bDate
        ? 0
        : (aDate < bDate ? 1 : -1);
    });

    // filter lightbox elements
    lightboxMedias.sort(function (a, b) {
      const aDate = Date.parse(a.date);
      const bDate = Date.parse(b.date);
      return aDate === bDate
        ? 0
        : (aDate < bDate ? 1 : -1);
    });
  } else if (filter === "title") { // Sort by title (a -> z)
    // filter dom elements
    filterItemsArr.sort(function (a, b) {
      const aTitle = a.getAttribute("filter-title");
      const bTitle = b.getAttribute("filter-title");
      return aTitle === bTitle
        ? 0
        : (aTitle > bTitle ? 1 : -1);
    });

    // filter lightbox elements
    lightboxMedias.sort(function (a, b) {
      const aTitle = a.title;
      const bTitle = b.title;
      return aTitle === bTitle
        ? 0
        : (aTitle > bTitle ? 1 : -1);
    });
  }

  // apply dom

  filterList.innerHTML = "";

  for (let i = 0; i < filterItemsArr.length; i++) {
    filterList.appendChild(filterItemsArr[i]);
  }

  // eslint-disable-next-line no-undef
  lightbox.setMedias(lightboxMedias);
  // eslint-disable-next-line no-undef
  lightbox.updateHandlers();
}

// Create listeners for filter input
(function () {
  filterSelect.addEventListener("change", (e) => {
    switch (e.target.value) {
      case "Popularité":
        applyFilter("likes");
        break;
      case "Date":
        applyFilter("date");
        break;
      case "Titre":
        applyFilter("title");
        break;
      default:
        applyFilter("likes");
        break;
    }
  });
})();
