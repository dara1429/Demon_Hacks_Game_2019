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

var spacebar;
var a;
var w;
var d;
var s;
var path;
var tweeners;
var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('background', 'assets/background.png');
  this.load.image('enemy', 'assets/enemy.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('fireball','assets/fireball.png');
}

function create ()
{   
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    tweeners = this.tweens

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

    var enemy = new Phaser.Class({

        Extends: Phaser.GameObjects.Sprite,

        initialize: function(scene) {
            Phaser.GameObjects.Sprite.call(this,scene,100,100,'enemy');
            this.setScale(2,2);
            this.setActive(true);
            this.setVisible(true);
        },

        run: function() {
            this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
            tweeners.add({
                targets: this.follower,
                t: 1,
                ease: 'Sine.easeInOut',
                duration: 10000,
                yoyo: false,
                repeat: -1
            });
            path = path;
        },

        update: function() {
            path.getPoint(this.follower.t, this.follower.vec);
            this.setPosition(this.follower.vec.x, this.follower.vec.y);

            if (this.y > 600 ) {
                tweeners.remove(this.follower);
            }
        }
    });

    var player = new Phaser.Class({

        Extends: Phaser.GameObjects.Sprite,

        initialize: function(scene) {
            Phaser.GameObjects.Sprite.call(this,scene,100,100,'player');
            this.setScale(2,2);
            this.setActive(true);
            this.setVisible(true);
            this.gold = 0;
        },

        getGold: function() {return self.gold},
        setGold: function(newGold) {self.gold = newGold;},

        update: function() {
            if (Phaser.Input.Keyboard.JustDown(spacebar))
            {
                var fireball = fireballs.get();
          
                if (fireball)
                {
                    fireball.fire(this.x, this.y);
                }
            }
          
            if (d.isDown)
            {
                this.setPosition(this.x+10,this.y);
            }
          
            if (a.isDown)
            {
                this.setPosition(this.x-10,this.y);
            }
          
            if (w.isDown)
            {
                this.setPosition(this.x,this.y-10);
            }
          
            if (s.isDown)
            {
                this.setPosition(this.x,this.y+10);
            }
        }
    });

    //Set Background image
  this.add.image(400, 300, 'background');

  // Create characters
  //player = new Character(this,50,50, 2,'player');
  //enemy = new Character(this,50,50, 2, 'enemy');

  //Add character to the scene
  //this.add.existing(player);
  //this.add.existing(enemy);
  

  //enemy = this.add.sprite(400, 300, 'enemy');
  //enemy.setScale(2.25);
  /*
  enemy.animations.add('right');
  enemy.animations.play('run', 10, true);
  */

  /*******/
  


  /*******/

  


  enemies = this.add.group({
    classType: enemy,
    maxSize: 100,
    runChildUpdate: true
  })

  players = this.add.group({
      classType: player,
      maxSize: 1,
      runChildUpdate: true
  })

  players.get();


  //CREATES PATH
  graphics = this.add.graphics();

  //  Path starts at 400x100
  path = new Phaser.Curves.Path(600, 25);

  path.ellipseTo(400, 400, 750, 450, false);
  path.ellipseTo(-250, -250, 500, 400, false);
 

  //this.tweens.add({
  //    targets: follower,
  //    t: 1,
  //    ease: 'Sine.easeInOut',
  //    duration: 10000,
  //    yoyo: false,
  //    repeat: -1
  //});
  //enemies.get();
  //ene = enemies.get();
  //ene.run();
  //ene = enemies.get();
  //ene.run();
  //ene.setPath(path)
  //console.log(game == self);

}

function update ()
{
    if (d.isDown) {
        ene = enemies.get();
  ene.run();
    }
    //ene = enemies.get();
  //  /******* */
  //graphics.clear();
//
  //graphics.lineStyle(1, 0xffffff, 1);
//
  //path.draw(graphics); //delete this to get rid of line
//
  //path.getPoint(follower.t, follower.vec);
//
  //graphics.fillStyle(0xff0000, 1);
  //graphics.fillCircle(follower.vec.x, follower.vec.y, 12);
//
  //enemy.setPosition(follower.vec.x, follower.vec.y);
//
//
  //  var enem = enemies.get();

}