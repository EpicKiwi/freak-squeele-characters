const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
<style>
:host{
    display: inline-block;
    width: 125px;
    position: relative;
    color: white;
}

.title {
    position: absolute;
    top: 50%;
    left: 45%;
    height: 48.5%;
    margin: 0;
    padding: 0;
    font-size: 11px;
}

.title > *{
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(-100%) translateX(-50%) rotate(var(--rotation));
    transform-origin: 50% 100%;
}
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: center;

    padding-left: 18%;
    box-sizing: border-box;
}

.overlay .current {
    width: 60%;
}

.overlay .initial {
    width: 25%;
}
</style>
<h6 class="title" id="title"></h6>
<div class="overlay">
    <div class="current"><slot></slot></div>
    <div class="initial"><slot name="initial"></slot></div>
</div>
<svg width="100%" height="100%" viewBox="0 0 240 210" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
    <g transform="matrix(1,0,0,1,-5.75,-11.5)">
        <circle cx="192" cy="117" r="38" style="fill:none;stroke:var(--gauge-color-dark);stroke-width:3px;"/>
    </g>
    <g transform="matrix(1.31579,0,0,1.31579,-66.3816,-48.4474)">
        <circle cx="192" cy="117" r="38" style="fill:none;stroke:var(--gauge-color-dark);stroke-width:3.8px;"/>
    </g>
    <g transform="matrix(1,0,0,1,-3.75,-12.5)">
        <path d="M209.425,149.576C195.907,191.021 156.927,221 111,221C53.877,221 7.5,174.623 7.5,117.5C7.5,60.377 53.877,14 111,14C156.927,14 195.907,43.979 209.425,85.424C203.759,81.983 197.109,80 190,80C186.399,80 182.915,80.509 179.615,81.459C166.635,56.817 140.766,40 111,40C68.227,40 33.5,74.727 33.5,117.5C33.5,160.273 68.227,195 111,195C140.766,195 166.635,178.183 179.615,153.541C182.915,154.491 186.399,155 190,155C197.109,155 203.759,153.017 209.425,149.576Z" style="fill:var(--gauge-color);"/>
    </g>
    <g transform="matrix(1,0,0,1,-3.75,-12.5)">
        <path d="M172.734,151.854C160.792,173.402 137.819,188 111.462,188C72.828,188 41.462,156.634 41.462,118C41.462,79.366 72.828,48 111.462,48C137.819,48 160.792,62.598 172.734,84.146" style="fill:none;stroke:var(--gauge-color-dark);stroke-width:5px;stroke-linecap:butt;"/>
    </g>
</svg>
`;

export class GaugeComponent extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
    }

    this.titleEl = this.shadowRoot.getElementById("title");
    this.updateTitle();
  }

  updateTitle() {
    if (!this.titleEl) return;

    this.titleEl.innerHTML = "";

    let startRot = -80;
    let rotStep = 12;
    let letters = this.title.split("");
    letters.reduce((lastRotation, letter) => {
      let el = document.createElement("span");
      el.textContent = letter;
      el = this.titleEl.appendChild(el);
      let rotation = lastRotation + rotStep;
      el.style.setProperty("--rotation", rotation + "deg");
      return rotation;
    }, startRot);
  }
}

export const TAGNAME = "fs-gauge";
export default TAGNAME;
customElements.define(TAGNAME, GaugeComponent);
