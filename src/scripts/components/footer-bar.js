class FooterElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
        
            
            .footer {
                bottom: 0;
                background-color: #0B2447;
                color: white;
                padding: 20px;
                text-align: center;
            }
            a, button, input, input[type='text'], textarea {
                min-width: 44px;
                min-height: 44px;
            }
        </style>
        <div class="footer">
            <p>Menjadi Front-End Web Developer Expert - Sopia Refaldi &copy; MamYuk ${new Date().getFullYear()} </p>
        </div>
        `;
  }
}

customElements.define('footer-bar', FooterElement);
