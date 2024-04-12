import { Avatar } from '../../types/avatar.js';
import { createRandomAvatar } from '../../utils/random.js';
import './../avatar-renderer/avatar-renderer.js';
import './../avatar-palette/avatar-palette.js';
import { getValidAvatar } from '../../utils/get-valid-avatar.js';
import { colorPaletteMap, typePaletteMap } from '../../types/palettes.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    .avatar-creator {
      background-color: #fff;
      border: 1px solid #000;
      display: block;
      padding: 40px;
      position: relative;
      width: fit-content;
    }    

    .avatar-controls {
      display: flex;
      gap: 6px;      
      justify-content: center;
      margin-top: 20px;
    }

    .avatar-controls .avatar-control {
      background: white;
      border: 1px solid black;
      border-radius: 6px;
      cursor: pointer;
      padding: 6px 16px;
    }

    .hidden {
      display: none;
    }
  </style>
  <div class="avatar-creator">
    <avatar-renderer></avatar-renderer>
    <div class="avatar-controls">
      <button class="avatar-control" id="avatar-control-randomize">Randomize</button>
      <button class="avatar-control" id="avatar-control-save">Save</button>
      <button class="avatar-control" id="avatar-control-skip">Skip</button>
    </div>
    <div class="avatar-palettes">
      <avatar-palette id="type-palette" paletteMode="type"></avatar-palette>
      <avatar-palette id="color-palette" paletteMode="color"></avatar-palette>
    </div>
  </div>
`;

class AvatarCreator extends HTMLElement {
  private avatar: Avatar;
  private currentPartName: keyof Avatar;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  public connectedCallback() {
    this.avatar = this.loadAvatar();

    this.currentPartName = 'face';

    const content = template.content.cloneNode(true);

    this.shadowRoot?.appendChild(content);

    const randomizeButtonElement = this.shadowRoot?.querySelector('#avatar-control-randomize');

    randomizeButtonElement.addEventListener('click', () => {
      this.randomize();
    });

    const saveButtonElement = this.shadowRoot?.querySelector('#avatar-control-save');

    saveButtonElement.addEventListener('click', () => {
      this.saveAvatar();
    });

    const skipButtonElement = this.shadowRoot?.querySelector('#avatar-control-skip');

    skipButtonElement.addEventListener('click', () => {
      this.skip();
    });

    const typePaletteElement = this.shadowRoot?.querySelector('#type-palette');

    typePaletteElement.addEventListener('onSelect', (event: CustomEvent) => {
      this.avatar[this.currentPartName] = { ...this.avatar[this.currentPartName], type: event.detail };

      this.render();
    });

    const colorPaletteElement = this.shadowRoot?.querySelector('#color-palette');

    colorPaletteElement.addEventListener('onSelect', (event: CustomEvent) => {
      this.avatar[this.currentPartName] = { ...this.avatar[this.currentPartName], color: event.detail };

      this.render();
    });

    this.render();
  }

  private loadAvatar(): Avatar {
    return getValidAvatar(JSON.parse(localStorage.getItem('avatar-creator') ?? '{}'), true);
  }

  private saveAvatar(): void {
    localStorage.setItem('avatar-creator', JSON.stringify(this.avatar));
  }

  private render(): void {
    const avatarElement = this.shadowRoot?.querySelector('avatar-renderer');

    avatarElement.setAttribute('avatar', JSON.stringify(this.avatar));

    const typePaletteElement = this.shadowRoot?.querySelector('#type-palette');

    const types = typePaletteMap.get(this.currentPartName);

    this.renderPalette(typePaletteElement, types);

    const colorPaletteElement = this.shadowRoot?.querySelector('#color-palette');

    const colors = colorPaletteMap.get(this.currentPartName);

    this.renderPalette(colorPaletteElement, colors);
  }

  private randomize(): void {
    this.avatar = createRandomAvatar();

    this.render();
  }

  private skip(): void {
    this.dispatchEvent(new CustomEvent('onSkip'));
  }

  private renderPalette(paletteElement: Element, items: string[]): void {
    if (items) {
      paletteElement.setAttribute('partName', this.currentPartName);
      paletteElement.setAttribute('items', JSON.stringify(items));
      paletteElement.classList.remove('hidden');
    } else {
      paletteElement.setAttribute('partName', null);
      paletteElement.setAttribute('items', '[]');
      paletteElement.classList.add('hidden');
    }
  }
}

if (!customElements.get('avatar-creator')) {
  customElements.define('avatar-creator', AvatarCreator);
}
