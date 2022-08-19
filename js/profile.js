// dom variables - to edit with photographer infos
const pName = document.querySelectorAll("#auto-name");
const caption = document.querySelector("#auto-caption");
const tags = document.querySelector("#auto-tags");
const image = document.querySelector("#auto-image");
const medias = document.querySelector("#auto-medias");
const contactButton = document.querySelector("#contact-button");
const totalLikes = document.querySelector("#photographer-stats-like");
const priceSummary = document.querySelector("#photographer-stats-price");
const contactForm = document.querySelector("#contact-form");

// eslint-disable-next-line no-undef
const lightbox = new Lightbox({});

/**
 * Get photographer id from URL
 * @returns {string} - returns photographer's id
 */
function getPagePhotographerId () {
  // remove URL and keep only params
  let paramsString = window.location.href.split("?");
  paramsString.shift();
  paramsString = paramsString.join("?");

  const searchParams = new URLSearchParams(paramsString);

  return searchParams.get("photographerid").toString();
}

/**
 * Convert media data into dom element
 * @param {Object} MediaData - Media's data
 * @param {string} MediaData.title - Media's title
 * @param {number} MediaData.likes - Media's like count
 * @param {string} MediaData.name - Media's photographer's name
 * @param {string} MediaData.filename - Media's filename
 * @param {string} MediaData.type - Media's type (image or video)
 * @param {string} MediaData.alt - Media's image/video description
 * @param {string} MediaData.date - Media's creation date
 * @returns {Element}
 */
function mediaElementTemplate ({ title, likes, name, filename, type, alt, date }) {
  const element = document.createElement("li");
  element.className = "medias-item";
  element.setAttribute("filter-title", title);
  element.setAttribute("filter-likes", likes);
  element.setAttribute("filter-date", date);

  /* eslint-disable no-undef */
  element.innerHTML = `<article class="medias-container">
  <div class="medias-infos">
    <p class="medias-infos-title" tabindex="0" lang="en">${title}</p>
    <span class="medias-infos-likes" tabindex="0" aria-label="${likes} mentions j'aime">${likes} <i class="fas fa-heart"></i></span>
  </div>
</article>`;
  /* eslint-enable no-undef */

  // Create media's thumbnail
  if (type === "image") {
    const imageElement = document.createElement("img");
    imageElement.src = `img/Sample Photos/${name}/${filename}`;
    imageElement.alt = alt;
    imageElement.className = "medias-thumb";
    imageElement.setAttribute("open-lightbox", true);
    // eslint-disable-next-line no-undef
    imageElement.tabIndex = 0;

    element.querySelector(".medias-container").prepend(imageElement);
  } else if (type === "video") {
    const videoElement = document.createElement("video");
    videoElement.src = `img/Sample Photos/${name}/${filename}`;
    videoElement.setAttribute("open-lightbox", true);
    videoElement.className = "medias-thumb";
    videoElement.ariaLabel = alt;
    // eslint-disable-next-line no-undef
    videoElement.tabIndex = 0;

    const videoSourceElement = document.createElement("source");
    videoSourceElement.src = `img/Sample Photos/${name}/${filename}`;
    videoSourceElement.type = "video/mp4";
    videoElement.appendChild(videoSourceElement);

    element.querySelector(".medias-container").prepend(videoElement);
  } else return element;

  return element;
}

(function () {
  // eslint-disable-next-line no-undef
  request("/data/FishEyeData.json", "GET")
    .then((data) => {
      try {
        data = JSON.parse(data);

        // Get current photographer from URL
        const targetProfile = data.photographers.find(
          (p) => p.id.toString() === getPagePhotographerId()
        );
        // Get the medias of the target photographer
        const targetMedias = data.media.filter(function (el) {
          return el.photographerId.toString() === getPagePhotographerId();
        });

        // Count total likes
        let totalLikesCount = 0;
        targetMedias.forEach(function (el) {
          totalLikesCount += el.likes;
        });

        // Edit photographer infos in the DOM
        pName.forEach(function (el) {
          el.innerText = targetProfile.name;
        });
        priceSummary.innerText = targetProfile.price;
        totalLikes.innerText = totalLikesCount;
        caption.innerHTML = `${targetProfile.city}, ${targetProfile.country} <span>${targetProfile.tagline}</span>`;
        image.src = `img/Sample Photos/Photographers ID Photos/${targetProfile.portrait}`;
        image.alt = targetProfile.alt;
        targetProfile.tags.forEach((t) => {
          const tagElement = document.createElement("li");
          /* eslint-disable no-undef */
          tagElement.innerHTML = `<span class="tag"
    ><a href="#!" class="tag-text" tabindex="0" lang="en">#${t}</a></span
  >`;
          /* eslint-enable no-undef */

          tags.appendChild(tagElement);
        });
        // eslint-disable-next-line no-undef
        image.tabIndex = 0;

        // eslint-disable-next-line no-undef
        document.querySelector("#filter-selector").tabIndex = 0;

        // eslint-disable-next-line no-unused-vars
        const contactFormObject = new ContactForm({ // eslint-disable-line no-undef
          handler: contactButton,
          wrapper: contactForm
        });

        const lightboxMedias = [];

        // Generating medias
        targetMedias.forEach((media) => {
          // Adding medias to medias list
          medias.appendChild(
            mediaElementTemplate({
              filename: media.image || media.video,
              type: media.image ? "image" : "video",
              likes: media.likes,
              name: targetProfile.name,
              title: media.title,
              alt: media.alt,
              date: media.date
            })
          );

          // Add media to the lightbox
          const lightboxMediaParameters = {
            filename: (
              `img/Sample Photos/${targetProfile.name}/${media.image || media.video
              }`
            ),
            type: media.image ? "image" : "video",
            title: media.title,
            alt: media.alt,
            likes: media.likes,
            date: media.date
          };

          lightboxMedias.push(lightboxMediaParameters);
        });

        // update lightbox
        lightbox.setMedias(lightboxMedias);
        lightbox.updateHandlers();
        // eslint-disable-next-line no-undef
        applyFilter("likes");
      } catch (e) {
        console.log(e);
        alert("Une erreur est survenue lors du chargement du profil. Code 1");
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Une erreur est survenue lors du chargement du profil. Code 2");
    });
})();
