import { Avatar } from '../../types/avatar';
import { AvatarColor } from '../../types/avatar-colors.js';
import { AvatarType } from '../../types/avatar-types';
import { colorsMap } from '../../types/colors-map.js';
import './../svg-renderer/svg-renderer.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    .palette {
      display: flex;
      flex-wrap: wrap;
      padding: 20px;
    }

    .palette .palette-square {      
      margin: 2px;
      border: 2px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }

    .palette.color .palette-square {
      width: 20px;
      height: 20px;
    }

    .palette.type .palette-square {
      width: 50px;
      height: 50px;
      padding: 5px;
    }

    .palette .palette-square.selected {
      border-color: #ff6600;
    }
  </style>`;

class AvatarPalette extends HTMLElement {
  private selectedItem: string;
  private path: keyof Avatar;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['items', 'selectedItem', 'paletteMode', 'path'];
  }

  public connectedCallback() {
    this.render();
  }

  public attributeChangedCallback(_name: string, oldValue: string | number, newValue: string | number) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  private render(): void {
    const items = JSON.parse(this.getAttribute('items') || '[]');
    this.path = this.getAttribute('path') as keyof Avatar;
    const paletteMode = this.getAttribute('paletteMode') === 'color' ? 'color' : 'type';

    if (!items?.length || !paletteMode || (paletteMode === 'type' && !this.path)) {
      return;
    }

    const selectedItem = this.getAttribute('selectedItem');

    if (selectedItem && !this.selectedItem && items.includes(selectedItem)) {
      this.selectedItem = selectedItem;
    }

    if (!this.selectedItem) {
      this.selectedItem = items[0];
    }

    const content = template.content.cloneNode(true);

    const paletteElement = this.getPaletteElement(paletteMode);

    if (paletteMode === 'color') {
      for (const item of items) {
        paletteElement.appendChild(this.getColorSquareElement(item as AvatarColor, item === this.selectedItem));
      }
    }

    if (paletteMode === 'type') {
      for (const item of items) {
        paletteElement.appendChild(this.getTypeSquareElement(item as AvatarType, item === this.selectedItem));
      }
    }

    content.appendChild(paletteElement);

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(content);
    }
  }

  private getPaletteElement(paletteMode: 'color' | 'type'): HTMLDivElement {
    const paletteElement = document.createElement('div');

    paletteElement.classList.add('palette');
    paletteElement.classList.add(paletteMode);

    return paletteElement;
  }

  private getColorSquareElement(color: AvatarColor, selected?: boolean): HTMLDivElement {
    const squareElement = document.createElement('div');

    squareElement.classList.add('palette-square');

    if (selected) {
      squareElement.classList.add('selected');
    }

    squareElement.style.backgroundColor = colorsMap[color];

    squareElement.addEventListener('click', () => {
      this.selectedItem = color;
      this.dispatchEvent(new CustomEvent('onSelect', { detail: this.selectedItem }));

      this.render();
    });

    return squareElement;
  }

  private getTypeSquareElement(type: AvatarType, selected?: boolean): HTMLDivElement {
    const squareElement = document.createElement('div');

    squareElement.classList.add('palette-square');

    if (selected) {
      squareElement.classList.add('selected');
    }

    const svgElement = document.createElement('svg-renderer');

    svgElement.setAttribute('path', `avatar/${this.path}/${type}.svg`);
    svgElement.setAttribute('stretch', 'true');

    squareElement.appendChild(svgElement);

    squareElement.addEventListener('click', () => {
      this.selectedItem = type;
      this.dispatchEvent(new CustomEvent('onSelect', { detail: this.selectedItem }));

      this.render();
    });

    return squareElement;
  }
}

customElements.define('avatar-palette', AvatarPalette);
