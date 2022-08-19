/** Contact form modal class */
class ContactForm { // eslint-disable-line no-unused-vars
  /**
   *
   * @param {Object} FormInfos - contact form infos object
   * @param {Element} FormInfos.handler - the Element who opens the contact form
   * @param {Element} FormInfos.wrapper
   */
  constructor ({ handler, wrapper }) {
    this.handler = handler;
    this.wrapper = wrapper;

    this.createListeners();
  }

  /**
   * Open the contact form popup
   */
  open () {
    this.wrapper.className = "contactform-wrapper open";

    // Make all body elements unfocusable and save their tab index (temporary)
    document.querySelectorAll("body *").forEach((domElement) => {
      if (domElement.tabIndex !== -1) {
        const tabIndex = domElement.tabIndex;

        domElement.setAttribute("stored-tabindex", tabIndex);

        domElement.tabIndex = -1;
      }
    });

    document.body.style.position = "fixed";
  }

  /**
   * Close the contact form popup
   */
  close () {
    this.wrapper.className = "contactform-wrapper";

    // Make all body elements tab index back (and make them focusable back)
    document.querySelectorAll("body *").forEach((domElement) => {
      if (domElement.hasAttribute("stored-tabindex")) {
        domElement.tabIndex = domElement.getAttribute("stored-tabindex");

        domElement.removeAttribute("stored-tabindex");
      }
    });

    document.body.style.position = "auto";
  }

  /**
   * Handle the form submit event
   * @param {SubmitEvent} e -
   */
  handleSubmit (e) {
    e.preventDefault();

    const firstname = this.wrapper.querySelector("[name='firstname']").value;
    const lastname = this.wrapper.querySelector("[name='lastname']").value;
    const email = this.wrapper.querySelector("[name='email']").value;
    const message = this.wrapper.querySelector("[name='message']").value;

    console.log(firstname, lastname, email, message);
  }

  /**
   * Create events listeners for contact form
   */
  createListeners () {
    this.handler.addEventListener("click", (e) => {
      this.open();
    });

    this.wrapper.querySelector("#contact-form-close").addEventListener("click", (e) => {
      e.preventDefault();
      this.close();
    });

    this.wrapper.querySelector("form").addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }
}
