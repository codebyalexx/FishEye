// eslint-disable-next-line no-unused-vars
class Lightbox {
  constructor ({ medias = [] }) {
    this.currentIndex = 0;
    this.medias = medias;
    this.listeners = {};

    this.updateHandlers();
  }

  setMedias (newMedias) {
    this.medias = newMedias;
  }

  getMedias () {
    return this.medias;
  }

  updateHandlers () {
    document.querySelectorAll("[open-lightbox]").forEach((lightboxHandler) => {
      const parsedSrc = lightboxHandler.src.replaceAll("%20", " ");

      this.listeners[parsedSrc] && lightboxHandler.removeEventListener("click", this.listeners[parsedSrc]);

      this.listeners[parsedSrc] = () => {
        const targetMedia = this.medias.find((m) => parsedSrc.includes(m.filename));
        this.open(this.medias.indexOf(targetMedia));
      };

      lightboxHandler.addEventListener("click", this.listeners[parsedSrc]);
    });
  }

  getElement (targetMedia) {
    const lightboxModal = document.createElement("div");
    lightboxModal.className = "lightbox-modal";

    const lightboxDialog = document.createElement("div");
    lightboxDialog.className = "lightbox-dialog";
    lightboxModal.appendChild(lightboxDialog);

    const lightboxLeftContainer = document.createElement("div");
    lightboxLeftContainer.className = "lightbox-dialog-previousbox";
    lightboxDialog.appendChild(lightboxLeftContainer);

    const lightboxPrevious = document.createElement("a");
    lightboxPrevious.innerHTML = "<i class='far fa-angle-left'></i>";
    lightboxPrevious.className = "lightbox-dialog-previous";
    lightboxPrevious.tabIndex = 0;
    lightboxPrevious.ariaLabel = "Image précédente";
    this.medias[this.currentIndex - 1] !== undefined &&
      lightboxLeftContainer.appendChild(lightboxPrevious);

    const lightboxContentContainer = document.createElement("div");
    lightboxContentContainer.className = "lightbox-dialog-contentbox";
    lightboxDialog.appendChild(lightboxContentContainer);

    if (targetMedia.type === "image") {
      const lightboxImage = document.createElement("img");
      lightboxImage.className = "lightbox-dialog-contentbox-image";
      lightboxImage.src = targetMedia.filename;
      lightboxImage.alt = targetMedia.alt;
      lightboxImage.tabIndex = 0;

      lightboxContentContainer.appendChild(lightboxImage);
    } else if (targetMedia.type === "video") {
      const lightboxVideo = document.createElement("video");
      lightboxVideo.className = "lightbox-dialog-contentbox-video";
      lightboxVideo.controls = true;
      // lightboxVideo.alt = currentMedia.alt;
      lightboxVideo.tabIndex = 0;

      const lightboxVideoSource = document.createElement("source");
      lightboxVideoSource.src = targetMedia.filename;
      lightboxVideoSource.type = "video/mp4";
      lightboxVideo.appendChild(lightboxVideoSource);

      lightboxContentContainer.appendChild(lightboxVideo);
    } else return this.close();

    const lightboxTitle = document.createElement("p");
    lightboxTitle.className = "lightbox-dialog-contentbox-title";
    lightboxTitle.innerText = targetMedia.title;
    lightboxTitle.tabIndex = 2;
    lightboxContentContainer.appendChild(lightboxTitle);

    const lightboxRightContainer = document.createElement("div");
    lightboxRightContainer.className = "lightbox-dialog-nextbox";
    lightboxDialog.appendChild(lightboxRightContainer);

    const lightboxNext = document.createElement("a");
    lightboxNext.innerHTML = "<i class='far fa-angle-right'></i>";
    lightboxNext.className = "lightbox-dialog-next";
    lightboxNext.tabIndex = 0;
    lightboxNext.ariaLabel = "Image suivante";
    this.medias[this.currentIndex + 1] !== undefined &&
      lightboxRightContainer.appendChild(lightboxNext);

    const lightboxClose = document.createElement("button");
    lightboxClose.innerHTML = "<i class='far fa-times'></i>";
    lightboxClose.className = "lightbox-dialog-close";
    lightboxClose.tabIndex = 0;
    lightboxClose.ariaLabel = "Fermer la fenêtre";
    lightboxRightContainer.appendChild(lightboxClose);

    lightboxPrevious.addEventListener("click", (e) => {
      this.previous();
    });

    lightboxNext.addEventListener("click", (e) => {
      this.next();
    });

    lightboxClose.addEventListener("click", (e) => {
      this.close();
    });

    return lightboxModal;
  }

  open (targetIndex = 0) {
    this.close();

    document.querySelectorAll("body *").forEach((domElement) => {
      if (domElement.tabIndex !== -1) {
        const tabIndex = domElement.tabIndex;

        domElement.setAttribute("stored-tabindex", tabIndex);

        domElement.tabIndex = -1;
      }
    });

    const currentMedia = this.medias[targetIndex];

    if (!currentMedia) return this.close();

    this.currentMedia = currentMedia;
    this.currentIndex = targetIndex;

    const lightboxModal = this.getElement(currentMedia);

    document.body.appendChild(lightboxModal);

    document.body.style.position = "fixed";

    this.lightboxElement = lightboxModal;
  }

  close () {
    this.lightboxElement && this.lightboxElement.remove();

    document.querySelectorAll("body *").forEach((domElement) => {
      if (domElement.hasAttribute("stored-tabindex")) {
        domElement.tabIndex = domElement.getAttribute("stored-tabindex");

        domElement.removeAttribute("stored-tabindex");
      }
    });

    document.body.style.position = "auto";
  }

  next () {
    this.open(this.currentIndex + 1);
  }

  previous () {
    this.open(this.currentIndex - 1);
  }
}
