import * as THREE from "three";

export function createBodyModel(): THREE.Group {
  const group = new THREE.Group();

  // Head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshPhongMaterial({ color: 0xffcc99 })
  );
  head.position.y = 1.5;
  head.name = "Head";
  group.add(head);

  // Torso
  const torso = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1.5, 0.5),
    new THREE.MeshPhongMaterial({ color: 0xffcc99 })
  );
  torso.position.y = 0.5;
  torso.name = "Torso";
  group.add(torso);

  // Arms
  const leftArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 1, 32),
    new THREE.MeshPhongMaterial({ color: 0xffcc99 })
  );
  leftArm.position.set(-0.7, 0.5, 0);
  leftArm.rotation.z = Math.PI / 2;
  leftArm.name = "Left Arm";
  group.add(leftArm);

  const rightArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 1, 32),
    new THREE.MeshPhongMaterial({ color: 0xffcc99 })
  );
  rightArm.position.set(0.7, 0.5, 0);
  rightArm.rotation.z = -Math.PI / 2;
  rightArm.name = "Right Arm";
  group.add(rightArm);

  // Legs
  const leftLeg = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 1, 32),
    new THREE.MeshPhongMaterial({ color: 0xffcc99 })
  );
  leftLeg.position.set(-0.3, -0.5, 0);
  leftLeg.name = "Left Leg";
  group.add(leftLeg);

  const rightLeg = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 1, 32),
    new THREE.MeshPhongMaterial({ color: 0xffcc99 })
  );
  rightLeg.position.set(0.3, -0.5, 0);
  rightLeg.name = "Right Leg";
  group.add(rightLeg);

  return group;
} 