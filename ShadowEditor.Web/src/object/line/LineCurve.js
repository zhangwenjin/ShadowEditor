var ARC_SEGMENTS = 200;

/**
 * 线段
 * @param {*} options 
 */
function LineCurve(options = {}) {
    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(ARC_SEGMENTS * 3), 3));

    var material = new THREE.LineBasicMaterial({
        color: 0xff0000,
        opacity: 0.35
    });

    THREE.Line.call(this, geometry, material);

    this.name = L_LINE_CURVE;

    this.castShadow = true;

    Object.assign(this.userData, {
        type: 'LineCurve',
        points: options.points || [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 10, 10)
        ]
    });

    this.update();
}

LineCurve.prototype = Object.create(THREE.Line.prototype);
LineCurve.prototype.constructor = LineCurve;

LineCurve.prototype.update = function () {
    var curve = new THREE.LineCurve3(
        this.userData.points[0],
        this.userData.points[1],
    );

    var position = this.geometry.attributes.position;

    var point = new THREE.Vector3();

    for (var i = 0; i < ARC_SEGMENTS; i++) {
        var t = i / (ARC_SEGMENTS - 1);
        curve.getPoint(t, point);
        position.setXYZ(i, point.x, point.y, point.z);
    }

    position.needsUpdate = true;
};

export default LineCurve;