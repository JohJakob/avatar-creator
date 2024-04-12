import { AvatarColor } from '../../types/avatar-colors.js';
import { AvatarType } from '../../types/avatar-types.js';
import { Avatar, AvatarPart } from '../../types/avatar.js';
import { colorsMap } from '../../types/colors-map.js';
import { getValidAvatar } from '../../utils/get-valid-avatar.js';
import './../svg-renderer/svg-renderer.js';

const USE_RANDOM_AVATAR = true;

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      background-color: #fff;
      border: 1px solid #000;
      display: block;
      height: 200px;
      width: 200px;
      position: relative;
    }

    .avatar-part {
      height: 180px;
      width: 180px;
      left: 50%;
      margin: 0 auto;
      position: absolute;
      transform: translateX(-50%);      
    }

    .face {          
      top: 10px;
      z-index: 1;
    }

    .eyes {
      top: 10px;;
      z-index: 2;
    }

    .eyebrows {
      top: 10px;;
      z-index: 3;
    }

    .nose {
      top: 15px;;
      z-index: 4;
    }

    .mouth {
      top: 15px;
      z-index: 5;
    }

    .hair {
      top: 5px;;
      z-index: 6;
    }
  </style>`;

export class AvatarRenderer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['avatar', 'width', 'height'];
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
    const avatar = JSON.parse(this.getAttribute('avatar') || '{}');
    const width = (this.getAttribute('width') || '100') + 'px';
    const height = (this.getAttribute('height') || '100') + 'px';

    const validAvatar = getValidAvatar(avatar, USE_RANDOM_AVATAR);
    console.log(validAvatar);
    const content = template.content.cloneNode(true);

    const avatarContainerElement = this.getAvatarContainerElement(width, height);

    for (const key in validAvatar) {
      const avatarPart = validAvatar[key as keyof Avatar] as AvatarPart;

      if (avatarPart) {
        const element = this.getAvatarPartElement(key, avatarPart.type, avatarPart.color);
        avatarContainerElement.appendChild(element);
      }
    }

    // const faceElement = this.getAvatarPartElement('face', validAvatar.face.type, validAvatar.face.color);
    // avatarContainerElement.appendChild(faceElement);

    // if (validAvatar.hair) {
    //   const hairElement = this.getAvatarPartElement('hair', validAvatar.hair.type, validAvatar.hair.color);
    //   avatarContainerElement.appendChild(hairElement);
    // }

    // const eyesElement = this.getAvatarPartElement('eyes', validAvatar.eyes.type, validAvatar.eyes.color);
    // avatarContainerElement.appendChild(eyesElement);

    // const noseElement = this.getAvatarPartElement('nose', validAvatar.nose.type);
    // avatarContainerElement.appendChild(noseElement);

    // const mouthElement = this.getAvatarPartElement('mouth', validAvatar.mouth.type, validAvatar.mouth.color);
    // avatarContainerElement.appendChild(mouthElement);

    content.appendChild(avatarContainerElement);

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(content);
    }
  }

  private getAvatarContainerElement(width: string, height: string): HTMLDivElement {
    const avatarContainerElement = document.createElement('div');

    avatarContainerElement.classList.add('svg-container');

    avatarContainerElement.style.height = height;
    avatarContainerElement.style.width = width;

    return avatarContainerElement;
  }

  private getAvatarPartElement(name: string, type: AvatarType, color?: AvatarColor): HTMLDivElement {
    const avatarPartContainerElement = document.createElement('div');

    avatarPartContainerElement.classList.add('avatar-part');
    avatarPartContainerElement.classList.add(name);

    const avatarPartElement = document.createElement('svg-renderer');

    avatarPartElement.setAttribute('path', `avatar/${name}/${type}.svg`);
    avatarPartElement.setAttribute('stretch', 'true');

    if (color) {
      avatarPartElement.setAttribute('color', colorsMap[color] || '#000000');
    }

    avatarPartContainerElement.appendChild(avatarPartElement);

    return avatarPartContainerElement;
  }
}

if (!customElements.get('avatar-renderer')) {
  customElements.define('avatar-renderer', AvatarRenderer);
}
