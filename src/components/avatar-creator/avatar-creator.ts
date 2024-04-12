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
      align-items: center;
      background-color: #fff;
      border: 1px solid #000;
      display: flex;      
      flex-direction: column;
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

    .avatar-parts {
      display: flex;
      gap: 6px;
      justify-content: center;
      margin-top: 20px;
    }

    .avatar-parts .avatar-part-button {
      background: white;
      border: 2px solid black;
      border-radius: 6px;
      cursor: pointer;
      padding: 6px 16px;
    }    

    .avatar-parts .avatar-part-button.selected {
      border-color: #ff6600;
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
    <div class="avatar-parts"></div>
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
    console.log(this.avatar);

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

    const avatarPartButtonsElement = this.shadowRoot?.querySelector('.avatar-parts');

    for (const type of Object.values([...typePaletteMap]).map(arr => arr[0])) {
      avatarPartButtonsElement.appendChild(this.createAvatarPartButton(type));
    }

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

    this.renderPalette(typePaletteElement, types, 'type');

    const colorPaletteElement = this.shadowRoot?.querySelector('#color-palette');

    const colors = colorPaletteMap.get(this.currentPartName);

    this.renderPalette(colorPaletteElement, colors, 'color');
  }

  private randomize(): void {
    this.avatar = createRandomAvatar();

    this.render();
  }

  private skip(): void {
    this.dispatchEvent(new CustomEvent('onSkip'));
  }

  private renderPalette(paletteElement: Element, items: string[], paletteMode: 'color' | 'type'): void {
    if (items) {
      const selectedItem = this.avatar[this.currentPartName][paletteMode];

      paletteElement.setAttribute('partName', this.currentPartName);
      paletteElement.setAttribute('items', JSON.stringify(items));
      paletteElement.setAttribute('selectedItem', selectedItem);
      paletteElement.classList.remove('hidden');
    } else {
      paletteElement.setAttribute('partName', null);
      paletteElement.setAttribute('items', '[]');
      paletteElement.classList.add('hidden');
    }
  }

  private createAvatarPartButton(partName: string): HTMLButtonElement {
    const buttonElement = document.createElement('button');

    buttonElement.classList.add('avatar-part-button');

    buttonElement.textContent = partName;

    if (this.currentPartName === partName) {
      buttonElement.classList.add('selected');
    }

    buttonElement.addEventListener('click', () => {
      this.currentPartName = partName as keyof Avatar;

      const avatarPartButtonsElement = this.shadowRoot?.querySelector('.avatar-parts');

      const buttons = avatarPartButtonsElement.querySelectorAll('.avatar-part-button');

      for (const button of buttons) {
        if (button === buttonElement) {
          button.classList.add('selected');
        } else {
          button.classList.remove('selected');
        }
      }

      this.render();
    });

    return buttonElement;
  }
}

if (!customElements.get('avatar-creator')) {
  customElements.define('avatar-creator', AvatarCreator);
}
