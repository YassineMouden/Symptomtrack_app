/**
 * InteractiveBodyModel Component
 * 
 * A 3D interactive model of the human body that allows users to select different body parts.
 * Built using Three.js for 3D rendering and interaction.
 * 
 * @component
 * @example
 * ```tsx
 * <InteractiveBodyModel onPartSelected={(partName) => console.log(partName)} />
 * ```
 * 
 * @param {InteractiveBodyModelProps} props - Component props
 * @param {(partName: string) => void} props.onPartSelected - Callback function when a body part is selected
 * 
 * @returns {JSX.Element} A 3D interactive model of the human body
 * 
 * @see {@link https://threejs.org/docs/ Three.js Documentation}
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Interface for the InteractiveBodyModel component props
 * @interface InteractiveBodyModelProps
 */
interface InteractiveBodyModelProps {
  /** Callback function triggered when a body part is selected */
  onPartSelected: (partName: string) => void;
}

/**
 * Interface defining the structure of body parts in the 3D model
 * @interface BodyParts
 */
interface BodyParts {
  /** The head mesh */
  Head: THREE.Mesh;
  /** The torso mesh */
  Torso: THREE.Mesh;
  /** The left arm mesh */
  'Left Arm': THREE.Mesh;
  /** The right arm mesh */
  'Right Arm': THREE.Mesh;
  /** The left leg mesh */
  'Left Leg': THREE.Mesh;
  /** The right leg mesh */
  'Right Leg': THREE.Mesh;
}

export const InteractiveBodyModel = ({ onPartSelected }: InteractiveBodyModelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      containerRef.current.appendChild(renderer.domElement);

      // Controls setup
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // Create a simple human body model using basic geometries
      const bodyParts: BodyParts = {} as BodyParts;

      // Head
      const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffcc99 });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 1.5;
      head.name = 'Head';
      scene.add(head);
      bodyParts.Head = head;

      // Torso
      const torsoGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
      const torsoMaterial = new THREE.MeshPhongMaterial({ color: 0xffcc99 });
      const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
      torso.position.y = 0;
      torso.name = 'Torso';
      scene.add(torso);
      bodyParts.Torso = torso;

      // Arms
      const armGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 32);
      const armMaterial = new THREE.MeshPhongMaterial({ color: 0xffcc99 });

      const leftArm = new THREE.Mesh(armGeometry, armMaterial);
      leftArm.position.set(-0.7, 0, 0);
      leftArm.rotation.z = Math.PI / 2;
      leftArm.name = 'Left Arm';
      scene.add(leftArm);
      bodyParts['Left Arm'] = leftArm;

      const rightArm = new THREE.Mesh(armGeometry, armMaterial);
      rightArm.position.set(0.7, 0, 0);
      rightArm.rotation.z = -Math.PI / 2;
      rightArm.name = 'Right Arm';
      scene.add(rightArm);
      bodyParts['Right Arm'] = rightArm;

      // Legs
      const legGeometry = new THREE.CylinderGeometry(0.3, 0.3, 2, 32);
      const legMaterial = new THREE.MeshPhongMaterial({ color: 0xffcc99 });

      const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
      leftLeg.position.set(-0.3, -1.5, 0);
      leftLeg.name = 'Left Leg';
      scene.add(leftLeg);
      bodyParts['Left Leg'] = leftLeg;

      const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
      rightLeg.position.set(0.3, -1.5, 0);
      rightLeg.name = 'Right Leg';
      scene.add(rightLeg);
      bodyParts['Right Leg'] = rightLeg;

      // Raycaster for mouse interaction
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);

      // Handle mouse click
      const handleClick = (event: MouseEvent) => {
        if (!containerRef.current) return;

        // Calculate mouse position in normalized device coordinates
        const rect = containerRef.current.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        const objects = [
          bodyParts.Head,
          bodyParts.Torso,
          bodyParts['Left Arm'],
          bodyParts['Right Arm'],
          bodyParts['Left Leg'],
          bodyParts['Right Leg'],
        ];
        const intersects = raycaster.intersectObjects(objects, true);

        if (intersects.length > 0 && intersects[0]?.object?.name) {
          onPartSelected(intersects[0].object.name);
        }
      };

      window.addEventListener('click', handleClick);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      animate();
      setIsLoading(false);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('click', handleClick);
        if (containerRef.current) {
          containerRef.current.removeChild(renderer.domElement);
        }
        scene.clear();
      };
    } catch (err) {
      console.error('Error initializing 3D model:', err);
      setError('Failed to initialize the 3D model');
      setIsLoading(false);
    }
  }, [onPartSelected]);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden bg-gray-100">
      <div ref={containerRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading 3D model...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 