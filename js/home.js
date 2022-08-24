// element that will hold photographers elements
const photographerList = document.querySelector("#photographer-list");

// Catch photographers data from mocked local file (TODO: replace local path with API endpoint)
(function () {
  // eslint-disable-next-line no-undef
  request("/data/FishEyeData.json")
    // treat promise data
    .then((data) => {
      try {
        data = JSON.parse(data);
        const photographers = data.photographers;

        // Instanciate photographers list items
        photographers.forEach((photographer) => {
          // eslint-disable-next-line new-cap,no-undef
          const photographerObj = new photographerFactory({
            name: photographer.name,
            id: photographer.id,
            city: photographer.city,
            country: photographer.country,
            tags: photographer.tags,
            tagline: photographer.tagline,
            price: photographer.price,
            portrait: photographer.portrait,
            alt: photographer.alt
          })
          photographerList.innerHTML += photographerObj.renderListItem();
        });
      } catch (e) {
        console.log(e);
        alert(
          "Une erreur est survenue lors du chargement des photographes. Code 1"
        );
      }
    })
    // Error catching
    .catch((err) => {
      console.log(err);
      alert(
        "Une erreur est survenue lors du chargement des photographes. Code 2"
      );
    });
})();

// Filter variables
let tagsFilters = [];

/**
 * Filter photographers list by selected tags in the navbar
 */
function filterPhotographers () {
  photographerList.querySelectorAll(".photographer-list-item").forEach((photographerElement) => {
    // get photographer tags
    const photographerTags = [];
    photographerElement.querySelectorAll("[data-tag-name]").forEach(function (el) {
      photographerTags.push(el.dataset.tagName);
    });

    // Check photographer contains all enabled tags for filter
    const photographerHasTags = tagsFilters.every((v) => photographerTags.includes(v));
    if (photographerHasTags) {
      photographerElement.classList = "photographer-list-item";
    } else {
      photographerElement.classList = "photographer-list-item hidden";
    }
  });
}

// Create tags filter listener
document.querySelectorAll("[data-tags-filter='true']").forEach((tagElement) => {
  tagElement.addEventListener("click", function (e) {
    // Enable or disable tag
    const enabled = tagElement.classList.contains("active");
    tagElement.classList[enabled ? "remove" : "add"]("active");
    !enabled ? tagsFilters.push(tagElement.dataset.tagValue) : tagsFilters = tagsFilters.filter((x) => x !== tagElement.dataset.tagValue);

    // Filter photographers list
    filterPhotographers();
  });
});
