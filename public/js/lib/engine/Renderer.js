function Renderer(options) {
    var options = options || {}

    this.canvas = options.canvas || document.createElement('canvas');
    this.canvas.width = options.width || 640;
    this.canvas.height = options.height || 480;

    var easelStage = new createjs.Stage(this.canvas);
    easelStage.autoClear = true;
    var stage = new StageManager({stage:easelStage})

    easelStage.update();

    return {
        canvas:this.canvas,
        stage:stage,
        easelStage:easelStage
    };
}