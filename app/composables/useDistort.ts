import { WebGLRenderer, Scene, PerspectiveCamera, OrthographicCamera, Color, NearestFilter, RGBFormat, FloatType, DataTexture, ShaderMaterial, Texture, DoubleSide, Vector4, PlaneGeometry, Mesh } from 'three'
import fragment from 'assets/shader/fragment.glsl'
import vertex from "assets/shader/vertex.glsl";
import lilGui from 'lil-gui'

const clamp = (number: number, min: number, max: number) => Math.max(min, Math.min(number, max))

type Three = {
    scene: Scene,
    renderer: WebGLRenderer
    texture?: Texture
    material?: ShaderMaterial
    geometry?: PlaneGeometry
    plane?: Mesh
}

type Options = {
    grid?: number
    mouse?: number
    strength?: number
    relaxation?: number
}

export default (ref: string, options?: Options) => {
    if (import.meta.server) return

    const three: Three = {
        scene: new Scene(),
        renderer: new WebGLRenderer()
    }
    const scene = new Scene()
    const renderer = new WebGLRenderer()

    const container = document.getElementById("canvasContainer")
    if (!container) return createError('Container is missing')
    
    const img = container?.querySelector('[data-distort-target]')
    
    const storage = {
        isPlaying: true,
        frustumSize: 1,
        size: 0,
        width: container?.offsetWidth,
        height: container?.offsetHeight,
        imageAspect: 1. / 1.5,
        time: 0,
        mouse: {
            x: 0, y: 0,
            prevX: 0, prevY: 0,
            vX: 0, vY: 0
          }
    }

    const settings = {
        grid: 34,
        mouse: 0.25,
        strength: 1,
        relaxation: 0.9,
        ...options
    }

    const gui = new lilGui()
    gui.add(settings, "grid", 2, 1000, 1).onFinishChange(() => { regenerateGrid() })
    gui.add(settings, "mouse", 0, 1, 0.01)
    gui.add(settings, "strength", 0, 1, 0.01)
    gui.add(settings, "relaxation", 0, 1, 0.01)

    const pixelRatio = Math.min(window.devicePixelRatio, 2)

    three.renderer.setPixelRatio(pixelRatio)
    three.renderer.setSize(storage.width, storage.height);
    three.renderer.setClearColor(0xeeeeee, 1);
    // three.renderer.physicallyCorrectLights = true;
    // three.renderer.outputEncoding = sRGBEncoding
    
    const { innerWidth = 1, innerHeight = 1 } = window
    const aspect = innerWidth / innerHeight

    new PerspectiveCamera(70, aspect, 0.1, 100)
    
    container.appendChild(renderer.domElement)

    const { frustumSize } = storage
    const camera = new OrthographicCamera(frustumSize / -2, frustumSize / 2, frustumSize / 2, frustumSize / -2, -1000, 1000);
    camera.position.set(0, 0, 2)
    
    
    const render = () => {
        if (!storage.isPlaying) return
        storage.time += 0.05
        updateDataTexture()
        if (three.material?.uniforms.time) three.material.uniforms.time.value = storage.time
        requestAnimationFrame(render.bind(this))
        three.renderer.render(scene, camera)
    }
    
    const resize = () => {
        storage.width = container.offsetWidth
        storage.height = container.offsetHeight
    
        const { width, height, imageAspect } = storage
        renderer.setSize(width, height)
        camera.aspect = width / height
    
    
        // image cover
        let a1
        let a2
        
        if (height / width > imageAspect) {
          a1 = (width / height) * imageAspect
          a2 = 1
        } else {
          a1 = 1;
          a2 = (height / width) / imageAspect
        }
    
        if (three.material?.uniforms.resolution) {
            three.material.uniforms.resolution.value.x = width
            three.material.uniforms.resolution.value.y = height
            three.material.uniforms.resolution.value.z = a1
            three.material.uniforms.resolution.value.w = a2
        }
    
        camera.updateProjectionMatrix()
        regenerateGrid()
    }
    
    const regenerateGrid = () => {
        storage.size = settings.grid
    
        const width = storage.size
        const height = storage.size
    
        const size = width * height;
        const data = new Float32Array(3 * size);
        const color = new Color(0xffffff)
    
        const r = Math.floor(color.r * 255);
        const g = Math.floor(color.g * 255);
        const b = Math.floor(color.b * 255);
    
        for (let i = 0; i < size; i++) {
          let r = Math.random() * 255 - 125;
          let r1 = Math.random() * 255 - 125;
    
          const stride = i * 3;
    
          data[stride] = r;
          data[stride + 1] = r1;
          data[stride + 2] = r;
    
        }
    
        // Use the buffer to create a DataTexture
        three.texture = new DataTexture(data, width, height, RGBFormat, FloatType)
        three.texture.magFilter = three.texture.minFilter = NearestFilter
    
        if (three.material?.uniforms.uDataTexture) {
          three.material.uniforms.uDataTexture.value = three.texture
          three.material.uniforms.uDataTexture.value.needsUpdate = true
        }
      }
    
    const addObjects = () => {
        regenerateGrid()
        if (!img) return
        three.texture = new Texture(img)
        three.texture.needsUpdate = true
        three.material = new ShaderMaterial({
            extensions: {
                derivatives: "#extension GL_OES_standard_derivatives : enable"
            },
            side: DoubleSide,
            uniforms: {
            time: {
                value: 0
            },
            resolution: {
                value: new Vector4()
            },
            uTexture: {
                value: three.texture
            },
            uDataTexture: {
                value: three.texture
            },
            },
            vertexShader: vertex,
            fragmentShader: fragment
        });
    
        three.geometry = new PlaneGeometry(1, 1, 1, 1);
    
        three.plane = new Mesh(three.geometry, three.material);
        scene.add(three.plane);
    }
    
    const updateDataTexture = () => {
        let data = three.texture?.image.data || []

        for (let i = 0; i < data.length; i += 3) {
          data[i] *= settings.relaxation
          data[i + 1] *= settings.relaxation
        }
    
        let gridMouseX = storage.size * storage.mouse.x
        let gridMouseY = storage.size * (1 - storage.mouse.y)
        let maxDist = storage.size * settings.mouse
        let aspect = storage.height / storage.width
    
        for (let i = 0; i < storage.size; i++) {
          for (let j = 0; j < storage.size; j++) {
    
            let distance = ((gridMouseX - i) ** 2) / aspect + (gridMouseY - j) ** 2
            let maxDistSq = maxDist ** 2;
    
            if (distance < maxDistSq) {
    
              let index = 3 * (i + storage.size * j);
    
              let power = maxDist / Math.sqrt(distance);
              power = clamp(power, 0, 10)
    
              data[index] += settings.strength * 100 * storage.mouse.vX * power
              data[index + 1] -= settings.strength * 100 * storage.mouse.vY * power
    
            }
          }
        }
    
        storage.mouse.vX *= 0.9
        storage.mouse.vY *= 0.9
        if (three.texture) three.texture.needsUpdate = true
      }
    
    addObjects()
    resize()
    render()
    
    useEventListener('resize', resize)
    useEventListener('mousemove', ({ clientX, clientY }) => {
        storage.mouse.x = clientX / storage.width
        storage.mouse.y = clientY / storage.height
    
        storage.mouse.vX = storage.mouse.x - storage.mouse.prevX
        storage.mouse.vY = storage.mouse.y - storage.mouse.prevY
        storage.mouse.prevX = storage.mouse.x
        storage.mouse.prevY = storage.mouse.y
    })
}