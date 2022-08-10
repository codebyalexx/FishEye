// element that will hold photographers elements
const photographerList = document.querySelector("#photographer-list");

/**
 * Convert the photographer data into Dom element
 * @param {Object} PhotographerData - Photographer's Data
 * @param {string} PhotographerData.name - Photographer's name
 * @param {number} PhotographerData.id - Photographer's id
 * @param {string} PhotographerData.city - Photographer's city
 * @param {string} PhotographerData.country - Photographer's country
 * @param {string[]} PhotographerData.tags - Photographer's tags
 * @param {string} PhotographerData.tagline - Photographer's caption
 * @param {number} PhotographerData.price - Photographer's daily price
 * @param {string} PhotographerData.portrait - Photographer's portrait filename
 * @param {string} PhotographerData.alt - Photographer's portrait img's description
 * @returns {Element} - Photographer list item
 */
function photographerElementTemplate ({
  name,
  id,
  city,
  country,
  tags,
  tagline,
  price,
  portrait,
  alt
}) {
  const element = document.createElement("li");

  element.classList.add("photographer-list-item");

  const tagsElement = document.createElement("ul");
  tagsElement.className = "thumb-photographer-tags";

  // Create tags elements
  for (let index = 0; index < tags.length; index++) {
    const tag = tags[index];

    const tagElement = document.createElement("li");
    tagElement.innerHTML = `<span class="tag"
    ><a href="#!" class="tag-text" tabindex="0" lang="en">#${tag}</a></span
  >`;

    tagsElement.appendChild(tagElement);
  }

  /* eslint-disable no-undef */

  element.innerHTML = `<article class="thumb-photographer">
  <a href="profile.html?photographerid=${id}" class="thumb-photographer-brand" tabindex="0" aria-label="Accéder au profil de ${name}">
    <img
      src="img/Sample Photos/Photographers ID Photos/${portrait}"
      class="user user--xl"
      alt="${alt}"
    />
    <h2 tabindex="0">${name}</h2>
  </a>
  <div class="thumb-photographer-about">
    <p class="thumb-photographer-about-city" tabindex="0">${city}, ${country}</p>
    <p class="thumb-photographer-about-caption" tabindex="0">
      ${tagline}
    </p>
    <span tabindex="0">${price}€/jour</span>
  </div>
</article>`;

  /* eslint-enable no-undef */

  element.appendChild(tagsElement);

  return element;
}

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
          photographerList.appendChild(
            photographerElementTemplate({
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
          );
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
