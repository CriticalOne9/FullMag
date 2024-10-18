import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Map extends Phaser.Scene {
    constructor() {
        super({ key: 'Map' });
    }

    preload() {
        // Load assets here
        this.load.image('background', 'public/assets/bg.png');
        this.load.spritesheet('button', 'assets/star.png', {
            frameWidth: 193,
            frameHeight: 71
        });
    }

    create() {
        // Add background
        this.add.image(400, 300, 'background');

        // Create buttons
        this.createButton(100, 100, 'Button 1', () => {
            console.log('Button 1 clicked!');
            this.scene.start('LagoriGame');
        });
        this.createButton(300, 100, 'Button 2', () => { console.log('Button 2 clicked!'); });
        this.createButton(500, 100, 'Button 3', () => { console.log('Button 3 clicked!'); });
    }

    createButton(x, y, text, callback) {
        const button = this.add.sprite(x, y, 'button').setInteractive();

        button.on('pointerdown', callback);

        // Add text to button
        this.add.text(x - 40, y - 20, text, { fontSize: '16px', fill: '#fff' });
    }

    update() {
        // Update logic here
    }
}

// export default Map;