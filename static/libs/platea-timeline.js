(function (windows) {
    'use strict';

    function plateaTimeline() {

        let _timeline = {};

        let interactions = [];

        let variables = {
            currentTime: 0,
            totalTime: 30
        }

        _timeline.setCurrent = (time) => {
            variables.currentTime = time;
        }

        _timeline.setTotalTime = (time) => {
            variables.totalTime = time;
        }

        _timeline.addInteraction = (obj) => {
            interactions.push({
                name: obj.name,
                color: obj.color,
                width: obj.width,
                x: obj.x
            });
        }

        _timeline.getInteractions = () => {
            let auxInteractions = {};
            for (var i in interactions) {
                if (i)
                    auxInteractions[i] = interactions[i];
            }
            return auxInteractions;
        };


        _timeline.getVariables = () => {
            let aux = {};
            for (let i in variables) {
                if (i)
                    aux[i] = variables[i];
            }
            return aux;
        };

        let sketch = (p) => {

            let canvas;
            let totalTime;
            let x;
            let platea;

            p.setup = function () {
                p.setCanvas();
                platea = window.plateaTimeline;
                totalTime = platea.getVariables().totalTime;
                x = p.calcWidth(.15);
            };

            p.draw = function () {
                p.setPanels();
                p.drawInteractions();
                p.fill(255);
                p.stroke('#3273DC');
                if (x > canvas.width) {
                    x = p.calcHeight(.15);
                }
                p.line(x, p.calcHeight(.15), x, canvas.height);
                p.stroke('#3273DC');
                p.ellipse(x, 32, 8, 8);
                x = platea.getVariables().currentTime;
            };

            p.setCanvas = () => {
                const container = p.select('#timeline'),
                    canvasWidth = container.width,
                    canvasHeight = container.height;
                canvas = p.createCanvas(canvasWidth, canvasHeight).parent('timeline');
                p.stroke('#3273DC');
                p.strokeWeight(2);
                p.rect(0, 0, canvasWidth, canvasHeight);
            };

            p.setPanels = () => {
                p.background('#414141');
                p.stroke('#eaebec');
                p.strokeWeight(2);
                let panelWidth = p.calcWidth(.15);
                let panelHeight = p.calcHeight(.15);
                let maxWidth = Math.floor(p.calcWidth(.85));
                let boxWidth = Math.floor(maxWidth / 20);
                let numbers = [];
                let step = Math.floor(totalTime / 20);
                let currentTime = step;
                p.rect(0, 0, panelWidth, panelHeight);
                p.fill('#656565');
                p.rect(panelWidth, 0, p.calcWidth(.85), panelHeight);
                p.fill('#414141');
                p.rect(0, panelHeight, panelWidth, p.calcHeight(.85));
                for (let m = 0; m <= 20; m++) {
                    numbers.push(p.filterSeconds(currentTime));
                    currentTime += 1.5;
                }
                let j = 0;
                for (let i = panelWidth; i < canvas.width; i += boxWidth) {
                    p.stroke('#eaebec');
                    p.strokeWeight(1);
                    p.fill(255);
                    p.rect(i, 0, i + boxWidth, panelHeight);
                    p.line(i + boxWidth / 2, 25, i + boxWidth / 2, 33);
                    p.fill(0);
                    p.noStroke();
                    j++;
                }
                p.textSize(15);
                p.fill(0);
                p.text("Timeline", 80, 22);
                p.textAlign(p.CENTER);
            }

            p.calcWidth = (pct) => {
                return canvas.width * pct;
            }

            p.calcHeight = (pct) => {
                return canvas.height * pct;
            }

            p.filterSeconds = (seconds) => {
                let value = Math.floor(seconds / 60) + ":";
                if (seconds % 60) {
                    if (seconds % 60 < 10) {
                        value += '0' + seconds % 60;
                    } else {
                        value += seconds % 60;
                    }
                } else {
                    value += '00';
                }
                return value;
            }
            p.drawInteractions = () => {
                const interactions = platea.getInteractions();
                const width = p.calcWidth(.15);
                const height = p.calcHeight(.10);
                let h = 5;
                let y = p.calcHeight(.15) + h;
                for (let i in interactions) {
                    p.noStroke();
                    p.fill(interactions[i].color);
                    p.rect(0, y, width * .02, height);
                    p.rect(interactions[i].x, y, interactions[i].width, height);
                    p.fill('#505050');
                    p.rect(width * .02, y, width * .98, height);
                    p.fill(0);
                    p.textSize(12);
                    p.textFont("Roboto");
                    p.fill("white");
                    p.text(interactions[i].name, width * .2, y + 15);
                    p.textAlign(p.CENTER);
                    p.fill(255);
                    y += height + h;
                }
            }
        };

        window.onload = function () {
            let myP5 = new p5(sketch);
        };

        return _timeline;

    };
    if (typeof (window.plateaTimeline) === 'undefined') {
        window.plateaTimeline = plateaTimeline();
    }
})(window);



