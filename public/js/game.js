
var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  backgroundColor: '#000000',
  width: 800,
  height: 600,
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var spacebar;
var player;
var fireballs;
var enemy;
var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('background', 'assets/background.png');
  this.load.image('enemy', 'assets/enemy.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('fireball','assets/fireball.png');
  this.load.image('tower','assets/tower.png');
}

function create ()
{

    
  var fireball = new Phaser.Class({

      Extends: Phaser.GameObjects.Image,

      initialize:

      function fireball (scene)
      {
          Phaser.GameObjects.Image.call(this, scene, 0, 0, 'fireball');

          this.speed = Phaser.Math.GetSpeed(600, 1);
      },

      fire: function (x, y)
      {
          this.setPosition(x, y);

          this.setActive(true);
          this.setVisible(true);
      },

      update: function (time, delta)
      {
          this.x += this.speed * delta;

          if (this.x > 820)
          {
              this.setActive(false);
              this.setVisible(false);
          }
      }

  });

  fireballs = this.add.group({
      classType: fireball,
      maxSize: 30,
      runChildUpdate: true
  });

  this.add.image(400, 300, 'background');

  player = this.add.sprite(100, 300, 'player');
  player.setScale(2);

  

  enemy = this.add.sprite(400, 300, 'enemy');
  enemy.setScale(2.25);
  /*
  enemy.animations.add('right');
  enemy.animations.play('run', 10, true);
  */

  /*******/
  graphics = this.add.graphics();

  follower = { t: 0, vec: new Phaser.Math.Vector2() };

  //  Path starts at 400x100
  path = new Phaser.Curves.Path(600, 25);

  path.lineTo(100, 200);
  path.lineTo(700, 200);
  path.lineTo(200, 600);
 

  this.tweens.add({
      targets: follower,
      t: 1,
      ease: 'Sine.easeInOut',
      duration: 15000,
      yoyo: true,
      repeat: -1
  });


  /*******/

  


  spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  t = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

}

x = 50
y = 50
function update ()
{
  if (Phaser.Input.Keyboard.JustDown(spacebar))
  {
      var fireball = fireballs.get();

      if (fireball)
      {
          fireball.fire(player.x, player.y);
      }
  }

  if (d.isDown)
  {
      x = x+10;
      player.setPosition(x,y);
  }

  if (a.isDown)
  {
      x = x-10;
      player.setPosition(x,y);
  }

  if (w.isDown)
  {
      y = y-10;
      player.setPosition(x,y);
  }

  if (s.isDown)
  {
      y = y+10;
      player.setPosition(x,y);
  }

  if (Phaser.Input.Keyboard.JustDown(t)){
    
    this.input.on('pointerdown', function (pointer) {
    this.add.image(pointer.x, pointer.y, 'tower');
    
  }, this);}

  /******* */
  graphics.clear();

  graphics.lineStyle(1, 0xffffff, 1);

  path.draw(graphics); //delete this to get rid of line

  path.getPoint(follower.t, follower.vec);

  //graphics.fillStyle(0xff0000, 1);
  //graphics.fillCircle(follower.vec.x, follower.vec.y, 12);

  enemy.setPosition(follower.vec.x, follower.vec.y);

  /******* */
}