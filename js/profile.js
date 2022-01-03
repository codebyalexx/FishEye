const pName = document.querySelector("#auto-name");
const caption = document.querySelector("#auto-caption");
const tags = document.querySelector("#auto-tags");
const image = document.querySelector("#auto-image");
const medias = document.querySelector("#auto-medias");

function getPagePhotographerId () {
  let paramsString = window.location.href.split("?");
  paramsString.shift();
  paramsString = paramsString.join("?");

  const searchParams = new URLSearchParams(paramsString);

  return searchParams.get("photographerid").toString();
}

function mediaElementTemplate ({ title, likes, name, image }) {
  const element = document.createElement("li");
  element.className = "medias-item";

  element.innerHTML = `<article class="medias-container">
  <img
    src="/img/Sample Photos/${name}/${image}"
    alt="${title}"
    class="medias-thumb"
  />
  <div class="medias-infos">
    <p class="medias-infos-title">${title}</p>
    <span class="medias-infos-likes">${likes} <i class="fas fa-heart"></i></span>
  </div>
</article>`;

  return element;
}

(function () {
  // eslint-disable-next-line no-undef
  request("/data/FishEyeData.json", "GET")
    .then((data) => {
      try {
        data = JSON.parse(data);

        const targetProfile = data.photographers.find(
          (p) => p.id.toString() === getPagePhotographerId()
        );
        const targetMedias = data.media.filter(function (el) {
          return el.photographerId.toString() === getPagePhotographerId();
        });

        pName.innerText = targetProfile.name;
        caption.innerHTML = `${targetProfile.city}, ${targetProfile.country} <span>${targetProfile.tagline}</span>`;
        image.src = `/img/Sample Photos/Photographers ID Photos/${targetProfile.portrait}`;
        targetProfile.tags.forEach((t) => {
          const tagElement = document.createElement("li");
          tagElement.innerHTML = `<span class="tag"
    ><a href="#!" class="tag-text">#${t}</a></span
  >`;

          tags.appendChild(tagElement);
        });

        targetMedias.forEach((media) => {
          medias.appendChild(mediaElementTemplate({
            image: media.image,
            likes: media.likes,
            name: targetProfile.name,
            title: media.title
          }));
        });
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
