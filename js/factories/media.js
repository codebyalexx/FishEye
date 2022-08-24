// eslint-disable-next-line no-unused-vars
class mediaFactory {
  constructor (data) {
    const { filename, type, likes, name, title, alt, date, index } = data;
    this.filename = filename;
    this.type = type;
    this.likes = likes;
    this.name = name;
    this.title = title;
    this.alt = alt;
    this.date = date;
    this.index = index;
  }

  render () {
    return `<li class="medias-item" data-filter-title="${this.title}" data-filter-likes="${this.likes}" data-filter-date="${this.date}">
    <article class="medias-container">
    ${this.type === "image"
      ? `<img src="img/Sample Photos/${this.name}/${this.filename}" alt="${this.alt}" class="medias-thumb" open-lightbox="true" tabindex="0" />`
      : `<video open-lightbox="true" class="medias-thumb" aria-label="${this.alt}" tabindex="0">
        <source src="img/Sample Photos/${this.name}/${this.filename}" type="video/mp4">
    </video>`}
        <div class="medias-infos">
            <p class="medias-infos-title" tabindex="0" lang="en">${this.title}</p>
            <span class="medias-infos-likes" tabindex="0" aria-label="${this.likes} mentions j'aime" id="action-like-${this.index}" data-likes="${this.likes}" data-liked="${false}">
                <span>${this.likes}</span>
                <i class="fas fa-heart"></i>
            </span>
        </div>
    </article>
</li>`;
  }
}
