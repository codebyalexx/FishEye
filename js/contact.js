// eslint-disable-next-line no-unused-vars
class ContactForm {
  constructor ({ name, handler }) {
    this.name = name;

    handler.addEventListener("click", (e) => {
      this.open();
    });
  }

  getElement () {
    const modal = document.createElement("div");
    modal.className = "contactform-wrapper";

    const modalWrapper = document.createElement("form");
    modalWrapper.className = "contactform-modal";
    modal.appendChild(modalWrapper);

    const modalClose = document.createElement("button");
    modalClose.className = "contactform-modal-close";
    modalClose.innerHTML = "<i class='far fa-times'></i>";
    modalWrapper.appendChild(modalClose);

    const modalTitle = document.createElement("h1");
    modalTitle.innerHTML = `Contactez-moi<br />${this.name}`;
    modalTitle.className = "contactform-modal-title";
    modalTitle.tabIndex = 0;
    modalWrapper.appendChild(modalTitle);

    const modalFormFirstnameLabel = document.createElement("label");
    modalFormFirstnameLabel.className = "contactform-modal-label";
    modalFormFirstnameLabel.innerText = "Prénom";
    modalFormFirstnameLabel.tabIndex = 0;
    modalWrapper.appendChild(modalFormFirstnameLabel);

    const modalFormFirstnameField = document.createElement("input");
    modalFormFirstnameField.className = "form-field contactform-modal-field";
    modalFormFirstnameField.ariaLabel = "Prénom";
    modalWrapper.appendChild(modalFormFirstnameField);

    const modalFormLastnameLabel = document.createElement("label");
    modalFormLastnameLabel.className = "contactform-modal-label";
    modalFormLastnameLabel.innerText = "Nom";
    modalFormLastnameLabel.tabIndex = 0;
    modalWrapper.appendChild(modalFormLastnameLabel);

    const modalFormLastnameField = document.createElement("input");
    modalFormLastnameField.className = "form-field contactform-modal-field";
    modalFormLastnameField.ariaLabel = "Nom";
    modalWrapper.appendChild(modalFormLastnameField);

    const modalFormEmailLabel = document.createElement("label");
    modalFormEmailLabel.className = "contactform-modal-label";
    modalFormEmailLabel.innerText = "Email";
    modalFormEmailLabel.tabIndex = 0;
    modalWrapper.appendChild(modalFormEmailLabel);

    const modalFormEmailField = document.createElement("input");
    modalFormEmailField.className = "form-field contactform-modal-field";
    modalFormEmailField.ariaLabel = "Email";
    modalWrapper.appendChild(modalFormEmailField);

    const modalFormMessageLabel = document.createElement("label");
    modalFormMessageLabel.className = "contactform-modal-label";
    modalFormMessageLabel.innerText = "Message";
    modalFormMessageLabel.tabIndex = 0;
    modalWrapper.appendChild(modalFormMessageLabel);

    const modalFormMessageTextarea = document.createElement("textarea");
    modalFormMessageTextarea.className = "form-field contactform-modal-field";
    modalFormMessageTextarea.rows = 4;
    modalFormMessageTextarea.ariaLabel = "Message";
    modalWrapper.appendChild(modalFormMessageTextarea);

    const modalFormSend = document.createElement("button");
    modalFormSend.className = "button contactform-modal-button";
    modalFormSend.innerText = "Envoyer";
    modalWrapper.appendChild(modalFormSend);

    modalFormSend.addEventListener("click", (e) => {
      e.preventDefault(true);
    });

    modalClose.addEventListener("click", (e) => {
      this.close();
    });

    return modal;
  }

  open () {
    this.close();

    this.form = this.getElement();

    document.querySelectorAll("body *").forEach((domElement) => {
      if (domElement.tabIndex !== -1) {
        const tabIndex = domElement.tabIndex;

        domElement.setAttribute("stored-tabindex", tabIndex);

        domElement.tabIndex = -1;
      }
    });

    document.body.appendChild(this.form);

    document.body.style.position = "fixed";
  }

  close () {
    this.form && this.form.remove();

    document.querySelectorAll("body *").forEach((domElement) => {
      if (domElement.hasAttribute("stored-tabindex")) {
        domElement.tabIndex = domElement.getAttribute("stored-tabindex");

        domElement.removeAttribute("stored-tabindex");
      }
    });

    document.body.style.position = "auto";
  }
}
