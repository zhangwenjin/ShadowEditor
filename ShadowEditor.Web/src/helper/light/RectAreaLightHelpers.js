import BaseHelper from '../BaseHelper';
import VolumeRectAreaLightHelper from './VolumeRectAreaLightHelper';

/**
 * 矩形光帮助器
 * @author tengge / https://github.com/tengge1
 * @param {*} app 
 */
function RectAreaLightHelpers(app) {
    BaseHelper.call(this, app);

    this.helpers = [];
}

RectAreaLightHelpers.prototype = Object.create(BaseHelper.prototype);
RectAreaLightHelpers.prototype.constructor = RectAreaLightHelpers;

RectAreaLightHelpers.prototype.start = function () {
    this.app.on(`objectAdded.${this.id}`, this.onObjectAdded.bind(this));
    this.app.on(`objectRemoved.${this.id}`, this.onObjectRemoved.bind(this));
    this.app.on(`objectChanged.${this.id}`, this.onObjectChanged.bind(this));
    this.app.on(`storageChanged.${this.id}`, this.onStorageChanged.bind(this));
};

RectAreaLightHelpers.prototype.stop = function () {
    this.app.on(`objectAdded.${this.id}`, null);
    this.app.on(`objectRemoved.${this.id}`, null);
    this.app.on(`objectChanged.${this.id}`, null);
    this.app.on(`storageChanged.${this.id}`, null);
};

RectAreaLightHelpers.prototype.onObjectAdded = function (object) {
    if (!object.isRectAreaLight) {
        return;
    }

    var helper = new VolumeRectAreaLightHelper(object, 0xffffff);

    helper.visible = this.app.storage.get('showRectAreaLight');

    this.helpers.push(helper);

    this.app.editor.sceneHelpers.add(helper);
};

RectAreaLightHelpers.prototype.onObjectRemoved = function (object) {
    if (!object.isRectAreaLight) {
        return;
    }

    var index = this.helpers.findIndex(n => {
        return n.light === object;
    });

    if (index === -1) {
        return;
    }

    this.app.editor.sceneHelpers.remove(this.helpers[index]);

    this.helpers[index].dispose();

    this.helpers.splice(index, 1);
};

RectAreaLightHelpers.prototype.onObjectChanged = function (object) {
    if (!object.isRectAreaLight) {
        return;
    }

    var index = this.helpers.findIndex(n => {
        return n.light === object;
    });

    if (index === -1) {
        return;
    }

    this.helpers[index].update();
};

RectAreaLightHelpers.prototype.onStorageChanged = function (key, value) {
    if (key !== 'showRectAreaLight') {
        return;
    }

    this.helpers.forEach(n => {
        n.visible = value;
    });
};

export default RectAreaLightHelpers;