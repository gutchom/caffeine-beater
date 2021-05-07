import createButton from './createButton';
import createTitleScene from './createTitleScene';
import { Score } from './GameCore';

export default function createFailureScene(score: Score, ...messages: string[]): g.Scene {
  const scene = new g.Scene({
    game: g.game,
    assetIds: [
      'font12',
      'font12_glyphs',
      'button',
      'button_pressed',
      'Tweet',
      'Retry',
    ],
  });

  scene.onLoad.add(() => {
    const font = new g.BitmapFont({
      src: scene.asset.getImageById('font12'),
      glyphInfo: JSON.parse(scene.asset.getTextById('font12_glyphs').data),
    });
    scene.append(new g.FilledRect({
      scene,
      cssColor: 'black',
      width: g.game.width,
      height: g.game.height,
    }));
    scene.append(new g.Label({
      scene,
      font,
      text: `プレイ時間: ${score.time}秒`,
      textColor: 'white',
      fontSize: 48,
      x: 320,
      y: 500,
    }));
    scene.append(new g.Label({
      scene,
      font,
      text: `飲んだ本数: ${score.count}本`,
      textColor: 'white',
      fontSize: 48,
      x: 320,
      y: 548,
    }));
    messages.forEach((message, i) => {
      scene.append(new g.Label({
        scene,
        font,
        text: message,
        textColor: 'red',
        fontSize: 64,
        x: 160,
        y: 300 + i * 64,
      }));
    });

    const tweetButton = createButton(scene, new g.Sprite({
      scene,
      src: scene.asset.getImageById('Tweet'),
    }), () => {
      const time = score.time >= 60
        ? `${Math.floor(score.time / 60)}分${Math.round(score.time % 60)}秒`
        : `${score.time}秒`;
      const body = `私は${time}間でエナジードリンクを${score.count}本飲みました`;
      const hashtag = 'CaffeineBeater';
      const url = 'https://games.gutchom.com/caffeine-beater';
      parent.location.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(body)}&url=${url}&hashtags=${hashtag}`;
    });
    tweetButton.moveTo(640, 700);
    scene.append(tweetButton);

    const retryButton = createButton(scene, new g.Sprite({
      scene,
      src: scene.asset.getImageById('Retry'),
    }), () => {
      g.game.replaceScene(createTitleScene());
    });
    retryButton.moveTo(120, 700);
    scene.append(retryButton);
  });

  return scene;
}
