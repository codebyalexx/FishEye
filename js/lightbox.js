// eslint-disable-next-line no-unused-vars
class Lightbox {
  constructor ({ medias = [] }) {
    this.currentIndex = 0;
    this.medias = medias;

    console.log(medias);

    document.querySelectorAll("[open-lightbox]").forEach((lightboxHandler) => {
      lightboxHandler.addEventListener("click", (e) => {
        const parsedSrc = e.target.src.replaceAll("%20", " ");
        const targetMedia = this.medias.find((m) => parsedSrc.includes(m.filename));
        this.open(this.medias.indexOf(targetMedia));
      });
    });
  }

  open (targetIndex = 0) {
    this.close();

    const currentMedia = this.medias[targetIndex];

    if (!currentMedia) return this.close();

    this.currentMedia = currentMedia;
    this.currentIndex = targetIndex;

    const lightboxModal = document.createElement("div");
    lightboxModal.className = "lightbox-modal";

    const lightboxDialog = document.createElement("div");
    lightboxDialog.className = "lightbox-dialog";
    lightboxModal.appendChild(lightboxDialog);

    const lightboxLeftContainer = document.createElement("div");
    lightboxLeftContainer.className = "lightbox-dialog-previousbox";
    lightboxDialog.appendChild(lightboxLeftContainer);

    const lightboxPrevious = document.createElement("button");
    lightboxPrevious.innerHTML = "<i class='far fa-angle-left'></i>";
    lightboxPrevious.className = "lightbox-dialog-previous";
    lightboxLeftContainer.appendChild(lightboxPrevious);

    const lightboxContentContainer = document.createElement("div");
    lightboxContentContainer.className = "lightbox-dialog-contentbox";
    lightboxDialog.appendChild(lightboxContentContainer);

    if (currentMedia.type === "image") {
      const lightboxImage = document.createElement("img");
      lightboxImage.className = "lightbox-dialog-contentbox-image";
      lightboxImage.src = currentMedia.filename;

      lightboxContentContainer.appendChild(lightboxImage);
    } else if (currentMedia.type === "video") {
      const lightboxVideo = document.createElement("video");
      lightboxVideo.className = "lightbox-dialog-contentbox-video";
      lightboxVideo.controls = true;

      const lightboxVideoSource = document.createElement("source");
      lightboxVideoSource.src = currentMedia.filename;
      lightboxVideoSource.type = "video/mp4";
      lightboxVideo.appendChild(lightboxVideoSource);

      lightboxContentContainer.appendChild(lightboxVideo);
    } else return this.close();

    const lightboxRightContainer = document.createElement("div");
    lightboxRightContainer.className = "lightbox-dialog-nextbox";
    lightboxDialog.appendChild(lightboxRightContainer);

    const lightboxNext = document.createElement("button");
    lightboxNext.innerHTML = "<i class='far fa-angle-right'></i>";
    lightboxNext.className = "lightbox-dialog-next";
    lightboxRightContainer.appendChild(lightboxNext);

    const lightboxClose = document.createElement("a");
    lightboxClose.innerHTML = "<i class='far fa-times'></i>";
    lightboxClose.className = "lightbox-dialog-close";
    lightboxRightContainer.appendChild(lightboxClose);

    lightboxPrevious.addEventListener("click", (e) => {
      this.previous();
    });

    lightboxNext.addEventListener("click", (e) => {
      this.next();
    });

    lightboxClose.addEventListener("click", (e) => {
      this.close();
      console.log("oui");
    });

    document.body.appendChild(lightboxModal);

    this.lightboxElement = lightboxModal;
  }

  close () {
    this.lightboxElement && this.lightboxElement.remove();
  }

  next () {
    this.open(this.currentIndex + 1);
  }

  previous () {
    this.open(this.currentIndex - 1);
  }
}
