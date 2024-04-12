import { createRandomAvatar } from '../../dist/src/utils/random.js';

document.addEventListener('DOMContentLoaded', function () {
  const rendererElement = document.getElementById('renderer');

  const randomAvatar = createRandomAvatar();

  rendererElement.avatar = randomAvatar;
});
