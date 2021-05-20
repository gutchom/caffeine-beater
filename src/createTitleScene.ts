import createGameScene from './createGameScene';

export default function createTitleScene(): g.Scene {
  const scene = new g.Scene({
    game: g.game,
    assetIds: [
      'title',
      'title_bg',
    ],
  });

  scene.onLoad.add(() => {
    const title = new g.Sprite({
      scene,
      src: scene.asset.getImageById('title'),
      anchorX: 0.5,
      x: g.game.width / 2,
      scaleY: 1.5,
      scaleX: 1.2,
    });

    const background = new g.Sprite({
      scene,
      src: scene.asset.getImageById('title_bg'),
      x: 0,
      y: 0,
    });

    scene.append(background);
    scene.append(title);

    scene.onUpdate.add(() => {
      /* 背景のスクロール */
      background.x -= 0.5;
      if (background.x <= -background.width + g.game.width) {
        background.x = 0;
      }
      background.modified();

      /* タイトルをふわふわ動かす */
      const titlePosY = 280;
      const titleMoveWidth = 24;
      const titleMoveSpeed = 4.5;
      title.y = titlePosY - titleMoveWidth * Math.abs(Math.sin(titleMoveSpeed * g.game.age / 180 * Math.PI));
      title.modified();
    });

    scene.onPointDownCapture.add(() => {
      g.game.replaceScene(createGameScene(1, 0, 0));
    });
  });

  return scene;
}
