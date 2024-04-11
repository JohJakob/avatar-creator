import { SVG_FOLDER } from '../../constants/config.js';

const DEFAULT_HEIGHT = 100;
const DEFAULT_WIDTH = 100;
const DEFAULT_COLOR = '#000000';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host .svg {      
      display: block;
      height: 100%;
      width: 100%;
    }
  </style>`;

class SvgRenderer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['path', 'color', 'width', 'height'];
  }

  public connectedCallback() {
    this.render();
  }

  public attributeChangedCallback(_name: string, oldValue: string | number, newValue: string | number) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  private render() {
    const path = this.getAttribute('path');
    const color = this.getAttribute('color');
    const width = this.getAttribute('width') || `${DEFAULT_WIDTH}`;
    const height = this.getAttribute('height') || `${DEFAULT_HEIGHT}`;

    if (!path) {
      return;
    }

    const validColor = color && this.isValidColor(color) ? color : DEFAULT_COLOR;

    const fullPath = this.getFullImagePath(path);

    const id = this.getImageId(path);

    const content = template.content.cloneNode(true);

    const imageContainerElement = this.createImageContainerElement(validColor, height, width);

    const imageElement = this.createImageElement(fullPath, id);

    imageContainerElement.appendChild(imageElement);

    content.appendChild(imageContainerElement);

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(content);
    }
  }

  private getFullImagePath(path: string): string {
    return `${SVG_FOLDER}/${path}`;
  }

  private getImageId(path: string): string {
    const filename = path.split('/').pop();

    if (!filename) {
      return '';
    }

    return filename.slice(0, filename.lastIndexOf('.')) || '';
  }

  private createImageContainerElement(color: string, height: string, width: string): HTMLDivElement {
    const imageContainerElement = document.createElement('div');

    imageContainerElement.classList.add('svg-container');

    imageContainerElement.style.color = color;
    imageContainerElement.style.height = height + 'px';
    imageContainerElement.style.width = width + 'px';

    return imageContainerElement;
  }

  private createImageElement(fullPath: string, id: string): SVGElement {
    const imageElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    imageElement.classList.add('svg');

    const useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');

    useElement.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `${fullPath}#svg-${id}`);

    imageElement.appendChild(useElement);

    return imageElement;
  }

  private isValidColor(color: string): boolean {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  }
}

customElements.define('svg-renderer', SvgRenderer);
