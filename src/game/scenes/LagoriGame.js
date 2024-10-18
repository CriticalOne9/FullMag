import Phaser from 'phaser';

export class LagoriGame extends Phaser.Scene {
    constructor() {
        super('LagoriGame');
    }

    preload() {
        // Load assets
        this.load.image('stone', 'assets/stone.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('player', 'assets/player.png'); // Player image
        this.load.image('opponent', 'assets/opponent.png'); // Opponent image
    }

    create() {
        // Set up the background
        this.add.image(400, 300, 'background');

        // Add player
        this.player = this.physics.add.sprite(100, 500, 'player').setInteractive();

        // Add opponents
        this.opponents = this.physics.add.group();
        this.opponents.create(700, 500, 'opponent');
        this.opponents.create(750, 450, 'opponent');

        // Create stones
        this.stones = [];
        const stoneCount = 7;
        const initialY = 300;
        for (let i = 0; i < stoneCount; i++) {
            const stone = this.physics.add.sprite(400, initialY - i * 20, 'stone');
            this.stones.push(stone);
        }

        // Add ball
        this.ball = this.physics.add.sprite(100, 500, 'ball').setInteractive();
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(0.8);

        // Trajectory preview line
        this.trajectoryGraphics = this.add.graphics({ lineStyle: { width: 2, color: 0xff0000 } });

        // Input events
        this.input.on('pointermove', pointer => this.updateTrajectory(pointer));
        this.input.on('pointerdown', pointer => this.throwBall(pointer));

        // Add instructions or title text
        this.add.text(400, 50, 'Lagori', {
            fontFamily: 'Arial Black',
            fontSize: '32px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5);

        // Colliders
        this.physics.add.collider(this.ball, this.stones, this.hitStone, null, this);
        this.physics.add.collider(this.ball, this.opponents, this.hitOpponent, null, this);
    }

    updateTrajectory(pointer) {
        this.trajectoryGraphics.clear();
        const startX = this.ball.x;
        const startY = this.ball.y;
        const endX = pointer.x;
        const endY = pointer.y;

        this.trajectoryGraphics.lineBetween(startX, startY, endX, endY);
    }

    throwBall(pointer) {
        const velocityX = (pointer.x - this.ball.x) * 2;
        const velocityY = (pointer.y - this.ball.y) * 2;

        this.ball.setVelocity(velocityX, velocityY);
        this.trajectoryGraphics.clear();
    }

    hitStone(ball, stone) {
        stone.setAlpha(0.5);
        console.log('Stone knocked down:', stone);

        if (this.stones.every(s => s.alpha === 0.5)) {
            this.endGame();
        }
    }

    hitOpponent(ball, opponent) {
        opponent.setAlpha(0.5);
        console.log('Hit an opponent!');
        // Logic for handling opponent hit can be added here
    }

    endGame() {
        this.add.text(400, 300, 'All stones knocked down! Game Over!', {
            fontFamily: 'Arial Black',
            fontSize: '24px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        this.time.delayedCall(3000, () => this.scene.restart());
    }
}

export default LagoriGame;
