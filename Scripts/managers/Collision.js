"use strict";
var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.squaredRadiusCheck = function (object1, object2) {
            //console.log(object1.name+": "+ object1.x + " - "+ object1.y +" | "+object2.name+": " +object2.x + " - "+ object2.y);
            // squared radius check
            var radii = object1.halfHeight + object2.halfHeight;
            if (objects.Vector2.sqrDistance(object1.position, object2.position) < (radii * radii)) {
                if (!object2.isColliding) {
                    object1.isColliding = true;
                    object2.isColliding = true;
                    return true;
                }
            }
            // else
            // {
            //     object2.isColliding = false;
            // }
            return false;
        };
        Collision.AABBCheck = function (object1, object2) {
            //console.log(object1.name+": "+ object1.x + " - "+ object1.y +" | "+object2.name+": " +object2.x + " - "+ object2.y);
            //console.log("Obj2"+ object2.x + " - "+ object2.y);
            var object1Offset = (!object1.isCentered) ? new objects.Vector2(0, 0) : new objects.Vector2(object1.halfWidth, object1.halfHeight);
            var object2Offset = (!object2.isCentered) ? new objects.Vector2(0, 0) : new objects.Vector2(object2.halfWidth, object2.halfHeight);
            var object1TopLeft = new objects.Vector2(object1.position.x - object1Offset.x, object1.position.y - object1Offset.y);
            var object2TopLeft = new objects.Vector2(object2.position.x - object2Offset.x, object2.position.y - object2Offset.y);
            // AABB Collision Detection
            if (object1TopLeft.x < object2TopLeft.x + object2.width &&
                object1TopLeft.x + object1.width > object2TopLeft.x &&
                object1TopLeft.y < object2TopLeft.y + object2.height &&
                object1TopLeft.y + object1.height > object2TopLeft.y) {
                if (!object2.isColliding) {
                    object1.isColliding = true;
                    object2.isColliding = true;
                    return true;
                }
            }
            // else
            // {
            //     object2.isColliding = false;
            // }
            return false;
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=Collision.js.map