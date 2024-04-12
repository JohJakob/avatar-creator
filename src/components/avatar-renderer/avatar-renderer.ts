import { AvatarColor } from '../../types/avatar-colors.js';
import { AvatarType } from '../../types/avatar-types.js';
import { Avatar, AvatarPart, DEFAULT_AVATAR } from '../../types/avatar.js';
import { colorsMap } from '../../types/colors-map.js';

import './../svg-renderer/svg-renderer.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    .avatar {
      background-color: #fff;
      border: 1px solid #000;
      display: block;
      height: 300px;
      width: 300px;
      position: relative;
    }

    .avatar-part {
      height: 256px;
      width: 256px;
      left: 50%;
      margin: 0 auto;
      position: absolute;
      top: 0;
      transform: translateX(-50%);      
    }

    .face {          
      z-index: 1;
    }

    .eyes {
      z-index: 2;
    }

    .eyebrows {
      z-index: 3;
    }

    .nose {
      z-index: 4;
    }

    .mouth {
      z-index: 5;
    }

    .hair {
      z-index: 6;
    }
  </style>
  <div class="avatar"></div>
  `;

export class AvatarRenderer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['avatar'];
  }

  public connectedCallback() {
    const content = template.content.cloneNode(true) as HTMLElement;

    const avatarElement = content.querySelector('.avatar');

    for (const key in DEFAULT_AVATAR) {
      const element = this.createAvatarPartElement(key);

      avatarElement.appendChild(element);
    }

    this.shadowRoot?.appendChild(content);

    this.render();
  }

  public attributeChangedCallback(_name: string, oldValue: string | number, newValue: string | number) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  private render(): void {
    const avatar = JSON.parse(this.getAttribute('avatar'));

    if (!avatar) {
      return;
    }

    const avatarElement = this.shadowRoot?.querySelector('.avatar');

    if (!avatarElement) {
      return;
    }

    for (const partName in avatar) {
      const avatarPart = avatar[partName as keyof Avatar] as AvatarPart;

      if (avatarPart) {
        const existingElement = avatarElement.querySelector(`.avatar-part.${partName}`);

        if (existingElement) {
          this.updateAvatarPartElement(existingElement, partName, avatarPart.type, avatarPart.color);

          continue;
        }

        const newElement = this.createAvatarPartElement(partName);

        this.updateAvatarPartElement(newElement, partName, avatarPart.type, avatarPart.color);

        avatarElement.appendChild(newElement);
      }
    }
  }

  private createAvatarPartElement(name: string): HTMLDivElement {
    const avatarPartContainerElement = document.createElement('div');

    avatarPartContainerElement.classList.add('avatar-part');
    avatarPartContainerElement.classList.add(name);

    const avatarPartElement = document.createElement('svg-renderer');

    avatarPartElement.setAttribute('stretch', 'true');

    avatarPartContainerElement.appendChild(avatarPartElement);

    return avatarPartContainerElement;
  }

  private updateAvatarPartElement(element: Element, partName: string, type: AvatarType, color?: AvatarColor): void {
    const renderer = element.querySelector('svg-renderer');

    if (!renderer) {
      return;
    }

    renderer.setAttribute('path', `avatar/${partName}/${type}.svg`);

    if (color) {
      renderer.setAttribute('color', colorsMap[color] || '#000000');
    }
  }
}

if (!customElements.get('avatar-renderer')) {
  customElements.define('avatar-renderer', AvatarRenderer);
}
