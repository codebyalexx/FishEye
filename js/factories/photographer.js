// eslint-disable-next-line no-unused-vars
class photographerFactory {
  constructor (data) {
    const { name, id, city, country, tags, tagline, price, portrait, alt } = data;
    this.name = name;
    this.id = id;
    this.city = city;
    this.country = country;
    this.tags = tags;
    this.tagline = tagline;
    this.price = price;
    this.portrait = portrait;
    this.alt = alt;
  }

  renderListItem () {
    return `<li class="photographer-list-item">
        <article class="thumb-photographer">
            <a href="profile.html?photographerid=${this.id}" class="thumb-photographer-brand" tabindex="0" aria-label="Accéder au profil de ${this.name}">
                <img
                    src="img/Sample Photos/Photographers ID Photos/${this.portrait}"
                    class="user user--xl"
                    alt="${this.alt}"
                />
                <h2 tabindex="0">${this.name}</h2>
            </a>
            <div class="thumb-photographer-about">
                <p class="thumb-photographer-about-city" tabindex="0">${this.city}, ${this.country}</p>
                <p class="thumb-photographer-about-caption" tabindex="0">
                    ${this.tagline}
                </p>
                <span tabindex="0">${this.price}€/jour</span>
            </div>
        </article>
        <ul class="thumb-photographer-tags">
            ${this.tags.map((t) => {
              return `<li>
                <span class="tag" data-tag-name="${t}">
                  <a href="#!" class="tag-text" tabindex="0" lang="en">#${t}</a>
                </span>
              </li>`;
            })}
        </ul>
    </li>`;
  }
}
